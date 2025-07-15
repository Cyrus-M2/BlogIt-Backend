// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth";
// import blogRoutes from "./routes/blog";
// import userRoutes from "./routes/user";
// import uploadRoutes from "./routes/upload";

// dotenv.config();

// const app = express();

// const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

// app.use(
//   cors({
//     origin: allowedOrigin,
//     credentials: true,
//   })
// );

// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/upload", uploadRoutes);

// export default app;




// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth";
// import blogRoutes from "./routes/blog";
// import userRoutes from "./routes/user";
// import uploadRoutes from "./routes/upload";

// dotenv.config();

// const app = express();

// console.log("FRONTEND_URL from .env:", process.env.FRONTEND_URL);

// const allowedOrigins = [
//   "http://localhost:5173",
//   process.env.FRONTEND_URL, // e.g. "https://blog-it-frontend-theta.vercel.app"
// ].filter(Boolean);

// app.use(
//   cors({
//     origin: function (origin, callback) {
//     console.log("Request Origin:", origin);
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/upload", uploadRoutes);

// export default app;




import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import blogRoutes from "./routes/blog";
import userRoutes from "./routes/user";
import uploadRoutes from "./routes/upload";

dotenv.config();

const app = express();

const allowedOrigins: string[] = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, // e.g. https://your-frontend.vercel.app
].filter(Boolean) as string[];


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

// ✅ Route handlers
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);
app.use("/api/upload", uploadRoutes);

// Optional default route
app.get("/", (_, res) => {
  res.send("BlogIt Backend Running");
});

export default app;
