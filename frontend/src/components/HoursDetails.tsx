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

  return (
    <div>
      <span>{details[0].description}</span>
      <br />
      <table>
        <tbody>
          <tr>
            <td>Monday {details[0].standardHours.monday}</td>
          </tr>
          <tr>
            <td>Tuesday {details[0].standardHours.tuesday}</td>
          </tr>
          <tr>
            <td>Wednesday {details[0].standardHours.wednesday}</td>
          </tr>
          <tr>
            <td>Thursday {details[0].standardHours.thursday}</td>
          </tr>
          <tr>
            <td>Friday {details[0].standardHours.friday}</td>
          </tr>
          <tr>
            <td>Saturday {details[0].standardHours.saturday}</td>
          </tr>
          <tr>
            <td>Sunday {details[0].standardHours.sunday}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export type { IOperatingHours };
export default HoursDetails;
