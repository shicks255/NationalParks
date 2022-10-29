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
      <blockquote>
        <table>
          <tbody>
            {fees.map((fee) => (
              <tr key={fee.title}>
                <td className="no-wrap" style={{ textAlign: 'right' }}>
                  <span>$ {fee.cost}</span>
                </td>
                <td style={{ paddingLeft: 15 }}>{fee.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </blockquote>
    </div>
  );
};

export type { IEntranceFee };
export default FeesDetails;
