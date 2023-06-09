import React from 'react';
import { Link } from 'react-router-dom';

const PublicNavbar = ({ title, children }) => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#0">EleventPro</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#0">Home</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#0" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Master
                </a>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#0">Category</a></li>
                  <li><a class="dropdown-item" href="#0">Product</a></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#0" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Transaction
                </a>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#0">Category</a></li>
                  <li><a class="dropdown-item" href="#0">Product</a></li>
                </ul>
              </li> */}
            </ul>
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
            </form>
            <ul class="navbar-nav mb-2 mb-lg-0">
              <Link className='btn btn-outline-light' to="/login">Login</Link>
            </ul>
          </div>
        </div>
      </nav>
      <div className='container my-5'>
        <h3>{title}</h3>
        <hr />
        {children}
      </div>
    </>

  );
};

export default PublicNavbar;
