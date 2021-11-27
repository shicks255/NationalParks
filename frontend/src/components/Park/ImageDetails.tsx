import React, { FC, useState } from 'react';
import { IParkImage } from './ParkPopup';

interface IProps {
  images: IParkImage[];
}

const ImageDetails: FC<IProps> = (props: IProps) => {
  const { images } = props;
  const [shownImage, setShownImage] = useState(0);

  function slideLeft() {
    if (shownImage > 0) {
      setShownImage(shownImage - 1);
    }
  }

  function slideRight() {
    if (shownImage < props.images.length - 1) {
      setShownImage(shownImage + 1);
    }
  }

  return (
    <>
      Images
      <div className="image-background">
        {images.map((img, i) => {
          const imageClass = i === shownImage ? 'shown' : 'hide';
          return (
            <div className={imageClass}>
              <a href={img.url} target="_blank" rel="noreferrer">
                <img className="imagee" src={img.url} alt={img.altText} />
              </a>
            </div>
          );
        })}
      </div>
      <button type="button" className="" onClick={slideLeft}>
        &#10094;
      </button>
      <button type="button" className="" onClick={slideRight}>
        &#10095;
      </button>
    </>
  );
};

export default ImageDetails;
