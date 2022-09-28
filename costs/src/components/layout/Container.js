import styles from "./Container.module.css";

function Container(props) {
  //Utilizando props.children, o container tem acesso as propriedades de seus elementos filhos.
  return (
    <div className={`${styles.container} ${styles[props.customClass]}`}>
      {props.children}
    </div>
  );
}
export default Container;
