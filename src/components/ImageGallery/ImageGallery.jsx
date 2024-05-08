import { ImageCard } from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ items, openModal }) => {
  return (
    <ul className={s.list}>
      {items.map((item, index) => (
        <li key={`${item.id}-${index}`} className={s.item}>
          <ImageCard item={item} onImgClick={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
