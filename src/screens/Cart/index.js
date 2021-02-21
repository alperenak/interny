import React, { useState, useEffect } from 'react';
import styles from './cart.scss';
import Card from '../../components/Card';
import store from '../../store';
import { getCookie } from '../../utils/cookie';
import { loadStripe } from '@stripe/stripe-js';

const index = () => {
  const [cartItems, setCartItems] = useState([]);
  const [packages, setPackage] = useState(null);
  const [quant, setQuant] = useState(null);

  const stripePromise = loadStripe(
    'pk_test_51HbnvBEexm5jHOGxsnPBjTeexZZrnUKtEubUerAetv5O2Fljp44qfZrkAAhxrfjbZV5eQXXMu7MUFtRlGCOw1yYa00uN8yHFlW'
  );

  const quantityButtons = [
    {
      type: 'primary',
      text: '+1',
      sizeName: 'small',
      width: '85px',
      onButtonClick: async () => {
        console.log('add 1?');
      },
    },
  ];

  const INTERN_PACKAGES = {
    competency: {
      id: 'competency',
      name: 'Competency Package',
      price: 1249,
      currency: 'usd',
      img:
        'https://cdn.shopify.com/s/files/1/0142/5565/2928/products/premium_package_260x.png',
    },
    intern: {
      id: 'intern',
      name: 'Intern Package',
      price: 2449,
      currency: 'usd',
      img:
        'https://cdn.shopify.com/s/files/1/0142/5565/2928/products/premium_package_260x.png',
    },
    freemium: {
      id: 'freemium',
      name: 'Freemium Package',
      price: 0,
      currency: 'usd',
      img:
        'https://cdn.shopify.com/s/files/1/0142/5565/2928/products/premium_package_260x.png',
    },
  };

  useEffect(() => {
    if (packages === null) {
      setPackage(
        INTERN_PACKAGES[JSON.parse(localStorage.getItem('cartItems'))]
      );
    }

    if (packages) {
      setQuant(JSON.parse(localStorage.getItem('quantity')));
      setCartItems([
        {
          package: packages.id,
          image: packages.img,
          header: packages.name,
          buttons: quantityButtons,
        },
      ]);
    }
  }, [packages, JSON.parse(localStorage.getItem('quantity'))]);

  const COMPANY_PACKAGES = {
    hiring: {
      price: 4999,
      name: 'Hiring Package',
      currency: 'usd',
      img:
        'https://cdn.shopify.com/s/files/1/0142/5565/2928/products/premium_package_260x.png',
    },
    business: {
      price: 4999,
      currency: 'usd',
      name: 'Business Package',
      img:
        'https://cdn.shopify.com/s/files/1/0142/5565/2928/products/premium_package_260x.png',
    },
    elearning: {
      price: 2999,
      currency: 'usd',
      name: 'E-Learning Package',
      img:
        'https://cdn.shopify.com/s/files/1/0142/5565/2928/products/premium_package_260x.png',
    },
  };

  const payButton = [
    {
      type: 'primary',
      text: 'Pay with stripe',
      sizeName: 'large',
      width: '85px',
      onButtonClick: async () => {
        const items = cartItems.map((item) => {
          return {
            ...item,
            quantity: JSON.parse(localStorage.getItem('quantity')),
          };
        });
        const stripe = await stripePromise;

        const response = await fetch(
          'https://interny-backend-prod.herokuapp.com/payment/intern/5f5145c6cb4ec4130143bbd4',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              packages: items,
              // packages: cartItems,
            }),
          }
        );

        const session = await response.json();

        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        console.log(result);
        if (result.error) {
          console.log('error');
        }
      },
    },
  ];
  const paymentItems = [
    {
      id: 1,
      header: 'Total: xxx$',
      buttons: payButton,
    },
  ];

  return (
    <div style={{ 'background-color': '#f6f8fa', minHeight: '100vh' }}>
      <div className='cart'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <Card
                header={{ text: 'Cart Items', position: 'center' }}
                type={'cartItem'}
                items={cartItems}
              />
            </div>
            <div className='col-md-4'>
              <Card
                header={{ text: 'Payment', position: 'center' }}
                type={'cartItem'}
                items={paymentItems}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
