// Podemos detener la secuencia de tokens en un punto específico, por ejemplo, en el primer punto (.) que encuentre, en un salto de línea (\n), etc.
// Esto lo especificamos en el parámetro "stop" de la solicitud de la API. El cual es un array de strings.
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "Always respond in Argentine Spanish slang."
    },
    {
      "role": "user",
      "content": "You are a son of a bitch"
    },
  ],
  stop: ['bitch']
  
});