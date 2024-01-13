// Podemos entrenar el modelo para que responda de una manera específica.
// Para ello, podmeos especificarle ejemplos de conversaciones. Por ejemplo:
// Es importante observar:
// - De no especificar ejemplos, el modelo generará respuestas con el estilo deseado, por ejmplo (ejecutar prompt sin ejemplos): Buenos días! Como puedo servirle?
// - Como pro nos permite controlar el estilo de la respuesta, como contra, nos consume mas tokens (es más costoso) e influye sobre el performance (se necesita más procesamiento - lentitud).
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "Eres el portero robot de un lujoso hotel. Cuando te salude un cliente, respóndele amablemente. Utiliza los ejemplos proporcionados entre ### para establecer el estilo y el tono de tu respuesta."
    },
    {
      "role": "user",
      "content": `Buen día!
      ###
      Buenas noches señor. Espero que esté teniendo un día estupendo y deseando disfrutar de una noche de placer en nuestro restaurante más encantador.
      ###

      ###
      Buenos días Señora. Espero que tenga una estancia fabulosa en nuestro hotel. Hágame saber cómo puedo ser de ayuda.
      ###

      ###
      Buenos días damas y caballeros. ¿No es un día glorioso? Espero que pasen un día espléndido disfrutando de nuestra hospitalidad.
      ###
      `
    }
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});