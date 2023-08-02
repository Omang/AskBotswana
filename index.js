const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require ("dotenv");
dotenv.config();
//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
const configuration = new Configuration({
    organization: process.env.ORGANISATION,
    apiKey: process.env.OPENAI_KEY,
});

const app = express();
const PORT = 3001;


app.use(body_parser.json());

app.use(cors({
 
 credentials: true,
 origin: process.env.URL_CLIENT

}))
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();




app.post('/', async(req, res)=>{
    const {datax} = req.body;

const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{"role": "system",
             "content": "You are a Botswana helpful assistant. Answer questions with botswana information. if answer is not available, just say im sorry i only have information about Botswana"},
              {role: "user", content: `${datax}`}],
   });
	
     
     
 //console.log(datax);
res.json({
	message: completion.data.choices[0].message
});

})

app.get('/models', async(req, res)=>{

const response = await openai.listEngines();

res.json({
    models: response.data
})

})

app.listen(PORT, ()=>{
	console.log(`listerning at: PORT: ${PORT}`);
})









