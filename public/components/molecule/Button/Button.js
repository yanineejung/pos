import styles from "./button.module.css";
const Button = ({ onClick, text, type }) => {
  return <button className={styles[type]}>{text}</button>;
};

export default Button;
