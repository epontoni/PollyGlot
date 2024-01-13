import { useEffect, useState } from 'react'
import Header from './components/Header'
import Translator from './components/Translator'
import Footer from './components/Footer'
import Chat from './components/Chat'
import styles from './App.module.css'

import OpenAI from "openai";
const OPENAI_API_KEY = "YOUR_API_KEY";

function App() {
  const [app, setApp] = useState("translator");
  const [openai, setOpenai] = useState(null);

  useEffect(() => {
    const OpenAiInit = async () => {
      try {
        const oai = new OpenAI({
          apiKey: OPENAI_API_KEY,
          dangerouslyAllowBrowser: true,
        });

        const messages = [
          {
            role: "system", // La propiedad "role" ayuda al modelo a entender el contexto de la conversación y a generar respuestas coherentes y relevantes.
            content: `Eres un traductor políglota experto en francés, español y japones.
                    Quiero que detectes el idioma del texto que pasaré encerrado entre caracteres ### y lo traduzcas al lenguaje que te indicaré en cada mensaje.
                    `,
          },
        ];

        const completion = await oai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: messages,
          max_tokens: 50,
        });

        console.log("Respuesta: ", completion.choices[0].message.content);

        setOpenai(oai);
      } catch (error) {
        console.error(
          `Something went wrong while making the call to OpenAI. ${error}`
        );
      }
    };

    OpenAiInit();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.tabContainer}>
        <button className={styles.button} onClick={() => setApp("translator")}>
          Translator
        </button>
        <button className={styles.button} onClick={() => setApp("chat")}>
          Chat
        </button>
      </div>
      {app === "translator" ? <Translator openai={openai} /> : <Chat openai={openai} />}
      <Footer />
    </>
  );
}

export default App;
