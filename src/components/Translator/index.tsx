import styles from './Translator.module.css'
import Flag from '../Flag'
import { useState } from 'react'
import TranslatorResponse from '../TranslatorResponse'

export default function Translator({openai}) {
    const [text, setText] = useState("")
    const [lang, setLang] = useState("fr")
    const [response, setResponse] = useState(false)
    const [oaiResponse, setOaiResponse] = useState("")
    
    const items: { value: string, label: string }[] = [
        { value: 'fr', label: 'French' },
        { value: 'es', label: 'Spanish' },
        { value: 'jp', label: 'Japanese' }
    ]

    

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
        setOaiResponse(completion.choices[0].message.content)
        setResponse(true)
    }

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
        console.log(text)
    }

    const startOver = () => {
        setOaiResponse("")
        setText("")
        setResponse(false)
    }

  return (
    <main className={styles.main} onSubmit={handleSubmit}>
        { response? (<TranslatorResponse text={text} completion={oaiResponse} startOver={startOver}/>) : (<>
        <form action="" method="post" className={styles.form}>
            <label className={styles.label} htmlFor="text">Text to translate 👇</label>
            <textarea className={styles.textarea} id="text" name="text" placeholder="How are you?" value={text} onChange={handleTextAreaChange}></textarea>
            <label className={styles.label} htmlFor="lang">Select lenguage 👇</label>
            <div className={styles.langs}>

                {
                    items.map(
                        item => (<div key={item.value}>
                            <input
                                name="lang"
                                type="radio"
                                value={item.value}
                                id={item.value}
                                checked={lang === item.value}
                                onChange={e => setLang(e.target.value)}
                            /> <label htmlFor={item.value} className={styles.label}>{item.label} </label>
                               <Flag flag={`${item.value}-flag.svg`} className={styles.flag} />
                        </div>)
                    )
                }
            </div>
            <button className={styles.button} type="submit">Translate</button>
        </form>
        </>)}
    </main>
  )
}