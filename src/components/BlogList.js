import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import propTypes from "prop-types";
import Pagination from "./Pagination";

const BlogList = ({ isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParam = params.get("page");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [searchText, setSearchText] = useState("");
  const limit = 3;

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPosts / limit));
  }, [numberOfPosts]);

  const onClickPageButton = (page) => {
    navigate(`${location.pathname}?page=${page}`);
    setCurrentPage(page);
    getPosts(page);
  };

  const getPosts = useCallback(
    async (page = 1) => {
      let params = {
        _page: page,
        _limit: limit,
        _sort: "id",
        _order: "desc",
        title_like: searchText,
      };
      if (!isAdmin) {
        params = { ...params, publish: true };
      }
      const res = await axios.get(`http://localhost:3001/posts`, {
        params: params,
      });
      setNumberOfPosts(res.headers["x-total-count"]);
      setPosts(res.data);
      setLoading(false);
    },
    [isAdmin, searchText]
  );

  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1);
  }, []);

  const deleteBlog = async (event, id) => {
    event.stopPropagation();
    await axios.delete(`http://localhost:3001/posts/${id}`);
    setPosts((prevPost) => prevPost.filter((post) => post.id !== id));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const renderBlogList = () => {
    return posts.map((post) => {
      return (
        <Card
          key={post.id}
          title={post.title}
          onClick={() => navigate(`/blogs/${post.id}`)}
        >
          {isAdmin ? (
            <div>
              <button
                className="btn btn-danger btn-sm"
                onClick={(event) => deleteBlog(event, post.id)}
              >
                Delete
              </button>
            </div>
          ) : null}
        </Card>
      );
    });
  };

  const onSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`${location.pathname}?page=1`);
      setCurrentPage(1);
      getPosts(1);
    }
  };

  return (
    <div>
      <input
        className="form-control"
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
        onKeyUp={onSearch}
      ></input>
      <hr />
      {posts.length === 0 ? (
        <div>No blog posts found</div>
      ) : (
        <div>
          {renderBlogList()}
          {numberOfPages > 1 && (
            <Pagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              onClick={onClickPageButton}
            />
          )}
        </div>
      )}
    </div>
  );
};

BlogList.propTypes = {
  isAdmin: propTypes.bool,
};

BlogList.defaultProps = {
  isAdmin: false,
};

export default BlogList;
