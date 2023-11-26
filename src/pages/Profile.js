import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Helpers/AuthContext";
function Profile() {
  let { id } = useParams();
  const [username, setUnserName] = useState("");
  const [listOfPosts, setListOfPost] = useState([]);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/info/${id}`).then((response) => {
      setUnserName(response.data.username);
    });
    axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
      setListOfPost(response.data);
    });
  }, []);
  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>User name: {username} </h1>
        {authState.username === username && (
          <button
            onClick={() => {
              navigate("/changepassword");
            }}
          >
            Change my password
          </button>
        )}
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div className="post" key={value.id}>
              <div className="title">{value.title}</div>
              <div
                className="body"
                onClick={() => {
                  navigate(`/post/${value.id}`);
                }}
              >
                {value.postText}
              </div>
              <div className="footer">
                <div className="username">{value.username}</div>
                <div className="buttons">
                  <label>{value.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
