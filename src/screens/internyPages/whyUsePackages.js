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

  renderPackageCard = (packageData, moneyBackGuaranteed) => {
    const isHovered = this.state[packageData.id];
    return (
      <div
        onMouseLeave={() => this.setState({ [packageData.id]: false })}
        onMouseEnter={() => this.setState({ [packageData.id]: true })}
        className={styles.frontier}
      >
        <Card type={'pricing'}>
          {moneyBackGuaranteed && <div className={'moneyGuarenteed'}></div>}
          <div className="home__packagesSection__packageCard">
            <div className="home__packagesSection__packageCard__headerDiv">
              <div className="home__packagesSection__packageCard__packageTitle">
                {packageData.title}
              </div>
              <div className="home__packagesSection__packageCard__packagePrice">
                {packageData.price}
              </div>
              <div className="home__packagesSection__packageCard__packagePaymentDate">
                {packageData.payment}
              </div>
            </div>
            <div className="home__packagesSection__packageCard__stroke" />
            <div className="home__packagesSection__packageCard__descriptionDiv">
              <div className="home__packagesSection__packageCard__packageDescription">
                {packageData.highlights.map((highlight, index) => {
                  return (
                    <div
                      data-toggle="tooltip"
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
                text={'Details'}
                sizeName={'default'}
              />
              <Button
                v-if={!isHovered}
                type={'ghost'}
                text={'Details'}
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
      <div id={'packages-section'} className="home__packagesSection">
        <div className="container">
          <div className="home__packagesSection__packagesTitle">{title}</div>
          <div className="home__packagesSection__packagesSubTitle">
            {subtitle}
          </div>
          <div className="row home__packagesSection__row">
            <div className="col-md-4">
              {this.renderPackageCard(packagesData[0])}
            </div>
            <div className="col-md-4">
              {this.renderPackageCard(packagesData[1], true)}
            </div>
            <div className="col-md-4">
              {this.renderPackageCard(packagesData[2])}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
