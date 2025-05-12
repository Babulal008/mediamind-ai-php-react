import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import { sendDataToWebService} from './services/SendImageService';
import './css/getvideo.css';
import axios from 'axios';
import Cookies from 'js-cookie';

function formatMilliseconds(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${paddedSeconds}`;
}

function GetVideo() {
  const location = useLocation();
  // console.log(location.state);
  const data = location.state.items || []; // Accessing data passed from Screen 1
  // console.log(data);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timecompleted, settimeCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  var forreadyvideo = '';

  const [text, settext] = useState([]);



  useEffect(() => {
    const totalDuration = 180000;
    let elapsedTime = 0;
    const interval = setInterval(() => {
      elapsedTime += 1000;
      const calculatedProgress = (elapsedTime / totalDuration) * 100;
      setProgress(calculatedProgress);

      //const calculatedTimeRemaining = (totalDuration - elapsedTime) / 60000;
      const calculatedTimeRemaining1 = (totalDuration - elapsedTime);
      const calculatedTimeRemaining = formatMilliseconds(calculatedTimeRemaining1);

      setTimeRemaining(calculatedTimeRemaining);

      if (elapsedTime >= totalDuration) {

        console.log('forreadyvideo');
        console.log('forreadyvideo');
        if (forreadyvideo == '') {
          console.log("video not ready");
          elapsedTime = 20000;
          setLoading(true);
        }
        else {

          clearInterval(interval);
          settimeCompleted(true);
          setProgress(100);
          // console.log("ready is");
          //  console.log(forreadyvideo);
          navigate('/ready', { state: { forreadyvideo } });  // Path to navigate to after the delay
          setTimeout(() => {
            //  window.location.reload(); // Refresh the page
          }, 5);
        }


      }
    }, 1000);

    const scriptout = Cookies.get('scripttxt');
    console.log('cookie in getvideo');
    console.log(scriptout);
    // let aa=[tt:scriptout];
    if (scriptout) {
      //  const  data1=[...data,scriptout];
    }
    const Scripted = { text: scriptout };
    const updatedData = { ...data, Scripted };

    console.log('updatedData', updatedData);

    axios.post('https://imagegen.stellans.com/api/receiveimages.php', { data: updatedData })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          //setforready(response.data);
          forreadyvideo = response.data;
        }
        if (timecompleted) {
          console.log('completed response');
          //const forreadyvideo=response.data;
          // setforready(response.data);
        }
        else {
          console.log("notcompleted yet");
        }


      })
      .catch((error) => {
        console.error("Error during the POST request", error);
      });






    return () => clearInterval(interval);
  }, []);


  
  const localvalue = localStorage.getItem('loglevel');
  
  return (
    <>


      <div className='videospecific'>

        <h3 class="mb-6 text-center">AI short is almost ready...</h3>

        <img class="mx-auto mb-6" src={`${process.env.PUBLIC_URL}/images/video-gradient.svg`} alt="video" />

        <div class="flex items-center w-full mb-4">
          <div class="progress-bar mr-4">
            <div class="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <h4>{progress.toFixed(0)}%</h4>
        </div>

        {loading ? <div className="waitlong">Validating....</div> : ''}

        <div class="flex items-center justify-center mb-6">
          <span class="text-gray mr-1">Estimated time:</span>
          {timeRemaining !== null && <span class="text-black font-semibold">{timeRemaining}</span>}
        </div>

        <div class="short-limit-info">
          <span class="material-icons">info</span>
          Please do not close tab before generate AI short
        </div>

      </div>
    </>
  );
}

export default GetVideo;
