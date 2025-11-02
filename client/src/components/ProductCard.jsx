
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  // 1) Si guardás una URL en la BD, úsala:
  //    product.imagenUrl  (recomendado)
  // 2) Si todavía usás rutas del repo (legacy):
  //    construimos el fallback con product.imagen
  const legacy = product.imagen
    ? `https://raw.githubusercontent.com/TomasVolpini/ITBA-Muebleria-Jota/refs/heads/develop/server${product.imagen}`
    : null;

  const src = product.imagenUrl || legacy || "/logo.svg";

  function handleClick() {
    // En Mongo viene como _id
    const id = product._id || product.id;
    navigate(`/productos/${id}`);
  }

  return (
    <div className="card">
      <img className="thumb" src={src} alt={product.nombre || "Producto"} />
      <p className="product-name">{product.nombre}</p>
      <button className="btn-overlay" onClick={handleClick}>
        Ver Detalles
      </button>
    </div>
  );
}
