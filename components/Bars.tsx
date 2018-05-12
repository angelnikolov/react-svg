import React from 'react';
import * as styledComponents from 'styled-components';

import { ICommonProps } from '../shared/interfaces/ICommonProps';
import Axis from './Axis';
import Bar from './Bar';

export interface IBarsProps extends ICommonProps {
  barWidth: number;
}
const BARS_BOTTOM_PADDING = 60;
const AXIS_BOTTOM_PADDING = BARS_BOTTOM_PADDING - 1;
const AXIS_HORIZONTAL_OFFSET = 30;

const OverflowingSvg = styledComponents.default.svg`
  overflow: visible;
`;

const getX = (pointIndex: number, barWidth: number, halfMarginPerBar: number) => {
  return pointIndex === 1
    ? halfMarginPerBar
    : pointIndex * halfMarginPerBar + (pointIndex - 1) * barWidth;
};


const Bars: React.StatelessComponent<IBarsProps> = props => {
    const halfMarginPerBar = 
      (props.viewBoxWidth -
        props.data.length * props.barWidth) /
      (props.data.length + 1)
    const { data, barWidth, viewBoxHeight } = props;
    return (
      <React.Fragment>
        <Axis
          color="#000"
          minX={halfMarginPerBar - AXIS_HORIZONTAL_OFFSET}
          maxX={
            props.viewBoxWidth -
            halfMarginPerBar +
            AXIS_HORIZONTAL_OFFSET
          }
          y={viewBoxHeight - AXIS_BOTTOM_PADDING}
        />
        <OverflowingSvg y={-BARS_BOTTOM_PADDING}>
          {data.map((point, i) => (
            <Bar
              key={i}
              color={point.color}
              x={getX(i + 1, barWidth, halfMarginPerBar)}
              y={viewBoxHeight - point.y}
              value={point.y}
              width={barWidth}
              name={point.name}
            />
          ))}
        </OverflowingSvg>
      </React.Fragment>
    );
}

export default Bars;
