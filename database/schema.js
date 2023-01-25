import mongoose from "mongoose";

const answerSchema=new mongoose.Schema({
    question:String,
    answer:String,
});

//creating collection
const  Answer=mongoose.model('answers',answerSchema);
export default Answer ;