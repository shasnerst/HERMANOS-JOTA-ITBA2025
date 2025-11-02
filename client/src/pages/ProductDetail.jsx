// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetailView from "../components/ProductDetail"; // tu componente visual viejo

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/productos/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p style={{ padding: 24 }}>Cargando...</p>;
  if (!product) return <p style={{ padding: 24 }}>Producto no encontrado.</p>;

  // Adaptamos las props que esperaba tu componente viejo
  const onAddToCart = () => {}; // si aún no tenés carrito, lo dejamos vacío
  const setRuta = (path) => navigate(path);

  return (
    <ProductDetailView
      products={product}
      setRuta={setRuta}
      ruta={`/product/${id}`}
      onAddToCart={onAddToCart}
    />
  );
}

