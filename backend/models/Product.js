// backend/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Guardamos un "legacyId" para tus ids string p-001, p-002, etc.
    legacyId:   { type: String, index: true }, // opcional pero útil
    nombre:     { type: String, required: true },
    descripcion:{ type: String, default: "" },
    precio:     { type: Number, required: true },
    stock:      { type: Number, default: 0 },
    categoria:  { type: String, default: "General" },

    // soportamos ambos nombres de campo
    imagen:     { type: String, default: "" },
    imagenUrl:  { type: String, default: "" },

    // el JSON trae un objeto con pares clave/valor
    caracteristicas: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

// Virtual "id" para exponer _id como id (útil en el front)
productSchema.virtual("id").get(function () {
  return this._id.toString();
});
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export default mongoose.model("Product", productSchema);
