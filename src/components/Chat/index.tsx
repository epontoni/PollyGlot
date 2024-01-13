import { useEffect, useRef, useState } from 'react'
import Flag from '../Flag'
import styles from './Chat.module.css'

export default function Chat({openai}) {
  const [text, setText] = useState("")
  const [lang, setLang] = useState("fr")
  const [msgs, setMsgs] = useState([])
  const chatRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const msg = {
        role: "user",
        content: `Traduce: ### ${text} ### al idioma ${lang === 'fr' ? 'francés' : lang === 'es' ? 'español' : 'japonés'}`
    }
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [msg],
        // max_tokens: 100, // Número máximo de tokens que se pueden usar para generar la respuesta, por defecto es infinito (inf).
    })

    const res = completion.choices[0].message.content
    setMsgs([...msgs, {role: 'client', msg: text}, {role: 'ia', msg: res}])
    setText("")
  }

  useEffect(() => {
    if(chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [msgs])

  return (
    <main className={styles.main}>
      <div className={styles.chat} ref={chatRef}>
        <div className={styles.message}> Select the language you me to translate into, type your tex and hit send!</div>
        <div className={`${styles.message} ${styles.msgVariant}`}> How are you?</div>
        <div className={styles.message}> Comment allez-vous?</div>
        {
          msgs?.map(
            (msg, i) => (
              <div key={i} className={`${styles.message} ${msg.role === 'client' ? styles.msgVariant : ''}`}>
                {msg.msg}
              </div>
            )
          )
        }
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input className={styles.input} type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <button type='submit' className={styles.button}></button>
      </form>
      <div className={styles.lang}>
        <div className={`${styles.btnFlag}  ${lang === 'fr' ? styles.selected : ''}`} onClick={() => setLang('fr')}><Flag flag="fr-flag.svg" /></div>
        <div className={`${styles.btnFlag}  ${lang === 'es' ? styles.selected : ''}`} onClick={() => setLang('es')}><Flag flag="es-flag.svg" /></div>
        <div className={`${styles.btnFlag}  ${lang === 'jp' ? styles.selected : ''}`} onClick={() => setLang('jp')}><Flag flag="jp-flag.svg" /></div>
      </div>
    </main>
  )
}

// className={lang === 'fr' ? styles.selected : ''} onClick={setLang('fr')}