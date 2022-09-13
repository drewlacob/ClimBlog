import React from 'react'
import { useParams } from 'react-router-dom';

const ViewPost = () => {
  let { id } = useParams();

  return (
    <div>View Post: {id}</div>
  )
}

export default ViewPost