import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageDetails from './ImageDetails';
import { IParkImage } from './ParkPopup';

const images: IParkImage[] = [
  {
    altText: '',
    url: '',
    caption: '',
    credit: '',
    title: '',
  },
];

describe('ImageDetailsTest', () => {
  test('renders ImageDetails', () => {
    render(<ImageDetails images={images} />);
    screen.debug();
  });
});
