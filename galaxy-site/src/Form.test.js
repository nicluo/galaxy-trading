import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Form from './Form';

describe('Form', () => {
  it('renders <Form /> component', () => {
    const wrapper = shallow(<Form />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('updates input value based on keypresses', () => {
    const wrapper = shallow(<Form />);
    const input = wrapper.find('input');
    input.simulate('change', {target: {value: 'test input'}});
    expect(wrapper.instance().state.input).toEqual('test input');
    expect(wrapper.find('input').props().value).toEqual('test input');
  });

  it('calls onSubmit when form is submitted', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<Form onSubmit={spy} />);
    wrapper.find('input').simulate('change', {target: {value: 'test input'}});
    wrapper.find('form').simulate('submit', {preventDefault: () => {}});
    expect(spy.getCall(0).args[0]).toEqual('test input');
  });
});