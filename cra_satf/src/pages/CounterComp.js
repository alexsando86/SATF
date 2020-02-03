import React from 'react';
import queryString from 'query-string';

const CounterComp = ({ location, match }) => {
  const query = queryString.parse(location.search);

  const detail = query.detail === 'true';

  return (
    <div>
      <h2>CounterComp {match.params.name}</h2>
      {detail && 'detail: blahblah'}
    </div>
  );
};

export default CounterComp;
