import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { bool } from "prop-types";

const BlogForm = ({ editing }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [publish, setPublish] = useState(false);
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalBody, setOriginalBody] = useState("");
  const [originalPublish, setOriginalPublish] = useState(false);

  const getPost = async (id) => {
    if (editing) {
      const res = await axios.get(`http://localhost:3001/posts/${id}`);
      setTitle(res.data.title);
      setOriginalTitle(res.data.title);
      setBody(res.data.body);
      setOriginalBody(res.data.body);
      setPublish(res.data.publish);
      setOriginalPublish(res.data.publish);
    }
  };

  useEffect(() => {
    getPost(id);
  }, [id]);

  const isEdited = () => {
    return (
      title !== originalTitle ||
      body !== originalBody ||
      publish !== originalPublish
    );
  };

  const goBack = () => {
    editing === true ? navigate(`/blogs/${id}`) : navigate("/blogs");
  };

  const onSubmit = async () => {
    if (editing) {
      await axios.patch(`http://localhost:3001/posts/${id}`, {
        title: title,
        body: body,
        publish: publish,
      });
      navigate(`/blogs/${id}`);
    } else {
      await axios.post("http://localhost:3001/posts", {
        title: title,
        body: body,
        publish: publish,
        createdAt: Date.now(),
      });
      navigate("/blogs");
    }
  };

  const onChangePublish = (event) => {
    setPublish(event.target.checked);
  };

  return (
    <div>
      <h1>{editing ? "Edit" : "Create"} a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className="form-control"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows="10"
        />
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={publish}
          onChange={(event) => {
            onChangePublish(event);
          }}
        />
        <label className="form-check-label">Publish</label>
      </div>
      <button
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={editing && !isEdited()}
      >
        {editing ? "Edit" : "Post"}
      </button>
      <button className="btn btn-danger ms-2" onClick={goBack}>
        Cancel
      </button>
    </div>
  );
};

BlogForm.propTypes = {
  editing: bool,
};

BlogForm.defaultProps = {
  editing: false,
};

export default BlogForm;
