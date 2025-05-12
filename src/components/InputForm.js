import { OpenAI } from 'openai';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { generateImaged3 } from '../services/chatGPTService';
import { useNavigate } from 'react-router-dom';
import Switch from 'react-switch';
// import { writeFile, readFile } from 'fs-'
// import fs from 'fs';
// import openai from 'openai';

function formatMilliseconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${paddedSeconds}`;
}

const InputForm = ({ onSubmit }) => {

    const navigate = useNavigate();

    const form = new FormData()

    const filereader = new FileReader()
    const [loading, setLoading] = useState(false);
    const [isTextAreaBlank, setIsTextAreaBlank] = useState(false);
    const [progress, setProgress] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [isQabout, setisQabout] = useState(false);
    const [isError, setIsError] = useState(false);
    const [image, setImage] = useState([]);
    const [erroroc, seterroroc] = useState(false);
    const [isToggled, setIsToggled] = useState(true);
    const wordLimit = 300;
    const openai = new OpenAI({
        
        dangerouslyAllowBrowser: true
    })


    const [formData, setFormData] = useState({
        language: '',
        fieldOfStudy: '',
        natureOfStudy: '',
        classOrCourse: '',
        toneOfVoice: '',
        generalInformation: '',
    });

    const [Stvalue, setStvalue] = useState('');

    const [caption, setCaption] = useState({
        caption_switch: isToggled,
        caption_color: ""
    });
    const [subformData, setSubFormData] = useState({
        // image: "",
        question: '',
        qabout: '',
    });

    // const [subformData, setSubFormData] = useState('');

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);

    const [timecompleted, settimeCompleted] = useState(false);

    var forreadyvideo = '';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleformSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        const textAreaValue = subformData.question;
        const InputValueq = subformData.qabout;

        const totalDuration = 40000;
        // const totalDuration = 150000;
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
                    console.log("data not ready");
                    elapsedTime = 0;
                    setLoading(true);
                }
                else {
                    setProgress(100);
                    clearInterval(interval);
                    settimeCompleted(true);
                    setProgress(100);
                    //  navigate('/GetImages', { state: { forreadyvideo } });
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
        try {
            // const response = await generateEssay(formData);
            console.log('too much');
            console.log('form', subformData);
            const response = await generateImaged3(subformData);
            
            if (response) {
                console.log(response);
                forreadyvideo = response;
                //  setLoading(false); // Start loading
                forreadyvideo = response;
                let timerem = totalDuration - elapsedTime;
                console.log(timerem);
                
                setTimeout(() => {
                    navigate('/GetImages', {
                        state: {
                            response: response, // your response data
                            subFormData: subformData, // your additional data
                            caption: caption
                        }
                    });
                }, timerem); // 2000 milliseconds = 2 seconds

                // navigate('/GetImages', { state: { response } });
                // return setImage(response);
            } else {
                seterroroc(true);
                return console.log('error');
            }
        } catch (error) {
            console.error('Error handling form submission:', error);
        }


        if (!textAreaValue.trim()) {
            setIsTextAreaBlank(true);
            setLoading(false);
        } else {
            setIsTextAreaBlank(false);
            // console.log('Form submitted:', textAreaValue);
            // console.log(subformData);
            onSubmit(subformData);
        }
    }



    const handlevalueChange = (event) => {
        const inputValue = event.target.value;

        // const words = inputValue.trim().split(/\s+/); // Split by whitespace to get words

        if (inputValue.length > 300) {
            setIsError(true);
        } else {
            setSubFormData({ ...subformData, [event.target.name]: event.target.value })
            setIsError(false); // Clear error message if character limit is not exceeded
        }

        // Check if the word count exceeds the limit
        // if (words.length <= wordLimit || inputValue.endsWith(' ')) {
        //     setIsError(false);
        //     setSubFormData({ ...subformData, [event.target.name]: event.target.value })// Update the state only if under the limit
        // } else {
        //     setIsError(true);
        // }
    };

    // const handleLoader = async () => {

    // }

    useEffect(() => {
        //  const scriptout = localStorage.getItem('scripttxt');
        const scriptout = Cookies.get('scripttxt');
        console.log(scriptout);
        if (scriptout) {
            setSubFormData({ "question": scriptout });
        }
    }, []);

    const handleSwitchChange = (checked) => {
        setCaption({
            ...caption,
            caption_switch: checked
        });
    };

    // console.log(caption);
    // console.log(isToggled);

    return (
        <>

            <form className="creator-form" onSubmit={handleformSubmit}>

                <label htmlFor="insert-qabout" className="label">What is your video about</label>
                <input id='insert-aboutq' name='qabout' value={subformData.qabout} className='input-control' placeholder='Write here ...' onChange={(e) => setSubFormData({ ...subformData, [e.target.name]: e.target.value })} />
                {isQabout && <p className="error-message">This field cannot be blank.</p>}


                <label htmlFor="insert-script" className="label">Insert Script</label>
                <textarea
                    id="insert-script"
                    name="question"
                    value={subformData.question}
                    rows="4" className="input-control"
                    placeholder="Write here..."
                    // onChange={(e) => setSubFormData({ ...subformData, [e.target.name]: e.target.value })}
                    onChange={handlevalueChange}
                ></textarea>
                {isError && <p style={{ color: 'red', marginBottom: 10 }}>Maximum {wordLimit}  characters allowed!</p>}
                {isTextAreaBlank && <p className="error-message">This field cannot be blank.</p>}
                {erroroc ? <div>Something went wrong, please try again later</div> : ''}
                {/*<textarea id="insert-script" name="question" value={subformData} rows="2" className="input-control" placeholder="Write here..." onChange={(e) => setSubFormData({...subformData, [e.target.name]: e.target.value})}></textarea>*/}
                <div className='flex mb-2'>
                    <label htmlFor="insert-qabout" className="caption">Captions</label>
                    {/* <button onClick={() => setIsToggled(!isToggled)} className={`toggle-button ${isToggled ? 'on' : 'off'}`}>
                        {isToggled ? 'ON' : 'OFF'}
                    </button> */}
                    <Switch
                        // onChange={() => setIsToggled(!isToggled)}
                        // checked={isToggled}
                        onChange={handleSwitchChange}
                        checked={caption.caption_switch}
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
                    isToggled &&
                    <div className='flex active mb-3'>
                        <label htmlFor="insert-qabout" className="caption">Select color for Captions</label>
                        <input
                            id='insert-caption_color'
                            name="caption_color"
                            value={caption.caption_color}
                            type='color'
                            style={{ marginLeft: 3 }}
                            onChange={(e) => setCaption({ ...caption, [e.target.name]: e.target.value })}
                        // onChange={(e) => setCaption(e.target.value)}
                        />
                    </div>
                }

                <div className='loaderbtnscript'><button type="submit" className="btn btn-gradient" disabled={isError}>Continue</button>{loading ?
                    //  <div className="loader"></div>
                    <div>
                        <div class="flex items-center w-100 ">
                            <div class="progress-bar ml-4">
                                <div class="progress" style={{ width: `${progress}%` }}></div>
                            </div>
                            <h4 class="ml-4">{progress.toFixed(0)}%</h4>
                        </div>


                        <span class="text-gray ml-4">&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>


                    </div>
                    : ''}</div>


            </form>


            {/* )} */}

        </>
    );
};

export default InputForm;