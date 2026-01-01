import { useEffect, useState } from "react";
import members from "../../public/members.json";
import styles from "../styles/_members.module.scss";
import type { ImageParams } from "../types";
import MoveImage from "../components/moveImage.tsx";

export default function Members() {
  const groups: Record<number, [number, number]> = {
    0: [0, 6],
    1: [3, 4],
    2: [5, 6],
  };

  const defaultImages = members.filter((_, i) => {
    return i >= groups[0][0] && i <= groups[0][1];
  });

  const [selected, setSelected] = useState<number>(0);
  const [curr, setCurr] = useState<number | null>(null);
  const [images, setImages] = useState<ImageParams[]>(defaultImages);

  const departments = ["Programming", "Construction", "Electronics"];

  useEffect(() => {
    const filteredImages = members.filter((_, i) => {
      setCurr(null);
      return i >= groups[selected][0] && i <= groups[selected][1];
    });
    setImages(filteredImages);
  }, [selected]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <h1>Members</h1>
        </div>
        <div className={styles.selectorContainer}>
          {departments.map((department, i) => {
            return (
              <div
                key={i}
                className={styles.selector}
                onClick={() => setSelected(i)}
              >
                {department}
              </div>
            );
          })}
          <div
            className={styles.selectorIndicator}
            style={{ "--offset": `${selected}` } as React.CSSProperties}
          />
        </div>

        <div className={styles.membersContainer}>
          <div className={styles.membersBackground} />
          <div className={styles.memberContainer}>
            {images.map((image, i) => {
              const middle = Math.floor(images.length / 2);
              const offset = curr != null ? i - curr : i - middle;

              const styleClass =
                curr != null
                  ? offset == 0
                    ? styles.activeImage
                    : offset < 0
                    ? styles.leftImage
                    : styles.rightImage
                  : styles.default;

              return (
                <div
                  key={i}
                  id={styles.imageContainer}
                  className={styleClass}
                  style={{ "--offset": `${offset}` } as React.CSSProperties}
                  onClick={() => setCurr(i)}
                >
                  <div className={styles.hoverContainer}>
                    <MoveImage src={image.src} />

                    {offset == 0 && curr != null ? (
                      <div id={styles.textContainer}>
                        <h1 className={styles.name}>{image.name}</h1>
                        <h1 className={styles.desc}>{image.desc}</h1>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
