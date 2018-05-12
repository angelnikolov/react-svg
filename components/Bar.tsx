import React from 'react';
import * as styledComponents from 'styled-components';

import { IDataPoint } from '../shared/interfaces/IDataPoint';
import Label from './Label';

export interface IBarProp extends IDataPoint {
  width: number;
  value: number;
}

const Bar: React.StatelessComponent<IBarProp> = props => (
  <React.Fragment>
    <Rect {...props} 
      style={{
        transitionProperty: "all",
        transitionTimingFunction: "ease-out",
        transitionDuration: "0.25s",
      }}/>
    <Label text={props.name} x={props.x + 15} y={props.y + props.value + 25} />
    <Label text={"$" + props.value} x={props.x + 35} y={props.y - 7.5} />
  </React.Fragment>
);
const Rect = styledComponents.default.rect`
  fill: ${(props: IBarProp) => props.color};
  height: ${(props: IBarProp) => props.value}px;
  width:  ${(props: IBarProp) => props.width}px;
  stroke: none;
`;

export default Bar;
