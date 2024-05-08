import s from "./ImageCard.module.css";

export const ImageCard = ({ item, onImgClick }) => {
  const {
    alt_description,
    urls: { small, regular },
  } = item;

  const handleImageClick = () => {
    if (typeof onImgClick === "function") {
      onImgClick(regular);
    }
  };

  return (
    <div className={s.wrap}>
      <img
        className={s.image}
        src={small}
        alt={alt_description}
        onClick={handleImageClick}
      />
    </div>
  );
};
