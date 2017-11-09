import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ResultList = ({statements}) => {
  const cards = statements.map((s) => {
    const classes = classNames('list-group-item', {
      'list-group-item-danger': s.type === 'error',
      'list-group-item-success': s.type === 'success'
    });
    return (
      <div className="card my-2" key={s.id}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong className="h4">
              {s.query}
            </strong>
          </li>
          <li className={classes}>
            {s.message}
          </li>
        </ul>
      </div>
    );
  });

  return (
    <div className="container my-4">
      { cards.length > 0 ? cards : DefaultMessage }
    </div>
  );
};

const DefaultMessage = (
  <div className="card my-2">
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        <strong className="h4">
          Welcome!
        </strong>
      </li>
      <li className="list-group-item list-group-item-info">
        Submit a query to get started!
      </li>
    </ul>
  </div>
);

ResultList.propTypes = {
  statements: PropTypes.array.isRequired
};

export default ResultList;

