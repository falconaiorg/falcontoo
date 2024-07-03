import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getToken } from "next-auth/jwt";
import { z } from "zod";
import { parseArticle } from "./parser";
import { parseUrl } from "./parser/url";
const base64Secret = process.env.NEXTAUTH_SECRET;

dotenv.config();

const app = express();
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8000;

// const corsOptions = {
//   origin: "http://localhost:3000", // your frontend URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
//   credentials: true, // Allow cookies to be sent
// };

app.use(cors());
app.use(express.json());

app.all("/", async (req, res, next) => {
  const user = await getToken({ req, secret: base64Secret });
  if (!user) {
    res.status(401).send("Unauthorized");
    return;
  }
  //console.log(user.name);
  next();
});

// Define your schema
const ParserBodySchema = z.object({
  url: z.string(),
});

app.post("/parser", async (req, res) => {
  try {
    //console.log("Request body", req.body);
    const parsedContent = await ParserBodySchema.safeParse(req.body);
    //console.log("Parsed content", parsedContent);

    if (!parsedContent.success) {
      res.status(400).send(parsedContent.error);
      return;
    }
    //console.log("Parsed content", parsedContent.data);
    //console.log("Parsed content", parsedContent.data?.url);
    const parsedUrl = await parseUrl({ url: parsedContent.data?.url });
    const article = await parseArticle({ url: parsedUrl });
    //console.log("🟢 Final Article", article);
    res.send(article);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, () => {
  //console.log(`Server is running at http://${HOST}:${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`Hello from Draco!`);
});
