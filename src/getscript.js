import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from './components/InputForm';
import { generateImaged3, generateImage } from './services/chatGPTService';

function GetScript() {
  const data = { message: 'Hello from Screen 1!' };
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erroroc, seterroroc] = useState(false);
  const navigate = useNavigate();
  const handleFormSubmit = async (formData) => {
    setLoading(true); // Start loading

    
  };


  return (
    <>
      <div className="creator-wrapper">
        <h3 className="mb-4">AI Script</h3>

        <div className="progress-steps">

          <div className="step-block active">
            <span className="step-label">1. Choose Script</span>
            <span className="step-indicator"><span className="material-icons check-icon">check</span></span>
          </div>
          <div className="step-block">
            <span className="step-label">2. Choose Image</span>
            <span className="step-indicator"><span className="material-icons check-icon">check</span></span>
          </div>
          <div className="step-block">
            <span className="step-label">3. Choose Video</span>
            <span className="step-indicator"><span className="material-icons check-icon">check</span></span>
          </div>
        </div>
        <InputForm onSubmit={handleFormSubmit} />
        {/* <div>&nbsp;</div>
        {erroroc ? <div>Something went wrong, please try again later</div> : ''} */}


      </div>

      {/* <div className="example-part"> */}
        {/* <h6 className="mb-2">AI Example</h6> */}
        {/* <div className="example-media"> */}
          {/* <img className="media-file" src={`${process.env.PUBLIC_URL}/images/ai-example.jpg`} alt="Example media"/> */}
          {/* <video width="320" height="240" controls>
            <source src={`${process.env.PUBLIC_URL}/images/TheMaryCeleste.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
        {/* </div> */}
      {/* </div> */}


    </>
  );
}

export default GetScript;