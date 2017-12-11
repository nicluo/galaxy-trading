import React, { Component } from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import withSession from './session';

describe('session', () => {
  let WrapperComponent;

  beforeEach(() => {
    class MockApp extends Component {
      render() {
        return (<div>App</div>);
      }
    }

    WrapperComponent = withSession(MockApp);
  });

  test('withSession should render without crashing', () => {
    const wrapper = shallow(<WrapperComponent/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
