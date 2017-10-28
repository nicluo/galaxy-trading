import React from 'react';

const ResultList = () => (
  <div className="container my-4">
    <div className="card my-2">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong className="h4">
            how much wood could a woodchuck chuck if a woodchuck could chuck wood ?
          </strong>
        </li>
        <li className="list-group-item list-group-item-danger">
          I have no idea what you are talking about
        </li>
      </ul>
    </div>
    <div className="card my-2">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong className="h4">
            how much is pish tegj glob glob ?
          </strong>
        </li>
        <li className="list-group-item list-group-item-success">
          pish tegj glob glob is 42
        </li>
      </ul>
    </div>
  </div>
);

export default ResultList;
