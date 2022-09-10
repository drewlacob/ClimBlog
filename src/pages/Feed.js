import React, {useEffect, useState} from 'react'
import ExperienceCard from '../components/experienceCard';
import Stack from '@mui/material/Stack';

import { UserContext } from '../UserContext';
import { getAllPosts, getAllPostsByUserID } from '../utils/clientRequests';

const Feed = (props) => {
  const { userID } = React.useContext(UserContext);
  const [user_id, ] = userID;

  const [hasLoaded, setHasLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect( () => {
    async function getAndSetPosts(){
      var data;
      if (props.myPostsOnly){
        data = await getAllPostsByUserID(user_id);
      } else {
        data = await getAllPosts();
      }
      setPosts(data);
      console.log(data);
      setHasLoaded(true);
      return data;
    }
    getAndSetPosts();
  }, [props.myPostsOnly, user_id]);
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
      {posts.length===0 && props.myPostsOnly && 
      <div>There's nothing here yet! Add a post to change that!</div>}
      {posts && posts.map(post => (
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