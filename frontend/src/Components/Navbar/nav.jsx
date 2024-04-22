import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav(props) {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchTerm = formData.get("search");
    props.SearchItem(searchTerm);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
      <Link className="navbar-brand ms-2 fs-3" to="/">
        <strong style={{ color: "white" }}>Mega Mart</strong>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item mr-2">
            <form className="d-flex" onSubmit={handleFormSubmit}>
              <div className="input-group custom-input-group">
                <span className="input-group-text custom-input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  className="form-control custom-form-control"
                  type="search"
                  name="search"
                  placeholder="Search Different Products"
                  aria-label="Search Among different Products"
                  autoComplete="off"
                />
              </div>
            </form>
          </li>
          <li className="nav-item" onClick={props.toggleCart}>
            <i
              className="fas fa-shopping-cart"
              style={{ color: "white", marginRight: "10px",marginTop:"10px" }}
            ></i>
            <span style={{ color: "white" }}></span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
