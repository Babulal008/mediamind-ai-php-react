import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetAudiofromWebService } from './services/SendImageService';
import Cookies from 'js-cookie';
import Switch from 'react-switch';

function GetAudio() {
  const [AudioSrc, setAudioSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);
  const [voice, setVoice] = useState(false);
  const [count, setCount] = useState(0);
  // const [selectedItem, setSelectedItem] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedId, setSelectId] = useState();

  // const bg_musicData = [
  //   { value: 'https://staging.yatter.io/webs/mp3s/staticaudio.mp3', label: ' epic battle music' },
  //   { value: 'https://staging.yatter.io/webs/mp3s/staticaudio.mp3', label: 'tranquility' },
  //   // { value: 'https://staging.yatter.io/webs/mp3s/staticaudio.mp3', label: 'https://staging.yatter.io/webs/mp3s/staticaudio.mp3' },
  // ];

  const bgMusic_data = [
    {
      id: 1,
      audioSrc: 'https://imagegen.stellans.com/api/mp3s/staticaudio.mp3',
      voiceName: 'Epic Battle Music',
    },
    {
      id: 2,
      audioSrc: 'https://imagegen.stellans.com/api/mp3s/staticaudio.mp3',
      voiceName: 'Transquility-Anno Domini...',
    },
    {
      id: 3,
      audioSrc: 'https://imagegen.stellans.com/api/mp3s/staticaudio.mp3',
      voiceName: 'Forever-Anno Domini Be...',
    },
    // {
    //   id: 4,
    //   audioSrc: 'https://imagegen.stellans.com/api/staticcontent/staticaudio1.mp3 ',
    //   voiceName: 'Heaven and Hell-Jeremy...',
    // },
  ]
  // Handler for when the selection changes

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const items = location.state.items || []; // Accessing data passed from Screen 1
  // console.log(items);
  /* const data = {
     key: '850Q',
     // Other data to send
   };
 */
  //GetAudiofromWebService ("You are IN");

  useEffect(() => {

    const loadData = async () => {
      const scriptout = Cookies.get('scripttxt');
      console.log('cookie in getaudio');
      console.log(scriptout);
      setLoading(true);
      const result = await GetAudiofromWebService(scriptout);
      console.log('result is');
      //  console.log(result);
      if (result) {
        setLoading(false);
        setCount(result);
      }
    }

    loadData();

    //const goin=GetAudiofromWebService ("You are IN");
    //console.log('go inhere');
    //console.log(goin);
    // setCount(goin); // Initialize or perform a side effect once
  }, []); // Empty dependency array

  /* setLoading(true);

   useEffect(() => {
       const audiores=GetAudiofromWebService('here you got');
       if(audiores)
       {
       setAudioSrc(audiores);
       setLoading(false);
       }
     }, []); // Empty dependency array
*/
  /*  const audiores=GetAudiofromWebService('here you got');
    if(audiores)
    {
    setAudioSrc(audiores);
    setLoading(false);
    }*/


  const navigateToVideo = () => {
    console.log('items are :');
    console.log(items);

    // const newKey = Math.max(...Object.keys(items).map(Number)) + 1;
    const numericKeys = Object.keys(items).filter(key => !isNaN(Number(key)));
    const newKey = numericKeys.length > 0 ? Math.max(...numericKeys.map(Number)) + 1 : 0;
    let newlink = { audio: count };
    items[newKey] = newlink;
    const updatedValue = { ...items, bgMusicData: { music_name: selectedValue.audioSrc, voice_switch: voice } };
    // const updatedValue = { ...items, bgMusicData: { music_name: selectedItem, voice_switch: voice } };
    console.log('getaudioupdated', updatedValue)
    const Audio = { audio: count };
    // const updatedItems = { ...items, Audio };
    console.log('updated items are :', items);
    // console.log(items);
    //  const dataToPass = { items };
    navigate('/GetVideo', { state: { items: updatedValue } });
  };

  const [isPlaying, setIsPlaying] = useState(true); // Track play/pause state
  const audioRef = useRef(null); // Reference to the audio element
  const audioRefff = useRef(null); // Reference to the audio element
  // const audioRefff = useRef(new Audio());

  const togglePlayPause = (e) => {
    e.preventDefault();
    console.log('inside view');
    const audio = audioRef.current;
    console.log('audio', audio);
    audio.play();
    /*  if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }*/
    setIsPlaying(!isPlaying); // Toggle the state
  };
  // console.log('audioref', audioRef);

  let currentAudio = null;
  let currentAudioElement = null;

  const togglePlay = (item, index) => {
    // const selectedAudioUrl = item.audioSrc;
    // // setSelectedValue(selectedAudioUrl);
    // console.log('selectedAudioUrl', selectedAudioUrl);
    // // Play the selected audio
    // if (selectedAudioUrl) {
    //   const audio = new Audio(selectedAudioUrl);
    //   audio.play().catch(error => console.error("Error playing the audio file:", error));
    // }

    // const currentAudio = audioRefff.current[index].current;
    // const currentAudio = audioRefff.current;
    // console.log('currentAudio', currentAudio);
    // currentAudio.play();

    const selectedAudioUrl = item.audioSrc;
    console.log('selectedAudioUrl', selectedAudioUrl);

    // Stop the currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0; // Reset audio to start
    }

    // If the selected item is the same as the currently playing, just stop and reset
    if (currentAudioElement && currentAudioElement.id === `audioPlayer-${item.id}`) {
      currentAudio = null;
      currentAudioElement = null;
      return;
    }

    // Play the selected audio
    const audioElement = document.getElementById(`audioPlayer-${item.id}`);
    if (audioElement) {
      audioElement.play().then(() => {
        console.log("Audio is playing");
        currentAudio = audioElement;
        currentAudioElement = audioElement;
      }).catch(error => {
        console.error("Error playing the audio file:", error);
        // Handle autoplay restriction or other errors
        // For example, you could show a message asking the user to click again
      });
    }

  };





  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  //   const selectedAudioUrl = event.target.value;
  //   setSelectedValue(selectedAudioUrl);

  //   // Play the selected audio
  //   if (selectedAudioUrl) {
  //     const audio = new Audio(selectedAudioUrl);
  //     audio.play().catch(error => console.error("Error playing the audio file:", error));
  //   }
  // };
  return (
    <>

      <div class="creator-wrapper">
        <h3 class="mb-4">AI Voice</h3>

        <div class="progress-steps">

          <div class="step-block completed"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ cursor: hover && 'pointer' }}
            onClick={() => hover && navigate('/GetScript')}
          >
            <span class="step-label" style={{ color: hover && '#F11D28' }}>1. Choose Script</span>
            <span class="step-indicator" style={{ transform: hover && 'scale(1.06)' }}><span class="material-icons check-icon">check</span></span>
          </div>
          <div class="step-block completed"
          // onMouseEnter={() => setHover(true)}
          // onMouseLeave={() => setHover(false)}
          // style={{ width: hover && 500 }}
          // onClick={() => hover && navigate('/GetImages')}
          >
            <span class="step-label">2. Choose Image</span>
            <span class="step-indicator"><span class="material-icons check-icon">check</span></span>
          </div>
          <div class="step-block active">
            <span class="step-label">3. Choose Video</span>
            <span class="step-indicator"><span class="material-icons check-icon">check</span></span>
          </div>

        </div>

        <form class="creator-form" action="#">
          <div class="voices">
            <div class="voice-block selected">
              {/*  <audio ref={audioRef} id='audioPlayer' src={count}/> */}
              <audio ref={audioRef} id='audioPlayer' src={'https://imagegen.stellans.com/api/mp3s/staticaudio.mp3'} />
              {loading ? '' : <a class="voice-play" onClick={togglePlayPause}><span class="material-symbols-outlined">play_circle</span></a>}
              {/*} <a class="voice-play" onClick={togglePlayPause}>{isPlaying ? 'play' : 'pause'}<span class="material-symbols-outlined">play_circle</span></a>*/}
              <span class="voice-name">Male - Onyx <span class="material-icons check-icon">check</span></span>
            </div>

            {/* <audio ref={audioRef} src={count}></audio>
      <a onClick={togglePlayPause}>
        <a class="voice-play" onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}<span class="material-symbols-outlined">play_circle</span></a>
  </a>*/}

          </div>
          <div className='flex mb-2'>
            <label htmlFor="insert-qabout" className="caption">Background Music</label>
            {/* <button onClick={() => setIsToggled(!isToggled)} className={`toggle-button ${isToggled ? 'on' : 'off'}`}>
                        {isToggled ? 'ON' : 'OFF'}
                    </button> */}
            <Switch
              onChange={() => setVoice(!voice)}
              checked={voice}
              onColor='#FFA12C'
              onHandleColor="#fffff"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={18}
              width={48}
              className="react-switch"
              id="material-switch"
            />
          </div>

          {
            voice &&
            <>

              <div class="voices">
                <div
                  className={`voice-block ${selectedId === 1 ? 'selected' : ''}`}
                >
                  {/*  <audio ref={audioRef} id='audioPlayer' src={count}/> */}
                  <audio ref={audioRef} id='audioPlayer' src={'https://imagegen.stellans.com/api/mp3s/staticaudio.mp3'} />

                  <a class="voice-play"
                    onClick={(e) => {
                      togglePlayPause(e);
                      setSelectId(1);
                    }}
                  ><span class="material-symbols-outlined">play_circle</span></a>
                  {/*} <a class="voice-play" onClick={togglePlayPause}>{isPlaying ? 'play' : 'pause'}<span class="material-symbols-outlined">play_circle</span></a>*/}
                  <span class="voice-name">Epic Battle Music <span class="material-icons check-icon">check</span></span>
                </div>

                {/* <audio ref={audioRef} src={count}></audio>
      <a onClick={togglePlayPause}>
      <a class="voice-play" onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}<span class="material-symbols-outlined">play_circle</span></a>
    </a>*/}

              </div>
              <div class="voices">
                <div
                  className={`voice-block ${selectedId === 2 ? 'selected' : ''}`}
                >
                  {/*  <audio ref={audioRef} id='audioPlayer' src={count}/> */}
                  <audio ref={audioRef} id='audioPlayer' src={'https://imagegen.stellans.com/api/mp3s/staticaudio.mp3'} />

                  <a class="voice-play"
                    onClick={(e) => {
                      togglePlayPause(e);
                      setSelectId(2);
                    }}
                  ><span class="material-symbols-outlined">play_circle</span></a>
                  {/*} <a class="voice-play" onClick={togglePlayPause}>{isPlaying ? 'play' : 'pause'}<span class="material-symbols-outlined">play_circle</span></a>*/}
                  <span class="voice-name">Transquility-Anno Domini... <span class="material-icons check-icon">check</span></span>
                </div>

                {/* <audio ref={audioRef} src={count}></audio>
      <a onClick={togglePlayPause}>
        <a class="voice-play" onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}<span class="material-symbols-outlined">play_circle</span></a>
  </a>*/}

              </div>
              <div class="voices">
                <div
                  className={`voice-block ${selectedId === 3 ? 'selected' : ''}`}
                >
                  {/*  <audio ref={audioRef} id='audioPlayer' src={count}/> */}
                  <audio ref={audioRef} id='audioPlayer' src={'https://imagegen.stellans.com/api/mp3s/staticaudio.mp3'} />

                  <a class="voice-play"
                    onClick={(e) => {
                      togglePlayPause(e);
                      setSelectId(3);
                    }}
                  ><span class="material-symbols-outlined">play_circle</span></a>
                  {/*} <a class="voice-play" onClick={togglePlayPause}>{isPlaying ? 'play' : 'pause'}<span class="material-symbols-outlined">play_circle</span></a>*/}
                  <span class="voice-name">Forever-Anno Be...<span class="material-icons check-icon">check</span></span>
                </div>

                {/* <audio ref={audioRef} src={count}></audio>
      <a onClick={togglePlayPause}>
        <a class="voice-play" onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}<span class="material-symbols-outlined">play_circle</span></a>
  </a>*/}

              </div>
              <div class="voices">
                <div
                  className={`voice-block ${selectedId === 4 ? 'selected' : ''}`}
                >
                  {/*  <audio ref={audioRef} id='audioPlayer' src={count}/> */}
                  <audio ref={audioRef} id='audioPlayer' src={'https://imagegen.stellans.com/api/mp3s/staticaudio.mp3'} />

                  <a class="voice-play"
                    onClick={(e) => {
                      togglePlayPause(e);
                      setSelectId(4);
                    }}
                  ><span class="material-symbols-outlined">play_circle</span></a>
                  {/*} <a class="voice-play" onClick={togglePlayPause}>{isPlaying ? 'play' : 'pause'}<span class="material-symbols-outlined">play_circle</span></a>*/}
                  <span class="voice-name">Heaven and Hell-Jeremy... <span class="material-icons check-icon">check</span></span>
                </div>

                {/* <audio ref={audioRef} src={count}></audio>
      <a onClick={togglePlayPause}>
        <a class="voice-play" onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}<span class="material-symbols-outlined">play_circle</span></a>
  </a>*/}

              </div>


            </>
            // <div className='voices'>

            //   {bgMusic_data.map((item, index) => (
            //     <div key={item.id}
            //       //  className="voice-block"
            //       className={`voice-block ${selectedValue.id === item.id ? 'selected' : ''}`} // Add 'selected' class if item is selected
            //     >
            //       <audio
            //         // ref={audioRefff}
            //         // ref={audioRefff.current[index]}
            //         id={`audioPlayer-${item.id}`}
            //         src={item.audioSrc}
            //       />
            //       <a className="voice-play" onClick={() => {
            //         togglePlay(item)
            //         setSelectedValue(item)
            //       }
            //       }>
            //         <span className="material-symbols-outlined">play_circle</span>
            //       </a>
            //       <span className="voice-name">{item.voiceName} <span className="material-icons check-icon">check</span></span>
            //     </div>
            //   ))}
            // </div>
            //  <div className='mb-3'>
            //   <select value={selectedValue} onChange={handleChange}>
            //     <option value="">Select Background music</option>
            //     {bg_musicData.map((item) => (
            //       <option key={item.value} value={item.value} >
            //         {/* {item.label} */}
            //         <label htmlFor="insert-qabout" className="caption">{item.label}</label>
            //       </option>
            //     ))}
            //   </select>
            //   {/* {selectedValue && <div>
            //     <label htmlFor="insert-qabout" className="caption">  You selected: {selectedValue}</label>
            //   </div>} */}
            // </div>
          }
          {loading ? <div className="loader"></div> : <button type="button" class="btn btn-gradient" onClick={navigateToVideo}>Generate short</button>}
        </form>

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

export default GetAudio;
