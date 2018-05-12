import React from 'react';

export interface IAxisProps {
  minX: number;
  maxX: number;
  y: number;
  color: string;
}

const Axis: React.StatelessComponent<IAxisProps> = props => (
  <React.Fragment>
  <line x1={props.minX} x2={props.maxX} y1={props.y} y2={props.y} stroke={props.color} />
  {props.children}
  </React.Fragment>
  
);
export default Axis;
