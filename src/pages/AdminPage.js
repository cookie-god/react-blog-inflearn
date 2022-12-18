import { Link } from "react-router-dom";
import React from "react";
import BlogList from "../components/BlogList";

const AdminPage = () => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Admin</h1>
        <div>
          <Link className="btn btn-success" to="/blogs/create">
            Create New
          </Link>
        </div>
      </div>
      <BlogList isAdmin={true} />
    </div>
  );
};

export default AdminPage;
