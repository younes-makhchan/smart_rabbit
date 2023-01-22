import NextCors from 'nextjs-cors';
import axios from "axios";


const subscriptionKey=process.env.SPEECH_KEY
const region=process.env.SPEECH_REGION
//res is our what we setup
export default async function (req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
 

 //verify everything we need for a good API call
  if (!subscriptionKey) {
    res.status(500).json({
      error: {
        message:
          "API key not configured",
      },
    });
    return;
  }
  if(!region){
    res.status(500).json({
        error: {
          message:
            "Region not configured",
        },
      });
      return;
  }

  try {
    //token
  //   const headers={
  //       headers:{
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       "Ocp-Apim-Subscription-Key":subscriptionKey

  //       }
  //   }
  //     const response=await axios.post(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,null,headers)
  //    console.log(response)
    
  //  // request  of token here
  //  res.status(200).json({ token: response.data })
   res.status(200).json({ region: region,subscriptionKey:subscriptionKey })
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }

}

