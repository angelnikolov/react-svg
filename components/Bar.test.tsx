// Bar.test.js
import 'jest-styled-components';

import { mount } from 'enzyme';
import React from 'react';

import Bar from './Bar';

const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
enzyme.configure({ adapter: new Adapter() });

test("should render correct DOM depending on properties", ()=>{
  const BarInstance = mount(<Bar width={50} value={150} name="Test Bar" color="green" x={15} y={15} />);
  expect(BarInstance.find('text').length).toBe(2);
  console.log(BarInstance.find('text')[1])
  expect(BarInstance.find('text').at(0).text()).toBe('Test Bar');
  expect(BarInstance.find('text').at(1).text()).toBe('$'+150);
})