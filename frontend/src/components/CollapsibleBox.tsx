import React, { useState, FC } from 'react';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleBox: FC<IProps> = (props: IProps) => {
  const { title, children } = props;
  const [show, setShow] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setShow(!show)}>
        {title}
      </button>
      {show && <div>{children}</div>}
    </>
  );
};

export default CollapsibleBox;
