import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "@/store/notification-context";

function Comments(props) {
  const notificationCtx = useContext(NotificationContext);
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [updateComments, setUpdateComments] = useState(1);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.allComments);
        });
    }
  }, [showComments, updateComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    notificationCtx.showNotification({
      title: "Submitting Comment!",
      status: "pending",
      message: "Your comment is on the way...",
    });
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "Server Error");
        });
      })
      .then((data) => {
        console.log(data);
        setUpdateComments((v) => v + 1);
        notificationCtx.showNotification({
          title: "Success!",
          status: "success",
          message: "Comment Submitted with Success",
        });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: "Error!",
          status: "error",
          message: err.message || "Something went wrong!",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
