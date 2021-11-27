import React, { FC } from 'react';

interface IProps {
  details: IOperatingHours[];
}

interface IOperatingHours {
  description: string;
  name: string;
  standardHours: IHours;
  exceptions: IExceptions[];
}

interface IExceptions {
  endDate: string;
  startDate: string;
  name: string;
  exceptionHours: IHours;
}

interface IHours {
  friday: string;
  monday: string;
  saturday: string;
  sunday: string;
  thursday: string;
  tuesday: string;
  wednesday: string;
}

const HoursDetails: FC<IProps> = (props: IProps) => {
  const { details } = props;

  if (!details || details.length < 1) {
    return <></>;
  }

  return (
    <div>
      <span data-testid="hours-label">{details[0].description}</span>
      <br />
      <table style={{ border: '1px solid black' }}>
        <tbody>
          <tr>
            <td>Monday</td>
            <td>{details[0].standardHours.monday}</td>
          </tr>
          <tr>
            <td>Tuesday</td>
            <td>{details[0].standardHours.tuesday}</td>
          </tr>
          <tr>
            <td>Wednesday</td>
            <td>{details[0].standardHours.wednesday}</td>
          </tr>
          <tr>
            <td>Thursday</td>
            <td>{details[0].standardHours.thursday}</td>
          </tr>
          <tr>
            <td>Friday</td>
            <td>{details[0].standardHours.friday}</td>
          </tr>
          <tr>
            <td>Saturday</td>
            <td>{details[0].standardHours.saturday}</td>
          </tr>
          <tr>
            <td>Sunday</td>
            <td>{details[0].standardHours.sunday}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export type { IOperatingHours };
export default HoursDetails;
