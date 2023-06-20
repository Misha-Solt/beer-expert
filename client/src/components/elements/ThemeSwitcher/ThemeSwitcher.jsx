import styles from './themeSwitcher.module.css'
const ThemeSwitcher = () => {
  return (
    <div className={styles.switcher}>
      <input
        className={styles.switchCheckbox}
        id={'switchTheme'}
        type="checkbox"
      />
      <label className={styles.switchLabel} htmlFor={'switchTheme'}>
        <span className={styles.switchButton} />
      </label>
    </div>
  )
}

export default ThemeSwitcher
