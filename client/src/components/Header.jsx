import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import CartButton from "./CartButton";
import "../styles/Header.css";

const Header = ({ cartCount = 0, onCartOpen = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onMenuToggle = () => setIsMenuOpen(v => !v);
  const go = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <HamburgerMenu isOpen={isMenuOpen} onToggle={onMenuToggle} />

      {/* LOGO: desde /public se sirve en raíz */}
      <button
        type="button"
        className="logo"
        onClick={() => go("/")}
        aria-label="Ir a la página principal de Hermanos Jota"
        style={{ background: "none", border: 0, padding: 0, cursor: "pointer" }}
      >
        <img src="/logo.svg" alt="Logo de Hermanos Jota" />
      </button>

      <nav className={`nav-primary ${isMenuOpen ? "active" : ""}`} aria-label="Menú principal">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/productos"
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
              onClick={() => setIsMenuOpen(false)}
            >
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contacto"
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </NavLink>
          </li>
        </ul>
      </nav>

      <nav className="nav-user-actions" aria-label="Acciones de usuario">
        <button className="icon-btn" aria-label="Mi cuenta">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/>
          </svg>
        </button>
        <CartButton cartCount={cartCount} onClick={onCartOpen} />
      </nav>
    </header>
  );
};

export default Header;
