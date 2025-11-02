
// src/pages/Home.jsx
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | ok | error
  const [error, setError] = useState(null);

  // Usá tu .env si lo tenés; si no, fallback a localhost:5000
  const API =
    import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:5000";
  const URL = `${API}/api/products`;

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setStatus("loading");
        const res = await fetch(URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (alive) {
          setProducts(Array.isArray(data) ? data : []);
          setStatus("ok");
        }
      } catch (err) {
        if (alive) {
          setError(err.message || "Error cargando productos");
          setStatus("error");
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [URL]);

  return (
    <>
      <Hero />

      {status === "loading" && (
        <div style={{ maxWidth: 980, margin: "24px auto" }}>
          Cargando productos…
        </div>
      )}

      {status === "error" && (
        <div style={{ maxWidth: 980, margin: "24px auto", color: "crimson" }}>
          Error: {error}
        </div>
      )}

      {/* Cuando haya datos, mostramos destacados */}
      {products.length > 0 && (
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FeaturedProducts products={products} />
        </div>
      )}
    </>
  );
}
