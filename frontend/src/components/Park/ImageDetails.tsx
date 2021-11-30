import React, { FC, useState } from 'react';
import { IParkImage } from './ParkPopup';

interface IProps {
  images: IParkImage[];
}

const ImageDetails: FC<IProps> = (props: IProps) => {
  const { images } = props;
  const [shownImage, setShownImage] = useState(1);
  const [showInfo, setShowInfo] = useState(false);

  function slideLeft() {
    if (shownImage > 1) {
      setShownImage(shownImage - 1);
    }
  }

  function slideRight() {
    if (shownImage < props.images.length) {
      setShownImage(shownImage + 1);
    }
  }

  return (
    <>
      Images
      <br />
      <button type="button" className="image-button" onClick={slideLeft}>
        &#10094;
      </button>
      <button type="button" className="image-button" onClick={slideRight}>
        &#10095;
      </button>
      {images.map((img, i, array) => {
        const imageClass = i + 1 === shownImage ? 'shown' : 'hide';
        return (
          <div>
            <div className="image-background">
              <div className={imageClass}>
                <span className="image-title">{img.title}</span>
                <a href={img.url} target="_blank" rel="noreferrer">
                  <img className="imagee" src={img.url} alt={img.altText} />
                </a>
                <div className="image-dots">
                  {[...Array(images.length)].map((dot, ii) => {
                    if (ii + 1 === shownImage) {
                      return <div className="image-dot">&#10029;</div>;
                    }
                    return <div className="image-dot">&#10032;</div>;
                  })}
                </div>
                <hr />
                <button type="button" onClick={() => setShowInfo(!showInfo)}>
                  +
                </button>
                {showInfo && (
                  <div className="image-info">
                    <div>{img.caption}</div>
                    <div>{img.credit}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <button type="button" className="image-button" onClick={slideLeft}>
        &#10094;
      </button>
      <button type="button" className="image-button" onClick={slideRight}>
        &#10095;
      </button>
    </>
  );
};

export default ImageDetails;
