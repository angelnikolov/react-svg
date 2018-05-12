import React from 'react';

export interface ISectorProps {
  path: string;
  fill: string;
  strokeWidth: number;
  strokeLinejoin: "miter" | "round" | "bevel" | "inherit";
}

const Sector: React.StatelessComponent<ISectorProps> = props => {
  const { path, fill, strokeLinejoin, strokeWidth } = props;
  return (
    <path
      d={path}
      style={{
        transitionProperty: "all",
        transitionTimingFunction: "ease-out",
        transitionDuration: "0.25s",
      }}
      fill={fill}
      strokeWidth={strokeWidth}
      strokeLinejoin={strokeLinejoin}
    />
  );
};

export default Sector;
