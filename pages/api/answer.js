import main from "../../database/connection"
import Answer from "../../database/schema"

export default function storeAnswer(req,res){
    main().catch(error=>console.log(error))
    console.log(req.body)
    const create=new Answer(req.body);
    create.save().then((r)=>{
            res.status(200).json(create);
    }).catch((e)=>console.log(e));
}