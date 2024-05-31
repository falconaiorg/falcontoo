"use server";
import { auth } from "@/auth";
import { s3 } from "@/lib/aws";
import { nanoid } from "nanoid";
import sharp from "sharp";
import { createHash } from "crypto";

export const uploadToDigitalOcean = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    throw new Error("No session found");
  }
  const file = formData.get("file") as File;
  const buffer = Buffer.from(await file.arrayBuffer());
  const OptimizedBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
  const hash = createHash("sha256").update(OptimizedBuffer).digest("hex");

  const bucket = process.env.DO_SPACES_BUCKET ?? "";

  try {
    const upload = await s3.upload({
      Bucket: bucket,
      Key: `uploads/${file.name}-${nanoid()}.webp`, // Adding an nanoid ensures cache busting
      Body: OptimizedBuffer,
      ACL: "public-read",
      ContentType: "image/webp",
      CacheControl: "max-age=31536000", // cached in the browser for a year
    });

    upload.on("httpUploadProgress", (progress) => {
      console.log(progress);
    });

    const stored = await upload.promise();

    return { url: stored.Location, key: stored.Key, bucket: bucket };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const deleteFromDigitalOcean = async ({
  key,
  bucket,
}: {
  key: string;
  bucket: string;
}) => {
  const session = await auth();
  if (!session) {
    throw new Error("No session found");
  }
  const params = {
    Bucket: bucket,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    throw new Error("Error deleting file from DigitalOcean");
  }
};
