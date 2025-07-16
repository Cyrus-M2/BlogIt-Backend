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





import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import blogRoutes from "./routes/blog";
import userRoutes from "./routes/user";
import uploadRoutes from "./routes/upload";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// ✅ Define allowed frontend origins
const allowedOrigins: string[] = [
  // "http://localhost:5173", // uncomment when testing locally
  "https://blog-it-frontend-theta.vercel.app"
];

console.log("Allowed Origins:", allowedOrigins);

// ✅ Apply CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  })
);

app.use(express.json());

// ✅ Route handlers
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);
app.use("/user", userRoutes);
app.use("/upload", uploadRoutes);

// ✅ Optional default route
app.get("/", (_, res) => {
  res.send("BlogIt Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
