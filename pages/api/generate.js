import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  const language = req.body.language || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid question",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-curie-001",
      prompt: generatePrompt(animal,language),
      max_tokens: 100,
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(animal,language) {
  let capitalizedAnimal =animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  if(capitalizedAnimal.indexOf("?")<0 && capitalizedAnimal.indexOf("؟")<0 ){
 
    if(language=="arabic"){
      capitalizedAnimal+="؟";
    }
    else{ 
      capitalizedAnimal+='?';
    };
  }
  
  if(language=="arabic"){
    return `kid: مرحبًا أرنبي الذكي. Smart rabbit : مرحبا كيف استطيع مساعدتك؟ . Kid: ${capitalizedAnimal}.  Smart rabbit: `;

  }
  else if(language=="frensh"){
    return `kid: Bonjour mon lapin Intelligent. Smart rabbit :Bonjour, quelle est votre question gamin ?. Kid: ${capitalizedAnimal}.  Smart rabbit: `;

  }else{
    return `kid: Hello my Smart Rabbit. Smart rabbit : Hello, what i can help you with kid ?. Kid: ${capitalizedAnimal}.  Smart rabbit: `;

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

