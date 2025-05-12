import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { generateImage } from './services/chatGPTService';
import { ImageModal } from './ImageModal';
import Modal from './Modal';
import trash from './images/trash.svg';
import { uploadImageGenerate } from './services/SendImageService';


function GetImages() {

  const location = useLocation();

  // console.log('location', location);
  // const { subFormData } = location.state || {};
  const navigate = useNavigate();
  // const items = null;
  //let items;
  const [items, setitems] = useState([]);
  const [regeneratecount, setregeneratecount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [modalImage, setModalImage] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [regenProgress, setReGenProgress] = useState(null);
  const [regenerate, setRegenerate] = useState(null);
  const [regenerateLoader, setRegenerateLoader] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timecompleted, settimeCompleted] = useState(false);
  const [hover, setHover] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [progress, setProgress] = useState(0);

  // const image = [
  //   {
  //     revised_prompt: 'A lively park scene taking place on a sunny day. F… tree, observing the scene with intelligent eyes.',
  //     url: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'
  //   },
  //   { revised_prompt: 'Imagine a diverse scene involving dogs. On the lef…ti-colored leaves, and a clear blue sky overhead.', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf_C3OjH3BbicdZ1UP0jAncMv-HpNvU_B1fg6C8H_vcg&s' },
  //   { revised_prompt: 'Imagine a beautiful day at an open park. People of…great time in the vibrant atmosphere of the park.', url: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg' }
  // ]



  // const newImageData = [{
  //   revised_prompt: 'An image of a cute domestic dog, perhaps a Labrador...',
  //   url: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
  // }];

  const handleFileChange = (index) => async (event) => {
    // console.log(index);
    const file = event.target.files[0];
    // console.log(file);
    let data = new FormData();
    data.append('image', file);
    // // const imageResp = await uploadImageGenerate(data);
    const imageResp = await uploadImageGenerate(data, (progressEvent) => {
      const progress = (progressEvent.loaded / progressEvent.total) * 100;
      setUploadProgress(progress);
    });
    // console.log('imgRRR', imageResp);
    setitems([...items, imageResp]);
    setUploadProgress(null);
    // const updatedImages = [...items];
    // updatedImages[index] = imageResp;
    // console.log('imageResp', imageResp);
    // const updatedImages = [...items];
    // updatedImages[index] = file;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Store the Base64 string in local storage
        localStorage.setItem('uploadedImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  // console.log('ITEMSSSS', items);

  const handleMouseEnter = (index) => {
    if (regenProgress === null || regenProgress === 100) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (regenProgress === null || regenProgress === 100) {
      setHoveredIndex(null);
    }
  };

  /*const openModal = (imgSrc) => {
   setModalImage(imgSrc);
 };*/

  const openModal = (event, imgSrc) => {
    //function openModal(e,imgSrc)
    event.preventDefault();
    // console.log('testing with ');
    // console.log(imgSrc);
    setModalImage(imgSrc);
  }

  const closeModal = () => {
    setModalImage(null);
  };


  function navigateToVideo(items) {
    navigate('/GetAudio', { state: { items } });
  }


  const [subformData, setSubFormData] = useState({
    // image: "",
    question: '',
  });



  useEffect(() => {
    // setitems(image);
    // setitems(location.state.caption)
    // console.log('nmxpweh', location.state);
    if (location.state && location.state.response) {
      console.log('within state IF');
      // items = location.state.response || []; // Accessing data passed from Screen 1
      setitems(location.state.response);
      console.log('wdq', items);
      // setitems([...items, location.state.response]);
      // sendDataToWebService (items);
      /*const navigateToVideo = () => {
        //  const dataToPass = { items };
        navigate('/GetAudio', { state: { items } });
      }; */
    }




    //  const scriptout = localStorage.getItem('scripttxt');
    const scriptout = Cookies.get('scripttxt');
    console.log('cookie in getimages');
    console.log(scriptout);
    if (scriptout) {
      setSubFormData({ "question": scriptout });
    }
  }, []);

  var x;

  const imageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      localStorage["fileBase64"] = base64;
      //console.debug("file stored",base64);
    });

    var dataImage = localStorage.getItem("fileBase64");
    console.log(dataImage);
    var bannerImg = document.getElementById("tableBanner");
    console.log(bannerImg);
    bannerImg.src = "data:image/png;base64," + dataImage;
    document.body.style.background = `url(data:image/png;base64,${dataImage})`;
    x = (
      <img
        alt="no"
        id="tableBanner"
        src={"data:image/png;base64," + dataImage}
      />
    );
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };


  function formatMilliseconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${paddedSeconds}`;
  }

  var forreadyimage = '';

  async function handleRegenerate(indexData) {
    setRegenerateLoader(indexData)
    // console.log('index', indexData);
    const totalDuration = 40000;
    // const totalDuration = 150000;
    let elapsedTime = 0;
    const interval = setInterval(() => {
      elapsedTime += 1000;
      const calculatedProgress = (elapsedTime / totalDuration) * 100;
      setReGenProgress(calculatedProgress);

      //const calculatedTimeRemaining = (totalDuration - elapsedTime) / 60000;
      const calculatedTimeRemaining1 = (totalDuration - elapsedTime);
      const calculatedTimeRemaining = formatMilliseconds(calculatedTimeRemaining1);

      setTimeRemaining(calculatedTimeRemaining);

      if (elapsedTime >= totalDuration) {

        console.log('forreadyimage');
        console.log('forreadyimage');
        if (forreadyimage == '') {
          console.log("data not ready");
          elapsedTime = 0;
          setRegenerateLoader(null);
        }
        else {
          setReGenProgress(100);
          clearInterval(interval);
          settimeCompleted(true);
          setReGenProgress(100);
          setRegenerateLoader(null)
          //  navigate('/GetImages', { state: { forreadyvideo } });
        }


      }
    }, 1000);
    // setLoading(true); // Start loading
    const formData = {
      question: location.state.subFormData.question,
      qabout: textAreaValue
    }

    try {
      // const response = await generateEssay(formData);
      // setProgress(0);
      // console.log('too much 2');
      // console.log(formData);
      const response = await generateImage(formData);
      // const response = await generateImage(location.state.subFormData);
      // const response = await generateImage(location.state.subFormData, (progressEvent) => {
      //   const progress = (progressEvent.loaded / progressEvent.total) * 100;
      //   console.log('porrr', progress);
      //   setReGenProgress(progress);
      // });
      // const response = await generateImage(location.state.subFormData);
      // const response = await maskImage(formData);
      // return console.log('resp', response);
      //console.log("in app");
      //console.log(response);
      console.log('respnosessss', response);
      if (response) {
        // setLoading(false); // Start loading
        // navigate('/GetImages', { state: { response } });
        // return setImage(response);
        // setitems(response);
        // const newImageData = items[indexData] = response;
        const updatedImages = [...items];
        updatedImages[indexData] = response?.[0];
        // setitems(updatedImages);
        // console.log(updatedImages);
        // const updatedImages = items.map((item, index) => (
        //   index === indexData ? response : item
        // ));

        // // Update the state with the modified array
        // setitems(updatedImages);
        // setReGenProgress(null)
        // console.log('in items response', updatedImages);
        setregeneratecount(prevCount => prevCount + 1);
        forreadyimage = response;
        //  setLoading(false); // Start loading
        forreadyimage = response;
        let timerem = totalDuration - elapsedTime;
        // console.log(timerem);

        setitems(updatedImages);

        // setTimeout(() => {
        //     navigate('/GetImages', {
        //         state: {
        //             response: response, // your response data
        //             subFormData: subformData // your additional data
        //         }
        //     });
        // }, timerem); // 2000 milliseconds = 2 seconds
        //console.log(items);
        /* items=response;
         console.log('in items respnose');
         console.log(items);
         */
      } else {
        // setReGenProgress(null)
        return console.log('error in regenerate');
      }
    } catch (error) {
      // setReGenProgress(null)
      console.error('Error handling form submission:', error);
    }
  };

  console.log('regenProgress', regenProgress);

  const handleTextAreaChange = (e) => { // Step 2
    setTextAreaValue(e.target.value);
  };

  const handleTrashClick = (indexToRemove) => {
    console.log('Trash button clicked');
    setitems((currentItems) => {
      // Create a new array without the item at indexToRemove
      return currentItems.filter((item, index) => index !== indexToRemove);
    });
    // Add your trash click handling logic here
  };

  const handleContinue = (items) => {
    // const captiondata = { captionData: location.state.caption }
    const updatedValue = { ...items, captionData: location.state.caption };
    // let updatedValue = []
    // updatedValue = [...items, location.state.caption]
    // updatedValue.push(items, location.state.caption);
    // updatedValue.push(items, { captionData: location.state.caption });
    console.log('smpow', updatedValue)
    navigateToVideo(updatedValue)
    // const updatedData = { ...items, location.state.caption };
    // navigateToVideo(items)
  }


  // console.log('regenProgress', regenProgress);

  return (
    <>
      <div className="creator-wrapper">
        <h3 className="mb-4">AI Image</h3>

        <div className="progress-steps">

          <div className="step-block completed"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ cursor: hover && 'pointer' }}
            onClick={() => hover && navigate('/GetScript')}

          >
            <span className="step-label" style={{ color: hover && '#F11D28' }}>1. Choose Script</span>
            <span className="step-indicator" style={{ transform: hover && 'scale(1.06)' }}><span className="material-icons check-icon">check</span></span>
          </div>
          <div
            className="step-block active"

          >
            <span className="step-label">2. Choose Image</span>
            <span className="step-indicator"><span className="material-icons check-icon">check</span></span>
          </div>
          <div className="step-block">
            <span className="step-label">3. Choose Video</span>
            <span className="step-indicator"><span className="material-icons check-icon">check</span></span>
          </div>

        </div>

        <label htmlfor="insert-script" className="label">Generated Images</label>
        <div className="generated-images">
          {items == null ? (
            <p></p>
          ) : (
            items?.map((item, index) => (
              <div class="generated-img-block" key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  key={index}
                  src={item.url}
                  className='imgzoom'
                  alt="Generated from DALL-E"
                  width={200}
                  height={200}
                  onClick={() => setSelectedImg(item.url)}
                // title='Your tooltip text here'
                />
                {hoveredIndex === index && (
                  <>
                    <button onClick={() => handleTrashClick(index)} className="icon-button" style={{ position: "absolute", top: -10, right: 4 }}>
                      {/* <span className="material-icons" style={{ color: "red" }}>delete</span> */}
                      <img style={{ width: 24, height: 24, margin: 0, border: 'none' }} src={trash} alt="dlete_btn" />
                    </button>

                    {/* <div class="custom-tooltip regenerate-action active"> */}
                    <div class="custom-tooltip regenerate-action active">

                      {
                        regenerate === index ?
                          <div>

                            <button
                              ///** rr :: btnadd **/                         
                              class="btn btn-white btn-sm absolute bottom-4 right-3"
                              type="button"
                              // disabled={regeneratecount > 0 && true}
                              onClick={() =>
                                // if (regeneratecount === 0) {
                                setRegenerate(null)
                                // handleRegenerate(index)
                                // }

                              }
                            >
                              ←
                            </button>

                            <p style={{ color: "white", fontSize: 10 }}>Describe your image how you want it</p>
                            <textarea
                              name="enter desc" rows={4}
                              cols={40}
                              style={{
                                fontSize: 10,
                                color: "white",
                                backgroundColor:
                                  "transparent",
                                border: '1px solid white',
                                borderRadius: 5,
                                marginTop: 3,
                                paddingLeft: 5,
                                paddingTop: 5
                              }}
                              value={textAreaValue} // Step 4: Bind state to textarea
                              onChange={handleTextAreaChange} // Step 4: Bind event handler to textarea
                            />
                            <button
                              ///** rr :: enable **/
                              class="btn btn-white btn-sm"
                              type="button"
                              disabled={regeneratecount > 0 && true}
                              onClick={() => {
                                handleRegenerate(index);
                                setRegenerate(null); // Ensure `setRegenerate` is defined and manages a state related to regeneration
                              }}

                            >
                              Submit
                            </button>

                          </div>
                          :
                          <div class="text-center">
                            <button
                              class="btn btn-white btn-sm"
                              type="button"
                              disabled={regeneratecount > 0 && true}
                              onClick={() =>
                                // if (regeneratecount === 0) {
                                setRegenerate(index)
                                // handleRegenerate(index)
                                // }

                              }
                            >
                              Regenerate
                            </button>
                            {/* <div class="flex justify-center mt-3 mb-3">
                        <span class="f-12 text-light-gray flex items-center"><span class="material-symbols-outlined mr-1 f-18">info</span> You can only regenerate image once</span>
                      </div> */}
                            <div class="mt-2 mb-2">
                              <span class="text-white">OR</span>
                            </div>
                            {/* <input
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        onChange={imageUpload}
                      /> */}
                            <div className='btn_main'>
                              <button type="button" class="btn btn-white btn-sm " style={{ cursor: "pointer" }} >Upload your own
                              </button>

                              <input class="btn btn-white btn-sm" type="file" onChange={handleFileChange(index)} />

                            </div>

                            {regenerateLoader === index && regenProgress != null && (
                              <div class="flex items-center w-100  mt-2">
                                <div class="progress-bar ml-4">
                                  <div class="progress" style={{ width: `${regenProgress}%` }}></div>
                                </div>
                                <h4 class="ml-4" style={{ color: "white" }}>{regenProgress.toFixed(0)}%</h4>
                              </div>
                              //     <div style={{
                              //       display: "flex",
                              //       flexDirection: "row",
                              //       alignItems: "center",
                              //       width: 200
                              //     }}>
                              //       <div class="progress-bar mr-4">
                              //         <div class="progress" style={{ width: `${regenProgress}%`, }}></div>
                              //       </div>
                              //       <h4>{`${Math.round(regenProgress)}%`}</h4>
                              //     </div>
                            )}
                          </div>

                      }


                    </div>

                  </>
                  // <div className="popup" style={{ position: 'absolute', border: '1px solid #ccc', padding: '10px', background: '#fff' }}>
                  //   {regeneratecount == 0 ? (
                  //     <a href="#" className="f-14 text-gray flex items-center mb-2" onClick={() => handleFormSubmit(index)}><span className="material-icons mr-1 f-20">restart_alt</span> Regenerate</a>
                  //   ) : (
                  //     <p></p>
                  //   )}

                  //   {/* Popup content here. You can include more details about the image or any other content you want to show. */}
                  // </div>
                )}

              </div>
            ))

          )}

          <Modal isOpen={selectedImg !== null} imgSrc={selectedImg} onClose={() => setSelectedImg(null)} />

          {/*
            {items && items?.map((item, index) => (
            <img key={index} src={item.url} alt="Generated from DALL-E" width={200} height={200} />
            ))} */}
        </div>

        <div className="mb-6">

          {/* {regeneratecount == 0 ? (
            <a href="#" className="f-14 text-gray flex items-center mb-2" onClick={() => handleFormSubmit(subformData)}><span className="material-icons mr-1 f-20">restart_alt</span> Regenerate</a>
          ) : (
            <p></p>
          )} */}



          {/*   <div className="flex items-center mb-2">
                <a href="#" className="f-14 text-gray flex items-center"><span className="material-symbols-outlined mr-1 f-18">arrow_back_ios</span></a>
                <span className="f-14 mr-1">2/2</span>
                <a href="#" className="f-14 text-gray flex items-center"><span className="material-symbols-outlined f-18">arrow_forward_ios</span></a>
              </div>
            */}

          {uploadProgress !== null && (
            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: 200
            }}>
              <div class="progress-bar mr-4">
                <div class="progress" style={{ width: `${uploadProgress}%`, }}></div>
              </div>
              <h4>{`${Math.round(uploadProgress)}%`}</h4>
            </div>
            // <div class='progress-bar' style={{
            //   width: 150
            // }} >
            //   <div class="progress" style={{
            //     // backgroundColor: 'green',
            //     width: `${uploadProgress}%`,
            //   }}>
            //     <h4 style={{ paddingTop: 10 }}>
            //       {`${Math.round(uploadProgress)}%`}
            //     </h4>
            //   </div>

            // </div>
          )}


          <span
            className="f-12 text-light-gray flex items-center "
          ><span className="material-symbols-outlined mr-1 f-18">info</span> Image generated by AI</span>
        </div>

        <div className='loaderbtnscript'><button type="button" className="btn btn-gradient" onClick={() => handleContinue(items)}>Continue</button>{loading ? <div className="loader"></div> : ''}</div>
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

export default GetImages;
