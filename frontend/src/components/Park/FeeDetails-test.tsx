import React from 'react';
import { render, screen } from '@testing-library/react';
import FeesDetails, { IEntranceFee } from './FeesDetails';

const testFees: IEntranceFee[] = [
  {
    cost: '15',
    description: 'A simple fee',
    title: 'Basic',
  },
  {
    cost: '20',
    description: 'Advanced fee',
    title: 'Advanced',
  },
];

const emptyFees: IEntranceFee[] = [];

describe('FeeDetails', () => {
  test('renders FeeDetails component', () => {
    render(<FeesDetails fees={testFees} />);
    expect(screen.queryByRole('table')).toBeInTheDocument();
    expect(screen.queryAllByRole('row')).toHaveLength(2);
    expect(screen.queryAllByRole('cell')).toHaveLength(4);
    // screen.debug();
  });

  test('renders FeeDetails empty', () => {
    render(<FeesDetails fees={emptyFees} />);
    expect(screen.queryAllByRole('row')).toHaveLength(0);
    expect(screen.queryAllByRole('cell')).toHaveLength(0);
  });
});
