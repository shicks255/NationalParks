import React, { FC, useState } from 'react';
import { IParkImage } from './ParkPopup';

interface IProps {
  images: IParkImage[];
}

const ImageDetails: FC<IProps> = (props: IProps) => {
  const { images } = props;
  const imgUrls = new Set();
  const dedupedImages = images.filter((img) => {
    if (imgUrls.has(img.url)) {
      return false;
    }
    imgUrls.add(img.url);
    return true;
  });
  const [shownImage, setShownImage] = useState(1);
  // const [showInfo, setShowInfo] = useState(false);

  function isLastImage(): boolean {
    return shownImage === dedupedImages.length;
  }

  function isFirstImage(): boolean {
    return shownImage === 1;
  }

  function slideLeft() {
    if (shownImage > 1) {
      setShownImage(shownImage - 1);
    }
  }

  function slideRight() {
    if (shownImage < dedupedImages.length) {
      setShownImage(shownImage + 1);
    }
  }

  return (
    <>
      <br />
      <button
        disabled={isFirstImage()}
        type="button"
        className="image-button"
        onClick={slideLeft}
      >
        &#10094;
      </button>
      <button
        disabled={isLastImage()}
        type="button"
        className="image-button"
        onClick={slideRight}
      >
        &#10095;
      </button>
      {dedupedImages.map((img, i) => {
        const imageClass = i + 1 === shownImage ? 'shown-image' : 'hide-image';
        return (
          <div key={img.url}>
            <div className="image-background">
              <div className={imageClass}>
                <span className="image-title">{img.title}</span>
                <a href={img.url} target="_blank" rel="noreferrer">
                  <img className="park-image" src={img.url} alt={img.altText} />
                </a>
                <div className="image-dots">
                  {dedupedImages.map((pic, ii) => {
                    if (ii + 1 === shownImage) {
                      return (
                        <div key={`dot_${pic.url}`} className="image-dot">
                          &#10029;
                        </div>
                      );
                    }
                    return (
                      <div key={`dot_${pic.url}`} className="image-dot">
                        &#10032;
                      </div>
                    );
                  })}
                </div>
                <hr />
                <div className="image-info">
                  <div>{img.caption}</div>
                  <div>{img.credit}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ImageDetails;
