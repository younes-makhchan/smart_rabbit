import {Schema,model,models} from "mongoose";

const answerSchema=new Schema({
    question:String,
    answer:String,
    type:{type:String,required:false},
});

//creating collection
const  Answer=models.answers||model('answers',answerSchema);
export default Answer ;