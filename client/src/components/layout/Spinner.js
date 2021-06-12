import React, { Fragment } from 'react';
import loading from './loading.gif';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Fragment>
    <img
      src={loading}
      style={{ width: '100px', margin: 'auto', display: 'block' }}
      alt='Loading'
    />
  </Fragment>
);
