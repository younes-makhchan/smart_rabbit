import NextCors from "nextjs-cors";
import main from "../../database/connection"
import Answer from "../../database/schema"

export default async function storeAnswer(req,res){
    
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    
    main().catch(error=>console.log(error))
        
    const create=new Answer(req.body);
    create.save().then((r)=>{
            res.status(200).json(create);
    }).catch((e)=>console.log(e));
}