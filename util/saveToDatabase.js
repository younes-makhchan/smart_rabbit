import axios from "axios";

 export default function saveToDatabase(question, answer, type, fetchUrl) {
    let response =  axios.post(
      fetchUrl + "/api/answer",
      { question, answer, type },
      { headers: { "Content-Type": "application/json" } }
    );
    return response;
  }