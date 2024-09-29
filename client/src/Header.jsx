import { Link } from "react-router-dom";
import logo from "./assets/react.svg";
const Header = () => {
  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-light">
      <Link to="/">
        <img src={logo} alt="Logo" style={{ height: "50px", width: "50px" }} />{" "}
      </Link>
    </header>
  );
};

export default Header;
