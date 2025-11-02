import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import "dotenv/config";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a Mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.log("❌ Error Mongo:", err));

// Rutas
app.use("/api/products", productRoutes);

// Servidor
app.listen(process.env.PORT || 5000, () =>
  console.log(`✅ Servidor en puerto ${process.env.PORT}`)
);
