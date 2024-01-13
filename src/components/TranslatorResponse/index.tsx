import styles from './TranslatorResponse.module.css'

export default function TranslatorResponse({text, completion, startOver}) {
  return (
    <div className={styles.container}>
        <div>
            <h2 className={styles.label}>Original text 👇</h2>
            <div className={styles.textarea}>
                {text}
            </div>
        </div>
        <div>
            <h2 className={styles.label}>Your translation 👇</h2>
            <div className={styles.textarea}>
                {completion}
            </div>
        </div>
        <button className={styles.button} onClick={startOver}>Start Over</button>
    </div>
  )
}
