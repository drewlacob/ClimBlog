import React, {useState} from 'react'
import { Grid, Button, Rating, Box,
         Typography, TextField, Tooltip,
        } from '@mui/material'; 

import { UserContext } from '../UserContext';
import { createPost } from '../utils/clientRequests';

const CreatePost = () => {
  const { userID, firstName } = React.useContext(UserContext);
  const [user_id, ] = userID;
  const [first_name, ] = firstName;

  const [rating, setRating] = useState(0);
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();

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
    const data = new FormData(event.currentTarget);
    var title = data.get('title');
    var date = data.get('date')
    var grade = data.get('grade');
    var description = data.get('description')
    console.log('title', title);
    console.log('date', date);
    console.log('grade', grade);
    console.log('description', description);
    console.log('rating', rating);
    console.log('user_id', user_id);
    console.log('firstName', first_name);
    const {imageURL} = await handleMediaUpload();
    console.log('imageURL: ', imageURL)

    var response = await createPost(
      title, date, first_name, description, grade, rating, user_id, imageURL
    )
    console.log(response);
  }

  return (
    <Grid component="form" noValidate onSubmit={handleSubmit} container direction="column" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2}}>
        <Typography>Create Post</Typography>
        <Grid container direction="row" sx={{display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center'}}>
          <Grid container direction="column" sx={{display: 'flex', alignItems: 'left', justifyContent: 'left', my: 2, ml: '2vw'}}>
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
              rows={5}
            />
          </Grid>
          <Grid container direction="column" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2, mr: '2vw',
                                                  border: 4, borderColor: '#1976d2', borderTopLeftRadius: "8px", borderStyle: 'dashed',
                                                  borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", 
                                                  borderBottomRightRadius: "8px", height:'45vh', ml: '2vw'}}>
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
                   objectFit: 'cover',
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
        </Grid>
        <Button
            type="submit"
            variant="contained"
            sx={{ width: '96%'}}
        >
        Create Post
        </Button>
    </Grid>
  )
}

export default CreatePost