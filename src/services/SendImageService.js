import axios from 'axios';

export const sendDataToWebService = async (data) => {
  const url = 'https://staging2.yatter.io/testexec/';

  try {
    const response = await axios.post(url, data);
    console.log('Data successfully sent to the web service:', response.data);
  } catch (error) {
    console.error('Failed to send data to the web service:', error);
  }
};

export const GetAudiofromWebService = async (data) => {
  //const url = 'https://demo.stellans.com/react/getaudio.php';
  const url = 'https://imagegen.stellans.com/api/getaudio.php';

  try {
    const response = await axios.post(url, data);
    console.log('res');
    console.log(response.data);
    return response.data;
    console.log('Data successfully sent to the web service:', response.data);
  } catch (error) {
    console.error('Failed to send data to the web service:', error);
  }
};

export const dwvideofromWebService = async (data) => {
  const url = 'https://imagegen.stellans.com/api/dw.php';

  try {
    const response = await axios.post(url, data);
    console.log('res');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to send data to the web service:', error);
  }
};

export const uploadImageGenerate = async (data, onUploadProgress) => {
  const url = 'https://imagegen.stellans.com/api/upload.php';

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onUploadProgress, // Use the callback for progress updates
    });
    // console.log('res');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to send data to the web service:', error);
  }
};




/*
// Example usage:
const data = {
  key: 'value',
  // Other data to send
};
sendDataToWebService(data);
*/