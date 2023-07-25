import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadComponent = () => {
  const [imageFile, setImageFile] = useState(null);

  // ... other code for handling the image selection and updating the state

  const handleSubmit = async () => {
    try {
      // Create a new FormData object
      const formData = new FormData();

      // If the imageFile is not updated, use the previous value or a default value (e.g., null)
      formData.append('image', imageFile || null);

      // Make the Axios request with the FormData
      const response = await axios.post('/your-api-endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type as multipart form data
        },
      });

      // Handle the response as needed
      console.log('Response:', response.data);
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {/* Your form input elements */}
      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ImageUploadComponent;
