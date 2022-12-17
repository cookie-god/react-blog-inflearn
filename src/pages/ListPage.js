import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router";

const ListPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPosts = async () => {
    const res = await axios.get("http://localhost:3001/posts");
    setPosts(res.data);
    setLoading(false);
  };

  const deleteBlog = async (event, id) => {
    event.stopPropagation();
    await axios.delete(`http://localhost:3001/posts/${id}`);
    setPosts((prevPost) => prevPost.filter((post) => post.id !== id));
  };

  useEffect(() => {
    getPosts();
  }, []);

  const renderBlogList = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (posts.length === 0) {
      return <div>No blog posts found</div>;
    }

    return posts.map((post) => {
      return (
        <Card
          key={post.id}
          title={post.title}
          onClick={() => navigate(`/blogs/${post.id}`)}
        >
          <div>
            <button
              className="btn btn-danger btn-sm"
              onClick={(event) => deleteBlog(event, post.id)}
            >
              Delete
            </button>
          </div>
        </Card>
      );
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Blogs</h1>
        <div>
          <Link className="btn btn-success" to="/blogs/create">
            Create New
          </Link>
        </div>
      </div>
      {renderBlogList()}
    </div>
  );
};

export default ListPage;
