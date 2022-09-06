import React, {useEffect, useState} from 'react'
import ExperienceCard from '../components/experienceCard';
import Stack from '@mui/material/Stack';

import { getAllPosts } from '../utils/clientRequests';

const Feed = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect( () => {
    async function getAndSetPosts(){
      var data = await getAllPosts();
      setPosts(data);
      console.log(data);
      setHasLoaded(true);
      return data;
    }
    getAndSetPosts();
  }, []);
//TODO: ADD SKELETONS WHILE LOADING...
  return (
    <>
    {!hasLoaded && <div>Loading...</div>} 
    {hasLoaded && <Stack
    direction="column"
    justifyContent="flex-start"
    alignItems="center"
    spacing={2}
    mt={2}
    >
      {posts.map(post => (
        <ExperienceCard title={post.title}
                        date={post.date}
                        firstName={post.first_name}
                        description={post.description}
                        grade={post.grade}
                        rating={post.rating}
                        userID={post.user_id}
                        postID={post.post_id}
                        imageURL={post.image_url}
                        key={post.post_id}/>
      ))}
      <div></div>
    </Stack>}
    </>
  )
}

export default Feed