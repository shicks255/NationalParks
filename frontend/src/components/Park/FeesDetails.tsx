import React, { FC } from 'react';

interface IProps {
  fees: IEntranceFee[];
}

interface IEntranceFee {
  cost: string;
  description: string;
  title: string;
}

const FeesDetails: FC<IProps> = (props: IProps) => {
  const { fees } = props;

  return (
    <div>
      <table>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee.title}>
              <td style={{ textAlign: 'right' }}>$ {fee.cost}</td>
              <td>{fee.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export type { IEntranceFee };
export default FeesDetails;
