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
  console.log(req.body)
  const description = req.body.description || "";
  const language = req.body.language || "";
  if (description.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid question",
      },
    });
    return;
  }

  try {
    let result="",type="";
  
      if(description.indexOf("imag")>=0||description.indexOf("genera")>=0||description.indexOf("pictu")>=0){        
        type="image";
        result =await generateImage(description);
      }else{
        type="text";
       result= await generatePrompt(description,language);
      }
    //if image we will give  url , if  text we will give a text reply
    res.status(200).json({ result,type });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.log("Error:")
      console.log(error.response.status, error.response.data);
      res.status(404).json(error.response.data);
    } else {
      console.log(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function filtersContext(description, language) {
  
  let capitalizedDescription =
  description[0].toUpperCase() + description.slice(1).toLowerCase();
  if (
    capitalizedDescription.indexOf("?") < 0 &&
    capitalizedDescription.indexOf("؟") < 0
    ) {
      if (language == "arabic") {
        capitalizedDescription += "؟";
      } else {
        capitalizedDescription += "?";
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

    switch(language){
      case "arabic": 
        return `${prompt.ar} 
        طفل: مرحبًا أرنبي الذكي. 
        الأرنب ذكي : مرحبا كيف استطيع مساعدتك؟ . 
        طفل: ${capitalizedDescription}.  
        الأرنب ذكي: `

       case "frensh":

        return `${prompt.fr}
        enfant: Bonjour mon lapin Intelligent. 
        lapin :Bonjour, quelle est votre question gamin ?. 
        Kid: ${capitalizedDescription}.  
        lapin: `;
      case "darija":

        return `${prompt.eng}
        kid: salam . 
        Smart rabbit : salam, ach nahowa soal dyalk ?. 
        Kid: ${capitalizedDescription}.  
        Smart rabbit: `;
      case "chinese":
      return `${prompt.ch}
      小朋友：你好，聪明的兔子。
      聪明的兔子：你好，有什么我可以帮助你的? 
      孩子: ${capitalizedDescription}.  
      聪明的兔子(中国語で答える): `;
   case "korean":
      return `${prompt.eng}
      아이: 안녕하세요 똑똑한 토끼입니다.
      똑똑한 토끼: 안녕하세요, 제가 무엇을 도와드릴까요?.
      어린이:${capitalizedDescription}.
      똑똑한 토끼(한국어로 답하다): `;
   case "japanese":
      return `${prompt.eng}
      子供:こんにちはスマート ラビット。
      賢いうさぎ : こんにちは、子供のことで何ができますか?
      子供：${capitalizedDescription} 。
      賢いうさぎ(日本語で答える): ; `;
    default:
      return `${prompt.eng}
      kid: Hello  Smart Rabbit. 
      Smart rabbit : Hello, what i can help you with kid ?. 
      Kid: ${capitalizedDescription}.  
      Smart rabbit: `;
   
      
    
    }

  
}

async function generatePrompt(prompt,language){
  console.log( filtersContext(prompt,language));
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: filtersContext(prompt,language),
    max_tokens: 200,
    temperature: 0.6,
  });

  console.log("generate")
  return completion.data.choices[0].text;
} 

async function enhanceDescription(description){

  console.log("enhancing!!");
  const enhanceDescription= await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "a user provided this description "+description+". I want  you to  give more details about this description (maximum 30 words ) with keeping the meaning to help DALL-E give better accurate image.",
    max_tokens: 100,
    temperature: 0.6,
  });
  console.log("enhanced text :"+enhanceDescription.data.choices[0].text)
  return enhanceDescription.data.choices[0].text;
}


async function generateImage(description){

  if(description.split(" ").length<10){
    console.log("enhancing picture");
    description= await enhanceDescription(description);
  }
  const completion = await openai.createImage({
    prompt: description,
    n: 1,
    size: "256x256",
  });
 
  return completion.data.data[0].url;
}
