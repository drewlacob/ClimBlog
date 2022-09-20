import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Alert, AlertTitle, Grid } from "@mui/material";
import ViewPostCard from "../components/ViewPostCard";
import { deletePost } from "../api/deletePost";
import { getPost } from "../api/getPost";
import { UserContext } from "../UserContext";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import EditDialog from "../components/EditDialog";

const ViewPost = () => {
  const { userID } = React.useContext(UserContext);
  const [user_id] = userID;
  let { id } = useParams();
  const [post, setPost] = useState();
  const [hasBeenDeleted, setHasBeenDeleted] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [hasUpdatedPost, setHasUpdatedPost] = useState(false);

  useEffect(() => {
    async function getAndSetPost() {
      const data = await getPost(id);
      setPost(data);
      if (data.user_id === user_id) setIsOwner(true);
    }
    getAndSetPost();
  }, [id, user_id, hasUpdatedPost]);

  const handleDelete = async () => {
    setIsConfirmDeleteDialogOpen(false);
    await deletePost(id);
    setHasBeenDeleted(true);
  };

  const handleOpenConfirmDelete = () => {
    setIsConfirmDeleteDialogOpen(true);
  };

  const handleEditClicked = () => {
    setIsEditDialogOpen(true);
  };

  return (
    <>
      {!post && <div>Loading...</div>}
      {post && (
        <Grid container direction="column" sx={{ justifyContent: "center", alignContent: "center" }}>
          {!hasBeenDeleted && (
            <ViewPostCard
              title={post.title}
              date={post.date}
              firstName={post.first_name}
              description={post.description}
              grade={post.grade}
              rating={post.rating}
              userID={post.user_id}
              postID={post.post_id}
              imageURL={post.signedImageUrl}
              key={post.post_id}
            />
          )}
          {isOwner && !hasBeenDeleted && (
            <Grid item display="flex" justifyContent="space-between" sx={{ height: "70px" }}>
              <Button
                color="success"
                variant="contained"
                sx={{ mt: 2, mb: 2, width: "48%" }}
                onClick={handleEditClicked}
              >
                Edit Post
              </Button>
              <Button
                color="error"
                variant="contained"
                sx={{ mt: 2, mb: 2, width: "48%" }}
                onClick={handleOpenConfirmDelete}
              >
                Delete Post
              </Button>
            </Grid>
          )}
          <ConfirmDeleteDialog
            isOpen={isConfirmDeleteDialogOpen}
            setIsOpen={setIsConfirmDeleteDialogOpen}
            handleDelete={handleDelete}
          />
          <EditDialog
            isOpen={isEditDialogOpen}
            setIsOpen={setIsEditDialogOpen}
            title={post.title}
            date={post.date}
            firstName={post.first_name}
            description={post.description}
            grade={post.grade}
            rating={post.rating}
            userID={post.user_id}
            postID={post.post_id}
            imageURL={post.signedImageUrl}
            setHasUpdatedPost={setHasUpdatedPost}
          />
          {hasBeenDeleted && (
            <Alert
              severity="success"
              variant="filled"
              sx={{
                width: "90%",
                padding: "6px 0px",
                mt: 2,
                "& .MuiAlert-icon": { padding: "7px 7px" },
              }}
            >
              <AlertTitle>Success</AlertTitle>
              Your post has been deleted! You can now leave this page.
            </Alert>
          )}
        </Grid>
      )}
    </>
  );
};

export default ViewPost;
