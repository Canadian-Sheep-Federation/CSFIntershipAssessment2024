import styles from "./NumResults.module.css";

const NumResults = ({ restaurants }) => {
  return (
    <p className={styles.numResults}>
      Found <strong>{restaurants?.length}</strong> results
    </p>
  );
};

export default NumResults;
