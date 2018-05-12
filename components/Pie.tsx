import React from 'react';
import * as styledComponents from 'styled-components';

import { ICommonProps } from '../shared/interfaces/ICommonProps';
import Label from './Label';
import Sector from './Sector';

export interface IPieProps extends ICommonProps {
  size: number;
  strokeWidth: number;
}
const OverflowingSvg = styledComponents.default.svg`
  overflow: visible;
  transition: 0.25s all;
`;

const LINE_HORIZONTAL_OFFSET = 150;
let angleStart = 0;
let angleEnd = 0;

const getLabelXCoordinate = (
  x1: number,
  x2: number,
  center: number
): number => {
  if (Math.abs(x1 - center) >= Math.abs(x2 - center)) {
    return Math.min(
      getHorizontalLineCoordinates(x1, x2, center).x1,
      getHorizontalLineCoordinates(x1, x2, center).x2
    );
  } else {
    return Math.max(
      getHorizontalLineCoordinates(x1, x2, center).x1,
      getHorizontalLineCoordinates(x1, x2, center).x2
    );
  }
};

const getLabelYCoordinate = (y2: number, y1: number): number => {
  return y1 + (y2 - y1) / 2;
};

const getHorizontalLineCoordinates = (
  x1: number,
  x2: number,
  center: number
): { x1: number; x2: number } => {
  return {
    x1: Math.abs(x1 - center) >= Math.abs(x2 - center) ? -center : x1 + LINE_HORIZONTAL_OFFSET,
    x2:
    Math.abs(x1 - center) >= Math.abs(x2 - center)
        ? center - 2 * LINE_HORIZONTAL_OFFSET
        : center + center
  };
};
const getVerticalLineCoordinates = (
  y2: number,
  y1: number
): { y1: number; y2: number } => {
  return {
    y2: y1 + (y2 - y1) / 2,
    y1: y1 + (y2 - y1) / 2
  };
};

const Pie: React.StatelessComponent<IPieProps> = props => {
  const { data, viewBoxHeight, viewBoxWidth, size } = props;

  const totalSum = Math.ceil(
    props.data.reduce((prev, current) => current.y + prev, 0)
  );

  /**
   * construct svg ready data
   */
  const svgData = props.data.map((dataPoint, i) => {
    const center = viewBoxWidth / 2;
    const angle = 360 * dataPoint.y / totalSum;
    const radius = center + props.strokeWidth / 2;

    /**
     * for every sector move the angleStart to the previous angleEnd
     */
    angleStart = angleEnd;
    angleEnd = angleStart + angle;

    const x1 = center + radius * Math.cos(Math.PI * angleStart / 180);
    const y1 = center + radius * Math.sin(Math.PI * angleStart / 180);
    const x2 = center + radius * Math.cos(Math.PI * angleEnd / 180);
    const y2 = center + radius * Math.sin(Math.PI * angleEnd / 180);
    const path = `
      M${center},${center}
      L${x1},${y1}
      A${radius},${radius}
      0 0,1
      ${x2},${y2}
      z
      `;
    return {
      value: dataPoint.y,
      name: dataPoint.name,
      color: dataPoint.color,
      center,
      angle,
      radius,
      x1,
      x2,
      y1,
      y2,
      path
    };
  });

  return (
    <React.Fragment>
      <OverflowingSvg
        viewBox={`${0} ${0} ${1920} ${viewBoxWidth}`}
        height={size}
        width={size}
        x={(viewBoxWidth - size) / 2}
        y={(viewBoxHeight - size) / 2}
      >
        {svgData.map((d, i) => {
          return (
            <Sector
              key={"sector" + i}
              fill={d.color}
              path={d.path}
              strokeWidth={props.strokeWidth}
              strokeLinejoin="round"
            />
          );
        })}
      </OverflowingSvg>
      <OverflowingSvg
        viewBox={`${0} ${0} ${1920} ${viewBoxWidth}`}
        height={size}
        width={size}
        x={(viewBoxWidth - size) / 2}
        y={(viewBoxHeight - size) / 2}
      >
        {svgData.map((d, i) => {
          return (
            <React.Fragment
                key={"label" + i}>
              <line
                {...getHorizontalLineCoordinates(d.x1, d.x2, d.center)}
                {...getVerticalLineCoordinates(d.y2, d.y1)}
                stroke="#000"
                strokeWidth={props.strokeWidth}
              />
              <Label
                text={d.name}
                x={getLabelXCoordinate(d.x1, d.x2, d.center)}
                y={getLabelYCoordinate(d.y2, d.y1) - 25}
                size={100}
              />
              <Label
                text={"$" + d.value}
                x={getLabelXCoordinate(d.x1, d.x2, d.center)}
                y={getLabelYCoordinate(d.y2, d.y1) + 100}
                size={100}
              />
            </React.Fragment>
          );
        })}
      </OverflowingSvg>
    </React.Fragment>
  );
};
export default Pie;
