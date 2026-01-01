import styles from "../styles/_moveImage.module.scss";

interface Props {
  src: string;
}

export default function MoveImage({ src }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.pos} />
      <div className={styles.pos} />
      <div className={styles.pos} />
      <div className={styles.pos} />
      <div className={styles.pos} />
      <div className={styles.pos} />

      <img className={styles.image} src={src} />
    </div>
  );
}
