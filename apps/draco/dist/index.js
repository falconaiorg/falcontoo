import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { appRouter, createContext } from "@falcon/trpc/node/server";
const base64Secret = process.env.NEXTAUTH_SECRET;
import * as trpcExpress from "@trpc/server/adapters/express";
dotenv.config();
const app = express();
const HOST = process.env.HOST || "localhost";
const PORT = 8000;
// const corsOptions = {
//   origin: "http://localhost:3000", // your frontend URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
//   credentials: true, // Allow cookies to be sent
// };
app.use(cors());
app.all("/", async (req, res, next) => {
    // const user = await getToken({ req, secret: base64Secret });
    // if (!user) {
    //   res.status(401).send("Unauthorized");
    //   return;
    // }
    // console.log(user.name);
    console.log("Hello from Draco!");
    next();
});
app.all("/trpc", async (req, res, next) => {
    console.log(req.headers);
    console.log(req.body);
    console.log("Hello from Draco!");
    next();
});
app.use("/trpc", trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
}));
app.listen(PORT, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});
app.get("/", (req, res) => {
    res.send(`Hello from Draco!`);
});
//# sourceMappingURL=index.js.map