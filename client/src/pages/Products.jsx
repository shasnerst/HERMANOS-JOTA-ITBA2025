// client/src/pages/Products.jsx
import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";

export default function Products() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setItems(await res.json());
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, []);

  if (err) return <p>Error: {err}</p>;
  if (!items.length) return <p>No hay productos.</p>;

  return <ProductList products={items} />;
}
