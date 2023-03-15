export default function saveHistory(question, answer, type) {
    const newAnswer = {
      answer: answer,
      type: type,
      question: question,
      date: new Date(),
    };
  
    if (localStorage.getItem("answers") == null) {
      localStorage.setItem("answers", JSON.stringify([newAnswer]));
    } else {
      let answers = JSON.parse(localStorage.getItem("answers"));
      
      localStorage.setItem("answers", JSON.stringify([...answers, newAnswer]));
    }
  }
  