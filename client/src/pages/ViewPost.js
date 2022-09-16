import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import ExperienceCard from '../components/ExperienceCard/ExperienceCard';
import { deletePost } from '../api/deletePost';
import { getPost } from '../api/getPost';
import { UserContext } from '../UserContext';

const ViewPost = () => {
  const { userID } = React.useContext(UserContext);
  const [user_id] = userID;
  let { id } = useParams();
  const [post, setPost] = useState();
  const [hasBeenDeleted, setHasBeenDeleted] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    async function getAndSetPost() {
      const data = await getPost(id);
      setPost(data);
      if (data.user_id === user_id) setIsOwner(true);
    }
    getAndSetPost();
  }, [id, user_id]);

  const handleDelete = async () => {
    await deletePost(id);
    setHasBeenDeleted(true);
  };

  //todo: delete button stays on screen after delete
  //todo: actually make this look good
  //todo: confirmation modal before deletion
  //todo: make all api client requests separate files
  //todo: store shit in cookies so refresh dont break shit
  return (
    <>
      {!post && <div>Loading...</div>}
      {post && (
        <>
          {!hasBeenDeleted && (
            <ExperienceCard
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
          {isOwner && <Button onClick={handleDelete}> Delete Post </Button>}
        </>
      )}
    </>
  );
};

export default ViewPost;
