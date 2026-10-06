import { Link } from "react-router-dom";

const Links = ({ className }) => {
  return (
    <nav className={`links ${className || ""}`}>
        <Link to="/" className="link">Saved Colors</Link>
        <Link to="/color-picker" className="link">Color Picker</Link>
        <Link to="/color-palettes" className="link">Color Palettes</Link>
        <Link to="/color-wheel" className="link">Color Wheel</Link>
    </nav>
  );
};

export default Links;
