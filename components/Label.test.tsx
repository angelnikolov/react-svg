// Label.test.js
import 'jest-styled-components';

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Label from './Label';

const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
enzyme.configure({ adapter: new Adapter() });
test("Label should render", () => {
  const component = renderer.create(
    <Label text="Test" x={15} y={15} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});

test("shallow test", ()=>{
  const label = shallow(<Label text="Test" x={15} y={15} />);
  expect(label.text()).toBe('<styled.text />')
})