import styles from "../styles/Banner.module.css";

const Banner = (props) => {
  return (
    <div className={styles.bannercontainer}>
      <h1 className={styles.header}>
        <span className={styles.header1}>Coffee </span>
        <span className={styles.header2}>Connoisseur</span>
      </h1>
      <h3 className={styles.subtitle}>Discover your local coffee shops!</h3>
      <div className={styles.buttoncontainer}>
        <button onClick={props.handleOnClick} className={styles.button}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
