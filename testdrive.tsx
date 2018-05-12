import React from 'react';

import Bars from './components/Bars';
import Pie from './components/Pie';
import { ICommonProps } from './shared/interfaces/ICommonProps';

interface ITestDriveProps extends ICommonProps {
  activeGraph: "bar" | "pie";
}
const BAR_WIDTH = 100;
export default class TestDrive extends React.PureComponent<
  ITestDriveProps,
  {}
> {
  render() {
    return this.props.activeGraph === "bar" ? (
      <Bars
        {...{
          barWidth: BAR_WIDTH,
          ...this.props
        }}
      />
    ) : (
      <Pie size={500} strokeWidth={3} {...this.props} />
    );
  }
}
