import React, { useState } from 'react';
import styles from './paymentsuccess.scss';
import Card from '../../components/Card';
import Button from '../../components/Button';

const PaymentSuccess = () => {
  return (
    <div style={{ 'background-color': '#f6f8fa', minHeight: '100vh' }}>
      <div className='cart'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              Your have bought Your packages successfully
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

export default PaymentSuccess;
