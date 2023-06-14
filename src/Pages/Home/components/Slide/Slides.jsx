import { useEffect, useState } from "react";
import { ImgSlide } from "../../../../ComponentsStyles";
import styles from "./Styled.module.css";
import { imageMap } from "./data";
import { dataImg } from "./index";
export default function Slide() {
  const images = [
    "COD.jpg",
    "GOD.jpg",
    "GTA.jpg",
    "Monitor.jpg",
    "Placa Madre.jpeg",
    "RTX 3080.jpg",
  ];
  const [selectedIndex, SetSelectedIndex] = useState(0);
  const [selectImage, setSelectedImage] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);

  const selectNewImage = (index, images) => {
    setLoaded(false);
    setTimeout(() => {
      setSelectedImage(images[index]);
      SetSelectedIndex(index);
    }, 300);
  };

  const next = () => {
    setTimeout(() => {
      const lastIndex = images.length - 1;
      const nextIndex = selectedIndex < lastIndex ? selectedIndex + 1 : 0;
      selectNewImage(nextIndex, images);
    }, 500);
  };

  useEffect(() => {
    let isMounted = true; // Variable de referencia para verificar si el componente está montado

    const interval = setInterval(() => {
      if (isMounted) {
        next(); // Llama a la función next solo si el componente está montado
      }
    }, 4000);

    return () => {
      isMounted = false; // Actualiza la variable de referencia cuando el componente se desmonta
      clearInterval(interval); // Cancela el intervalo
    };
  }, [selectedIndex]);

  return (
    <div className={styles.carousel}>
      <div className={styles.container_carouselImg}>
        {dataImg.map((el) => (
          <ImgSlide
            loaded={loaded}
            key={el.id}
            src={imageMap[selectImage]}
            alt={el.alt}
            onLoad={() => setLoaded(true)}
          />
        ))}
        {/* <img src={require(`./Images/SlideHome/COD.jpg`).default}/> */}
      </div>
      <div className={styles.pagination_circular}>
        {images.map((_, index) => (
          <span
            key={index}
            className={index === selectedIndex ? styles.active : ""}
            onClick={() => {
              selectNewImage(index, images);
            }}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
}
