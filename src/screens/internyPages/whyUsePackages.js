import React, { Component } from 'react';
import styles from './style.scss';

// Components
import Button from '../../components/Button';
import Card from '../../components/Card';

export default class BusinessPackage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packageOne: false,
      packageTwo: false,
      packageThree: false,
    };
  }

  addToCart = (id) => {
    console.log(id);
    localStorage.setItem('cartItems', JSON.stringify(id));
  };

  renderPackageCard = (packageData, moneyBackGuaranteed) => {
    const isHovered = this.state[packageData.id];
    return (
      <div
        onMouseLeave={() => this.setState({ [packageData.id]: false })}
        onMouseEnter={() => this.setState({ [packageData.id]: true })}
        className={styles.frontier}
      >
        <Card type={'pricing'}>
          {this.props.type == 'intern'
            ? moneyBackGuaranteed && <div className={'moneyGuarenteed'}></div>
            : null}

          <div className='home__packagesSection__packageCard'>
            <div className='home__packagesSection__packageCard__headerDiv'>
              <div className='home__packagesSection__packageCard__packageTitle'>
                {packageData.title}
              </div>
              <div className='home__packagesSection__packageCard__packagePrice'>
                {packageData.price}
              </div>
              <div className='home__packagesSection__packageCard__packagePaymentDate'>
                {packageData.payment}
              </div>
            </div>
            <div className='home__packagesSection__packageCard__stroke' />
            <div className='home__packagesSection__packageCard__descriptionDiv'>
              <div className='home__packagesSection__packageCard__packageDescription'>
                {packageData.highlights.map((highlight, index) => {
                  return (
                    <div
                      data-toggle='tooltip'
                      title={highlight.description}
                      key={index}
                    >
                      {highlight.heading}
                    </div>
                  );
                })}
              </div>
              <Button
                v-if={isHovered}
                type={'primary'}
                text={'Buy Now'}
                sizeName={'default'}
                onButtonClick={this.addToCart(packageData.id)}
              />
              <Button
                v-if={!isHovered}
                type={'ghost'}
                text={'Buy Now'}
                sizeName={'default'}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  };

  render() {
    // packagesData must consist of objects that has id 'packageOne', 'packageTwo', 'packageThree' to match this component's state.
    const { title, subtitle, packagesData } = this.props;

    return (
      <div id={'packages-section'} className='home__packagesSection'>
        <div className='container'>
          <div className='home__packagesSection__packagesTitle'>{title}</div>
          <div className='home__packagesSection__packagesSubTitle'>
            {subtitle}
          </div>
          <div className='row home__packagesSection__row'>
            <div className='col-md-4'>
              {this.renderPackageCard(packagesData[0])}
            </div>
            <div className='col-md-4'>
              {this.renderPackageCard(packagesData[1], true)}
            </div>
            <div className='col-md-4'>
              {this.renderPackageCard(packagesData[2])}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
