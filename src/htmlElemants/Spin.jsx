import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Spin(props) {
  return (
    <div
      style={{ display: props.waiting ? 'table' : 'none' }}
      className="spinnerDiv"
    >
      <div className="sipnerItem">
        <Spinner animation="border" variant="secondary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
}