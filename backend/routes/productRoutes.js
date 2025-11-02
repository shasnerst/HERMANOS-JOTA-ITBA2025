import express from "express";
import Product from "../models/Product.js";
const router = express.Router();
router.get("/", async (_req,res)=>{
  try{ res.json(await Product.find()); }
  catch(e){ res.status(500).json({error:"Error listando productos"}); }
});
router.get("/:id", async (req,res)=>{
  try{
    const doc = await Product.findById(req.params.id);
    if(!doc) return res.status(404).json({error:"Producto no encontrado"});
    res.json(doc);
  }catch{ res.status(400).json({error:"ID inválido"}); }
});
router.post("/", async (req,res)=>{
  try{
    const { nombre, precio } = req.body;
    if(!nombre || precio===undefined) return res.status(400).json({error:"nombre y precio son requeridos"});
    const created = await new Product(req.body).save();
    res.status(201).json(created);
  }catch(e){ res.status(500).json({error:"Error creando producto"}); }
});
router.put("/:id", async (req,res)=>{
  try{
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if(!updated) return res.status(404).json({error:"Producto no encontrado"});
    res.json(updated);
  }catch{ res.status(400).json({error:"ID inválido o datos incorrectos"}); }
});
router.delete("/:id", async (req,res)=>{
  try{
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if(!deleted) return res.status(404).json({error:"Producto no encontrado"});
    res.json({message:"Producto eliminado"});
  }catch{ res.status(400).json({error:"ID inválido"}); }
});
export default router;
