import styles from './Flag.module.css';

export default function Flag({flag}) {
  return (
    <i style={{"margin": 0}}>
        <img src={`src/assets/${flag}`} alt="flag" className={styles.flag} />
    </i>
  )
}
