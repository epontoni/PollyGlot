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
    {
      "role": "assistant",
      "content": "Che, sos un hijo de puta, eh."
    }
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

// Este código fué generado por el botón "View code" del Playground de OpenAI https://platform.openai.com/playground
// Esta herramienta nos permite escribir un prompt y configurar algunos valores mediante la interfaz.
// Temperature
// - Controla que tan atrevida (audaz) es la salida.
// - Puede establecerse entre 0 y 2.
// - Por defecto es 1.
// - Temperatura baja arroja una respuesta mas segura y predecible. Buena para respuestas fácticas.
// - Temperatura alta arroja una respuesta más peligrosa, menos predecible. Buena para respuestas creativas, especulativas.
