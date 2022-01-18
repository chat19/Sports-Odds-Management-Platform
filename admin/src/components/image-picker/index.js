import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';

const App = () => {
  const [pictures, setPictures] = useState([]);
  const onDrop = picture => {};

  return (
    <ImageUploader
      withPreview={true}
      withIcon={true}
      buttonText='Choose images'
      onChange={onDrop}
      imgExtension={['.jpg', '.gif', '.png', '.gif']}
      maxFileSize={5242880}
    />
  );
};

export default App;
