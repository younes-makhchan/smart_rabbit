import { Configuration, OpenAIApi } from "openai";
import NextCors from 'nextjs-cors';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });

 
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
      max_tokens: 200,
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
      eng: "The following is a conversation between a muslim kid and a muslim Smart Rabbit.The Rabbit is Smart,very friendly that lives in wonderland and answers questions with good and a little funny responses that are suitable for kids.The smart Rabbit tries to avoid the adult questions including Homosexuality.",
      kr: "다음은 이슬람 아이와 이슬람 스마트 토끼의 대화입니다. 이상한 나라에 사는 토끼는 영리하고 매우 친근하며 아이들에게 적합한 좋은 답변과 약간 재미있는 답변으로 질문에 대답합니다. 똑똑한 토끼는 어른을 피하려고 합니다. 동성애를 포함한 질문.",
      jp: "以下は、ムスリムの子供とムスリムの賢いうさぎの会話です。うさぎは頭が良く、不思議の国に住んでいるとてもフレンドリーで、子供に適した良い反応と少し面白い反応で質問に答えます。賢いうさぎは大人を避けようとします。 同性愛を含む質問。",
      ar:"فيما يلي محادثة بين طفل مسلم وأرنب مسلم ذكي. الأرنب  ذكي  وودود للغاية يعيش في أرض العجائب ويجيب على الأسئلة بإجابات جيدة ومضحكة قليلاً مناسبة للأطفال. يحاول الأرنب الذكي تجنب أسئلة البالغين بما في ذلك الشذوذ الجنسي. ",
      darija:"The following is a conversation between a mkid and a Smart Rabbit.they use morrocan darija in this conversation. The Rabbit is Smart,very friendly that lives in wonderland and answers questions with good and a little funny responses that are suitable for kids.The smart Rabbit tries to avoid the adult questions including Homosexuality ",
      fr:"Ce qui suit est une conversation entre un enfant musulman et un lapin intelligent musulman. Le lapin est intelligent, très sympathique qui vit au pays des merveilles et répond aux questions avec de bonnes réponses un peu drôles qui conviennent aux enfants. Le lapin intelligent essaie d'éviter questions d'adultes, y compris l'homosexualité.",
      ch:"以下是一个穆斯林小孩和一只穆斯林聪明的兔子之间的对话。兔子聪明，非常友好，生活在仙境里，回答问题时会有适合孩子和有趣的回应。聪明的兔子试图避开成人的问题，包括同性恋。",
    }
    console.log(language);
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
    } else if(language=="darija"){
      return `${prompt.eng}
      kid: salam . 
      Smart rabbit : salam, ach nahowa soal dyalk ?. 
      Kid: ${capitalizedAnimal}.  
      Smart rabbit: `;
    }else if(language=="chinese"){
    return `${prompt.ch}
    小朋友：你好，聪明的兔子。
    聪明的兔子：你好，有什么我可以帮助你的? 
    孩子: ${capitalizedAnimal}.  
    聪明的兔子(中国語で答える): `;
  } else if(language=="korean"){
    return `${prompt.eng}
    아이: 안녕하세요 똑똑한 토끼입니다.
    똑똑한 토끼: 안녕하세요, 제가 무엇을 도와드릴까요?.
    어린이:${capitalizedAnimal}.
    똑똑한 토끼(한국어로 답하다): `;
  }else if(language=="japanese"){
    return `${prompt.eng}
    子供:こんにちはスマート ラビット。
    賢いうさぎ : こんにちは、子供のことで何ができますか?
    子供：${capitalizedAnimal} 。
    賢いうさぎ(日本語で答える): ; `;
  }
  else{
    return `${prompt.eng}
    kid: Hello  Smart Rabbit. 
    Smart rabbit : Hello, what i can help you with kid ?. 
    Kid: ${capitalizedAnimal}.  
    Smart rabbit: `;
 
    
  }
}
