import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return <p className={styles.error}>{message}</p>;
};

export default ErrorMessage;
