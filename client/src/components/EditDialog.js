import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Typography, Alert, AlertTitle, TextField, Rating, Box, Tooltip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditDialog(props) {
  const { isOpen } = props;
  const { setIsOpen } = props;
  const { setHasUpdatedPost } = props;
  const [rating, setRating] = useState(props.rating);
  const [previewSource, setPreviewSource] = useState(props.imageURL);
  const [selectedFile, setSelectedFile] = useState();
  const [hasError, setHasError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const nav = useNavigate();
  setHasUpdatedPost(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMediaInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const removeMedia = () => {
    setPreviewSource("");
    setSelectedFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    var title = data.get("title");
    var date = data.get("date");
    var grade = data.get("grade");
    var description = data.get("description");

    if (!title) {
      setHasError("Invalid or missing title!");
      setIsLoading(false);
      return;
    }
    if (!props.userID) {
      setHasError("Invalid credentials to create post. Please try logging in again!");
      setIsLoading(false);
      return;
    }
    if (!previewSource) {
      setHasError("At least one photo or video is required!");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("title", title);
    formData.append("date", date);
    formData.append("first_name", props.firstName);
    formData.append("description", description);
    formData.append("grade", grade);
    formData.append("rating", rating);
    formData.append("user_id", props.userID);
    formData.append("post_id", props.postID);

    await axios.post("http://localhost:3000/updatePost", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setHasError("");
    setIsLoading(false);
    setIsOpen(false);
    setHasUpdatedPost(true);
    nav(`/view-post/${props.postID}`);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" sx={{ display: "flex", justifyContent: "space-between" }}>
          {"Edit Post"}
          <Button color="error" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </DialogTitle>
        <DialogContent>
          <Grid
            component="form"
            noValidate
            onSubmit={handleSubmit}
            container
            direction="column"
            sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Grid container sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
              <Grid
                item
                xs={10}
                md={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  justifyContent: "center",
                }}
              >
                <TextField
                  key="title"
                  margin="normal"
                  required
                  id="title"
                  label="Title"
                  name="title"
                  defaultValue={props.title || ""}
                />
                <TextField
                  key="date"
                  margin="normal"
                  id="date"
                  label="Date"
                  name="date"
                  defaultValue={props.date || ""}
                />
                <TextField
                  key="grade"
                  margin="normal"
                  id="grade"
                  label="Grade"
                  name="grade"
                  defaultValue={props.grade || ""}
                />
                <Grid container direction="row" sx={{ my: 1 }}>
                  <Typography>Rate your experience: </Typography>
                  <Rating
                    name="rating"
                    value={rating || 0}
                    sx={{ ml: 2 }}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </Grid>
                <TextField
                  key="description"
                  margin="normal"
                  id="description"
                  label="Description"
                  placeholder="Description..."
                  name="description"
                  multiline
                  rows={6}
                  defaultValue={props.description || ""}
                />
              </Grid>
              <Grid
                container
                xs={10}
                md={5}
                direction="column"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  my: 2,
                  mb: 1,
                  border: 4,
                  borderColor: "#1976d2",
                  borderTopLeftRadius: "8px",
                  borderStyle: "dashed",
                  borderTopRightRadius: "8px",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                  height: "49vh",
                }}
              >
                {!previewSource && (
                  <Button variant="contained" component="label">
                    Upload
                    <input hidden accept="image/*" type="file" onChange={handleMediaInputChange} />
                  </Button>
                )}
                {previewSource && (
                  <>
                    <Tooltip title="Click to remove image" arrow>
                      <Box
                        component="img"
                        sx={{
                          height: "100%",
                          width: "100%",
                          objectFit: "fill",
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                        alt="Your media here"
                        src={previewSource}
                        onClick={removeMedia}
                      />
                    </Tooltip>
                  </>
                )}
              </Grid>
              <Grid
                container
                xs={10.75}
                direction="column"
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", my: 2 }}
              >
                {!isLoading ? (
                  <Button type="submit" variant="contained" sx={{ width: "100%" }}>
                    Update Post
                  </Button>
                ) : (
                  <LoadingButton
                    loading
                    loadingPosition="center"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    sx={{ width: "100%" }}
                  >
                    Update Post
                  </LoadingButton>
                )}
                {hasError && (
                  <Alert
                    severity="error"
                    variant="filled"
                    sx={{
                      width: "100%",
                      padding: "6px 0px",
                      mt: 2,
                      "& .MuiAlert-icon": { padding: "7px 7px" },
                    }}
                  >
                    <AlertTitle>Error</AlertTitle>
                    {hasError}
                  </Alert>
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
