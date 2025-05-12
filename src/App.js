import React from 'react';
import './App.css';
import './css/custom.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetScript from './getscript';
import GetImages from './GetImages';
import GetVideo from './GetVideo';
import GetAudio from './GetAudio';
import Ready from './ready';
/*
function App() {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [generatedEssay, setGeneratedEssay] = useState('');
  const handleFormSubmit = async (formData) => {
    setLoading(true); // Start loading
    try {
      // const response = await generateEssay(formData);
      const response = await generateImage(formData);
      // const response = await maskImage(formData);
      // return console.log('resp', response);
      //console.log("in app");
      //console.log(response);
      if (response) {
        setLoading(false); // Start loading
        return setImage(response)
       } else {
        return console.log('error');
      }
    } catch (error) {
      console.error('Error handling form submission:', error);
    }
  };

  return (

    <Router>
      <Switch>
        <Route path="/screen1" component={Screen1} />
        <Route path="/screen2" component={Screen2} />
      </Switch>
    </Router>   
  );
}
*/
function App() {
  
 // const data = { message: 'Hello from Screen 1!' };
 //const [AudioSrc, setAudioSrc] = useState('');

 /*const handleFormSubmit1 = async (formData) => {
    const dataa= await generateVoice (formData);
    if(dataa)
    {
   // console.log(dataa);
    const audioBlob = dataa;
    const blob = new Blob([dataa], { type: 'text/plain' });
    const audioUrl = URL.createObjectURL(blob);
    //setAudioSrc(audioUrl);
    console.log('- audio url -');
    console.log(audioUrl);
    return audioUrl;
    }
 }*/
 //handleFormSubmit1('in it too');
 //const audiores=GetAudiofromWebService('here you got');
 // setAudioSrc(GetAudiofromWebService('here you got'));

  return (
<>
    <Router>
      <Routes>
      <Route path="/" element={<GetScript/>} />
        <Route path="/GetScript" element={<GetScript/>} />
        <Route path="/GetImages" element={<GetImages/>} />
        <Route path="/GetAudio" element={<GetAudio/>} />
        <Route path="/GetVideo" element={<GetVideo/>} />
        <Route path="/Ready" element={<Ready/>} />
      </Routes>
    </Router>
</>
  );
}

export default App;