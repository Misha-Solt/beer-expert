import React from 'react'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <section className={styles.waveSection}>
        <div className={styles.waves}>
          <div className={styles.wave} id={styles.wave1}></div>
          <div className={styles.wave} id={styles.wave2}></div>
          <div className={styles.wave} id={styles.wave3}></div>
          <div className={styles.wave} id={styles.wave4}></div>
          <div className={styles.wave} id={styles.wave5}></div>
        </div>
      </section>
      <section className={styles.textSection}>
          <div className={styles.textElement}>Datenschutz</div>
          <div className={styles.textElement}>Impressum</div>
          <div className={styles.textElement}>Copyright</div>
      </section>
    </div>
  )
}

export default Footer
