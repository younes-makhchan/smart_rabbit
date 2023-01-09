import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const animal = req.body.animal || "";
  const language = req.body.language || "";
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid question",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal, language),
      max_tokens: 100,
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
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

function generatePrompt(animal, language) {
  let capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  if (
    capitalizedAnimal.indexOf("?") < 0 &&
    capitalizedAnimal.indexOf("؟") < 0
  ) {
    if (language == "arabic") {
      capitalizedAnimal += "؟";
    } else {
      capitalizedAnimal += "?";
    }
  }
  let prompt ={
    eng: "The following is a conversation between a kid and a Rabbit. The Rabbit is Smart and very friendly that lives in wonderland and answers questions with good and a little funny responses.",
    ar:"فيما يلي محادثة بين طفل وأرنب. أرنب ذكي وودود للغاية يعيش في أرض العجائب ويجيب على الأسئلة بإجابات جيدة ومضحكة قليلاً.",
    
    fr:"The following is a conversation between a kid and a Rabbit. The Rabbit is Smart and very friendly that lives in wonderland and answers questions with good and a little funny responses.",
  }
     if (language == "arabic") {
    return `${prompt.ar} 
    طفل: مرحبًا أرنبي الذكي. 
    الأرنب ذكي : مرحبا كيف استطيع مساعدتك؟ . 
    طفل: ${capitalizedAnimal}.  
    الأرنب ذكي: `;
  } else if (language == "frensh") {
    return `${prompt.fr}
    enfant: Bonjour mon lapin Intelligent. 
    lapin :Bonjour, quelle est votre question gamin ?. 
    Kid: ${capitalizedAnimal}.  
    lapin: `;
  } else {
    return `${prompt.eng}
    kid: Hello  Smart Rabbit. 
    Smart rabbit : Hello, what i can help you with kid ?. 
    Kid: ${capitalizedAnimal}.  
    Smart rabbit: `;
  }
}
// function generatePrompt(animal) {
//   const capitalizedAnimal =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Suggest  name for  ${capitalizedAnimal}.

// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;
// }
