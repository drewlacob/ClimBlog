import React from "react";

import { Button } from "@mui/material";
import './index.css';

export default function VideoInput(props) {
  const { height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  const handleUpload = async () => {
    console.log('uploading...');
    console.log('source:', source)
    const response = await fetch('http://localhost:3000/api/upload' , { //TODO: USE .env
          method: 'POST',
          body: JSON.stringify({ data: source }),
          headers: { 'Content-Type': 'application/json' },
        })
    console.log(response);
        const url = await response.json();
        return url;

  }

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {!source && <button onClick={handleChoose}>Choose</button>}
      {source && (
        <video
          className="VideoInput_video"
          width='100%'
          height={height}
          controls
          src={source}
        />
      )}
      <div className="VideoInput_footer">{source && 
        <Button 
        type="submit"
        onClick={handleUpload}>
          Upload
        </Button>}</div>
    </div>
  );
}
