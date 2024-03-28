import { NavLink } from "react-router-dom";

export default function PageNav() {
  return (
    <nav className="nav-links">
      <ul>
        <li>
          <NavLink to="/therapysession" className="clickNav">
            Click here to Start
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
