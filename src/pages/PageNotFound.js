import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <h3>
        Go to home page : <Link to={"/"}>Home Page</Link>
      </h3>
    </div>
  );
};

export default PageNotFound;
