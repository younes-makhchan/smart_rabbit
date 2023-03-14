import NextCors from "nextjs-cors";
import connection from "../../database/connection"
import Answer from "../../database/schema"
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */
export default async function storeAnswer(req,res){
    try{

        await NextCors(req, res, {
            // Options
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        
        await connection();
        console.log("Database Connected");
        const create=new Answer(req.body);
        create.save();
        res.status(200).json(create);
        res.end();
        
        
    }catch(e){
        console.log(e);res.status(403).json()
    }
}