import React, { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';

const PaymentCancel = () => {
  return (
    <div style={{ 'background-color': '#f6f8fa', minHeight: '100vh' }}>
      <div className='cart'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              There was a problem while checking out
            </div>
            <div>
              <Button to={'/'} text={'Go Back Home'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
