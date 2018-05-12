import React from 'react';
import * as styledComponents from 'styled-components';

export interface ILabelProps {
  text: string;
  x: number;
  y: number;
  size?: number;
}

const StyledLabel = styledComponents.default.text`
  fill: #888;
  font-size:${(props: ILabelProps) => props.size ? props.size : 18}px;
`;

const Label: React.StatelessComponent<ILabelProps> = props => (
  <StyledLabel {...props}>{props.text}</StyledLabel>
);

export default Label;
