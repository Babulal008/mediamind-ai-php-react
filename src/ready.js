import React, {useState,useEffect} from 'react';
//import './css/ready.css';
import { useLocation } from 'react-router-dom';
import { dwvideofromWebService} from './services/SendImageService';

function getFilenameFromURL(fileUrl) {
  const lastSlashIndex = fileUrl.lastIndexOf('/');
  return fileUrl.substring(lastSlashIndex + 1); // Extracts the substring after the last slash
}

function Ready() {
  const location = useLocation();
  const [videolink, setvideolink] = useState();
  
 

  useEffect(() => {
    
    console.log(location);
    const data = location.state.forreadyvideo; // Accessing data passed from Screen 1
    console.log(data);
    const filename = getFilenameFromURL(data.video_url);
    let fulllink = "https://imagegen.stellans.com/api/video?v=" + filename;
    setvideolink(fulllink);
  }, []);

  const handledwvideo = async (formData) => {
    // console.log(formData);
    // setLoading(true); // Start loading
     
     try {
       console.log(formData);
       const response = await dwvideofromWebService(formData);
       if (response) {
        // console.log(response);
//         navigate('/GetImages', { state: { response } });
//         return setImage(response);
        } else {
         return console.log('error');
       }
     } catch (error) {
       console.error('Error handling form submission:', error);
     }
   };


 /* const data = {
    key: '850Q',
    // Other data to send
  };

*/
    //Cookies.remove('cookieName');

  //  const localvalue = localStorage.getItem('loglevel');
    //data[]=Array('localval')
  // const combineara=[...data,localvalue]
    //sendDataToWebService (combineara);
  return (
    <>
      
        <div class="short-ready-container">
          <div class="short-ready-wrap">
            <img class="mx-auto mb-6" src={`${process.env.PUBLIC_URL}/images/check-gradient.svg`} alt="Check"/>
            <h3 class="mb-4 text-center">Viral short is ready!</h3>
         {/*  <button type='button' onClick={() => handledwvideo(videolink)} class="btn btn-gradient">Download short</button> */}
           <a  href={videolink} class="btn btn-gradient downbtn">Download short</a>
               {/* <div class="share-options">
              <h5 class="mb-4 text-center">Share short on:</h5>
              <div class="share-btns">
                <a href="#!"><img src="images/tiktok.svg" alt="TikTok"/></a>
                <a href="#!"><img src="images/youtube.svg" alt="youtube"/></a>
                <a href="#!"><img src="images/instagram.svg" alt="Instagram"/></a>
              </div>
                </div>*/}
          </div>
        </div>
   

        {/* <div class="example-part"> */}
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

export default Ready;
