import React, {useState} from 'react'
import { Grid, Button, Rating, Box,
         Typography, TextField, Tooltip, Alert, AlertTitle,
        } from '@mui/material'; 
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

import { UserContext } from '../UserContext';
import { createPost } from '../utils/clientRequests';

const CreatePost = () => {
  const { userID, firstName } = React.useContext(UserContext);
  const [user_id, ] = userID;
  const [first_name, ] = firstName;

  const [rating, setRating] = useState(0);
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [hasError, setHasError] = useState('')
  const [successfullyPosted, setHasSuccessfullyPosted] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

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

  const uploadImageHelper = async (base64EncodedImage) => {
    try {
        const response = await fetch('http://localhost:3000/api/upload' , { //TODO: USE .env
          method: 'POST',
          body: JSON.stringify({ data: base64EncodedImage }),
          headers: { 'Content-Type': 'application/json' },
        })
        const url = await response.json();
        return url;
    } catch (err) {
        console.error(err);
    }
  };

  const handleMediaUpload = () => {
    if (!selectedFile) return "null";
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
           const res = await uploadImageHelper(reader.result);
           resolve(res);
      };
      reader.onerror = reject;
    })
  };

  const removeMedia = () => {
    setPreviewSource('');
    setSelectedFile(null);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    var title = data.get('title');
    var date = data.get('date')
    var grade = data.get('grade');
    var description = data.get('description')

    if (!title){
      setHasError('Invalid or missing title!');
      setIsLoading(false);
      return;
    }
    if (!user_id){
      setHasError('Invalid credentials to create post. Please try logging in again!');
      setIsLoading(false);
      return;
    }
    if (!selectedFile){
      setHasError('At least one photo or video is required!');
      setIsLoading(false);
      return;
    }

    const {imageURL} = await handleMediaUpload();
    if (!imageURL){
      setHasError('Error with uploading media or missing a photo. At least one photo or video is required!');
      setIsLoading(false);
      return;
    }

    var response = await createPost(
      title, date, first_name, description, grade, rating, user_id, imageURL
    )
    if (!response.post_id){
      setHasError('Error creating post, please try again later!');
      setIsLoading(false);
      return;
    }

    setHasError('');
    setHasSuccessfullyPosted(true);
    setIsLoading(false);
  }

  return (
    <Grid component="form" noValidate onSubmit={handleSubmit} container direction="column" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2}}>
        <Typography>Create Post</Typography>
        <Grid container sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
          <Grid item xs={10} md={5} sx={{display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', mt: 2}}>
            <TextField
              margin="normal"
              required
              id="title"
              label="Title"
              name="title"
            />
            <TextField
              margin="normal"
              id="date"
              label="Date"
              name="date"
            />
            <TextField
              margin="normal"
              id="grade"
              label="Grade"
              name="grade"
            />
          <Grid container direction="row" sx={{my: 1}}>
          <Typography>Rate your experience: </Typography>
          <Rating
            name="rating"
            value={rating || 0}
            sx={{ml:2}}
            onChange={(e) => setRating(e.target.value)}
          />
          </Grid>
            <TextField
              margin="normal"
              id="description"
              label="Description"
              placeholder="Description..."
              name="description"
              multiline
              rows={6}
            />
          </Grid>
          <Grid container xs={10} md={5} direction="column" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2, mb:1,
                                                  border: 4, borderColor: '#1976d2', borderTopLeftRadius: "8px", borderStyle: 'dashed',
                                                  borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", 
                                                  borderBottomRightRadius: "8px", height:'49vh'}}>
            {!previewSource && <Button variant="contained" component="label">
              Upload
              <input hidden accept="image/*" type="file" onChange={handleMediaInputChange}/>
            </Button>}
            {previewSource && 
                <>
                <Tooltip title="Click to remove image" arrow>
                 <Box
                 component="img"
                 sx={{
                   height: '100%',
                   width: '100%',
                   objectFit: 'fill',
                   '&:hover': {
                    cursor: 'pointer',
                  }
                 }}
                 alt="Your media here"
                 src={previewSource}
                 onClick={removeMedia}
               />
               </Tooltip>
               </>}
          </Grid>
          <Grid container xs={10.75} direction="column" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2}}>
            {!isLoading ? <Button
              type="submit"
              variant="contained"
              sx={{ width: '100%'}}
              >
              Create Post
              </Button> : <LoadingButton
                          loading
                          loadingPosition="center"
                          startIcon={<SaveIcon />}
                          variant="contained"
                          sx={{ width: '100%'}}
                      >
                    Create Post
                    </LoadingButton>}
          {hasError && <Alert severity="error" variant="filled" sx={{width:'100%', padding: '6px 0px', mt: 2,
                        "& .MuiAlert-icon": { padding: '7px 7px'}} }>
                <AlertTitle>Error</AlertTitle>
                    {hasError}
              </Alert>}
            {successfullyPosted && <Alert severity="success" variant="filled" sx={{width:'100%', padding: '6px 0px', mt: 2,
                                  "& .MuiAlert-icon": { padding: '7px 7px'}} }>
                <AlertTitle>Success</AlertTitle>
                    Your post has been created!
              </Alert>}
          </Grid>
        </Grid>
    </Grid>
  )
}

export default CreatePost