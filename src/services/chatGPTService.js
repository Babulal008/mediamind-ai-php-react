import axios from 'axios';
import Cookies from 'js-cookie';

//const [audioSrc, setAudioSrc] = useState('1');
const promises = [];
const resdata = [];
const genImage = [];

const resType = true

export const generateImaged3 = async (formData) => {

    try {
        const mergerequest = formData.question + " it's about " + formData.qabout + " Do not include any text inside the images";
        if (resType) {
            for (let i = 0; i < 3; i++) {
                promises.push(
                    axios.post(
                        apiUrl,
                        {
                            model: 'dall-e-2',
                            prompt: mergerequest,
                            size: "1024x1024",
                            n: 1,
                            p:i

                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${apiKey}`
                            },
                        }
                    )
                );
            } // for end

        } else {
            for (let i = 0; i < 3; i++) {
                promises.push(
                    /** rr :: start **/
                    {
                        "data": {
                            "created": 1707660487,
                            "data": [
                                {
                                    "url": "https://staging.yatter.io/webs/mp3s/genrate_images/sampleyatter.png"
                                }
                            ]
                        }
                    }
                   
                );
            }
        }


        const responses = await Promise.all(promises);
    

        for (let i = 0; i < responses.length; i++) {

            resdata.push(responses[i].data.data[0]);
        }

        Cookies.set('scripttxt', formData.question);
        return resdata;

    } catch (error) {
        console.error('Error generating image:', error);
        return null;
    }

};

export const generateImage = async (formData) => {
    try {
        const mergerequest = formData.question + " it's about " + formData.qabout + " Do not include any text inside the images";
        if (resType) {
            const response = await axios.post(
                apiUrl,
                {
                    model: 'dall-e-2',
                    prompt: mergerequest,
                    size: "1024x1024",
                    n: 1

                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },

                }
            );
            if (response?.data) {

                Cookies.set('scripttxt', formData.question);
                return response?.data?.data
            }
        } else {
            // const response = '';
            genImage.push(

                {
                    // "data": {
                    "created": 1707660487,
                    "data": [
                        {
                            "url": "https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
                            // "url": "https://yatter.ai/wp-content/uploads/2024/02/Official-Yatter-Logo.png"
                        }
                    ]
                }
                // }

            );
            const respons = await Promise.all(genImage);
            console.log('eeeeeee', respons[0]?.data[0]);
            // for (let i = 0; i < response.length; i++) {

            resdata.push(respons[0]?.data[0]);

            return resdata;
            
        }
        console.log('res  are ', resdata);
    } catch (error) {
        console.error('Error generating image:', error);
    };
    return null;
}


export const generateVoice = async (formData) => {
    // console.log(formData.question);

    try {
        const response = await axios.post(
            apivURL,
            {
                model: 'tts-1',
                //  prompt: formData.question,
                input: "Do it now and again",
                voice: "onyx",
                speed: 1

            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
            }
        );        if (response?.data) {

            return response?.data;
        }


    } catch (error) {
        console.error('Error generating image:', error);
        return null;
    }
};
