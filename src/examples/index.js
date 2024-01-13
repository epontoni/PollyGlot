import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

messages = [
    {
        role: "system", // La propiedad "role" ayuda al modelo a entender el contexto de la conversación y a generar respuestas coherentes y relevantes.
        content: "Eres un físico computacional y divulgador científico. Responde en no más de 100 palabras con la mayor claridad y precisión que puedas."
    },
    {
        role: "user",
        content: "¿Qué es la computación cuántica?"
    },
]

async function main() {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        // max_tokens: 100, // Número máximo de tokens que se pueden usar para generar la respuesta, por defecto es infinito (inf).
    })

    console.log('Respuesta: ', completion.choices[0].message.content)
    console.log('Respuesta: ', completion)
    
    // Al usar la API de OpenAI, uno paga por los tokens que se usan. Por lo tanto, es importante tener en cuenta el número de tokens que se usan para cada solicitud. Para calcular el número de tokens que se usan (que depende del modelo usado), se puede usar la siguiente herramienta:
    // https://platform.openai.com/tokenizer
    // Dentro de la respuesta (completion), se puede encontrar el número de tokens usados:
    // usage: {
    //     prompt_tokens: 3, // Número de tokens que se usan para el prompt
    //     completion_tokens: 3, // Número de tokens que se usan para la respuesta
    //     total_tokens: 6, // Número total de token
    // }
    // Puedo especificar el número de tokens que quiero usar para la respuesta con la propiedad "max_tokens" en la solicitud de la API. Si el valor es menor que el número de tokens usados para la respuesta, la respuesta se cortará (finish_reason: "length").
    // Observaciones:
    // - max_tokens no nos permite controlar que tan concisa es la respuesta, sino que nos permite controlar el número de tokens que se usan para generar la respuesta.
    // - El número de tokens usados para la respuesta depende del modelo usado.
    // - En caso de configurar el valor de max_tokens, asegurarse de que sea suficiente para generar una respuesta completa, de lo contrario la misma quedará inconclusa (finish_reason: "length").
    // - El número de tokens usados para la respuesta depende del prompt. Por lo que para controlar la longitud de la respuesta, es importante controlar el prompt (el buen diseño del prompt es esencial).
}

main()