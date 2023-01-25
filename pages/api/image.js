import  axios from "axios";
import NextCors from 'nextjs-cors';



  async function getResponse(url) {
    return new Promise((resolve, reject) => {
      let intervalId = setInterval(async () => {
        try {
          let response = await axios.get(url, {
            headers: {
              "Ocp-Apim-Subscription-Key": process.PICTURE_KEY,
            },
          });
          if (response.data.status == "succeeded") {
            clearInterval(intervalId);
            resolve(response);
          }
        } catch (err) {
          reject(err);
        }
      }, 1000);
    });
  }


export default async  function (req,res){
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });

    // console.log(req.body);
    try{
        
        res.status(200).json({subscriptionKey:process.env.PICTURE_KEY})
      }catch(Err){
        console.log(Err);
        res.status(400).json({error:Err})
      }



}