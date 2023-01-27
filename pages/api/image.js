import  axios from "axios";
import NextCors from 'nextjs-cors';





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