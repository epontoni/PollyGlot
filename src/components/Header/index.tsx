 import styles from './Header.module.css'
 import parrot from '../../assets/parrot.svg'

 export default function Header() {
   return (
     <header className={styles.header}>
       <div>
        <img src={parrot} alt="Parrot - PollyGlot App: Perfect Translation Every Time" />
       </div>
       <div>
         <h1 className={styles.h1}>PollyGlot</h1>
         <h2 className={styles.h2}>Perfect Translation Every Time</h2>
       </div>
     </header>
   );
 }
