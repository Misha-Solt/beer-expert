import styles from './languageSwitcher.module.css'
const LanguageSwitcher = () => {
  return (
    <div className={styles.switcher}>
      <input
        className={styles.switchCheckbox}
        id={'switchNew'}
        type="checkbox"
      />
      <label className={styles.switchLabel} htmlFor={'switchNew'}>
        <span className={styles.switchButton} />
      </label>
    </div>
  )
}

export default LanguageSwitcher
