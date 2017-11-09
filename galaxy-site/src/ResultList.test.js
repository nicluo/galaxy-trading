import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ResultList from './ResultList';

describe('ResultList', () => {
  it('renders <ResultList /> component', () => {
    const wrapper = shallow(<ResultList statements={[]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders <ResultList /> component with item', () => {
    const statements = [{
      id: 1,
      type: 'success',
      query: 'tegj is L',
      message: 'tegj aliased to L',
    }];
    const wrapper = shallow(<ResultList statements={statements} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders <ResultList /> component with error item', () => {
    const statements = [{
      id: 1,
      type: 'error',
      query: 'bad input',
      message: 'I dont understand what you are talking about',
    }];
    const wrapper = shallow(<ResultList statements={statements} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});