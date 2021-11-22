import React, { FC } from 'react';
import { IParkImage } from './ParkPopup';

interface IProps {
  images: IParkImage[];
}

const ImageDetails: FC<IProps> = (props: IProps) => {
  const { images } = props;

  return (
    <div>
      Images
      {images.map((img) => (
        <div>
          <a href={img.url} target="_blank" rel="noreferrer">
            <img height={45} src={img.url} alt={img.altText} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default ImageDetails;
