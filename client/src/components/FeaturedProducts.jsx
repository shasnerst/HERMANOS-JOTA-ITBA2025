// src/components/FeaturedProducts.jsx
import { Link } from "react-router-dom";
import "../styles/FeaturedProducts.css";

export default function FeaturedProducts({ products = [], setRuta }) {
  // Tomamos los primeros 4
  const featured = products.slice(0, 4);

  const pickId = (p) => p.id || p._id || p.legacyId;

  const pickImg = (p) => {
    // Prioridad: imagenUrl absoluta -> imagen absoluta -> rutas relativas (public/img/..)
    const cands = [p.imagenUrl, p.imagen];
    const src = cands.find(Boolean);
    if (!src) return "/img/placeholder.png"; // opcional: placeholder en /public/img
    // Si ya es http(s) la dejamos; si es relativa (/img/..), también sirve con Vite/public
    return src;
  };

  const handleClickLegacy = (productId) => {
    // Compatibilidad por si aún usás setRuta en algún lado
    if (typeof setRuta === "function") setRuta(`${productId}`);
  };

  if (!featured.length) {
    return null; // o un bloque vacío: no hay destacados
  }

  return (
    <section className="destacados">
      <h2 className="destacados__title">Productos destacados</h2>

      <div className="productos-grid">
        {featured.map((p) => {
          const pid = pickId(p);
          const img = pickImg(p);

          return (
            <div key={pid} className="featured-card">
              <img src={img} alt={p.nombre || "Producto"} />

              <div className="featured-card__content">
                <p className="featured-card__name">{p.nombre}</p>

                {/* Navegación real con React Router */}
                <Link
                  to={`/productos/${pid}`}
                  className="btn-overlay"
                  onClick={() => handleClickLegacy(pid)}
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
