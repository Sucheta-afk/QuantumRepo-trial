import express from "express";
import next from "next";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import repoRoutes from "./routes/repoRoutes.js"
import editorRoutes from "./routes/editorRoutes.js"
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const port = process.env.PORT || 3000;

  // Connect to the database
  connectDB();

  // CORS configuration
  server.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://quantum-repo.vercel.app",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  );
  

  // Middleware to parse JSON
  server.use(express.json());

  server.use("/auth", authRoutes);
  server.use("/api", userRoutes);
  server.use("/api/user", repoRoutes);
  server.use("/api/repos", editorRoutes)


  // Catch-all route for Next.js pages
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(port, () => {
    console.log(`Server hosted on port ${port}`);
  });
});
