import crypto from "crypto";

export const createChecksum = (content: string) => {
  return crypto.createHash("sha256").update(content).digest("hex");
};
