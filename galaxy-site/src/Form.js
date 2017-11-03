import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  state = {
    input: ''
  };

  handleChange = (e) =>  {
    this.setState({ input: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
  };

  render() {
    const { input } = this.state;
    return (
      <div className="container my-4">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control form-control-lg" id="query" aria-describedby="query" placeholder="how much is pish pish Iron ?" autoFocus="" value={input} onChange={this.handleChange} />
          </div>
        </form>
      </div>
    );
  }
}

Form.PropTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Form;
