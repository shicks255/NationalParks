import React from 'react';
import { render, screen } from '@testing-library/react';
import HoursDetails, { IOperatingHours } from './HoursDetails';

const details: IOperatingHours[] = [
  {
    name: 'Daily',
    description: 'The daily hours',
    exceptions: [],
    standardHours: {
      monday: 'Sunrise to Sunset',
      tuesday: 'Sunrise to Sunset',
      wednesday: 'Sunrise to Sunset',
      thursday: 'Sunrise to Sunset',
      friday: 'Sunrise to Sunset',
      saturday: 'Sunrise to Sunset',
      sunday: 'Sunrise to Sunset',
    },
  },
];

describe('HoursDetails', () => {
  test('should render HoursDetails', () => {
    render(<HoursDetails details={details} />);
    expect(screen.queryByTestId('hours-label')).toHaveTextContent(
      details[0].description
    );
    expect(screen.queryByRole('table')).toBeInTheDocument();
    expect(screen.queryAllByRole('row')).toHaveLength(7);
    expect(screen.queryAllByRole('cell')).toHaveLength(14);
  });

  test('should render empty HoursDetails', () => {
    render(<HoursDetails details={[]} />);
    expect(screen.queryAllByRole('row')).toHaveLength(0);
    expect(screen.queryAllByRole('cell')).toHaveLength(0);
  });
});
