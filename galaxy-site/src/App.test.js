import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';

it('renders <App /> loading state', () => {
  const wrapper = shallow(<App sessionId={null} offline={false} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders <App /> offline state', () => {
  const wrapper = shallow(<App sessionId={null} offline={true} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});