import React, { Component } from 'react';
import styles from './style.scss';

// Components
import Button from '../../components/Button';
import Card from '../../components/Card';

const PACKAGES_DATA = [
  {
    id: 'packageOne',
    title: 'E-LEARNING',
    price: '$29.99',
    payment: 'per 4 Weeks per 10 Interns',
    highlights: [
      {
        heading: 'Company Content',
        description:
          'You can share your e-learning content owned by your company with your interns by using INTERNY E-Learning infrastructure during the internship period.',
      },
      {
        heading: 'INTERNY Content',
        description:
          'You can support the development of your interns by using INTERNY E-Learning content.',
      },
      {
        heading: 'E-Learning Analytics',
        description:
          'INTERNY E-Learning contents are analyzed using artificial intelligence. With E-Learning Analytics, you can follow the progress of your interns and evaluate your interns in detail.',
      },
    ],
  },
  {
    id: 'packageTwo',
    title: 'BUSINESS',
    price: '$49.99',
    payment: 'per 15 Interns',
    highlights: [
      {
        heading: 'Intern Pool',
        description:
          'From INTERNY global intern pool, you can view detailed candidates who do not apply to you but think they are suitable for you.',
      },
      {
        heading: 'Competency Analytics Results',
        description:
          'In a detailed search, you can find the most potential candidates wherever they are in the world. Also, you observe the results of 15 core competencies that international organizations value the most now and for the future.',
      },
      {
        heading: 'InMessage',
        description:
          'You can contact the intern candidates that you think are suitable for your company through INTERNY messaging service.',
      },
    ],
  },
  {
    id: 'packageThree',
    title: 'HIRING',
    price: '$49.99',
    payment: 'per 5 Interns',
    highlights: [
      {
        heading: 'Intern Pool',
        description:
          'You can view detailed employee candidates from the Global Intern Pool who have not applied for you but that he/she can be suitable for you.',
      },
      {
        heading: 'Workforce Analytics Results',
        description:
          'By viewing the skills of doing business during the internship period in the detailed search, you can find the employee candidates with the highest potential anywhere in the world.',
      },
      {
        heading: 'Competency Analytics Results',
        description:
          'You can find the most potential employee candidates wherever they are in the world in a detailed search. Besides, you observe the results of the 15 core competencies that international organizations value most now and for the future.',
      },
      {
        heading: 'InMessage',
        description:
          'You can contact employee candidates whom you think are suitable for your company through INTERNY messaging service.',
      },
    ],
  },
];

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
          {moneyBackGuaranteed && (
            <div className={'moneyGuarenteed'}>
            </div>
          )}
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
                    <div data-toggle="tooltip" title={highlight.description}>
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
    return (
      <div id={'packages-section'} className="home__packagesSection">
        <div className="container">
          <div className="home__packagesSection__packagesTitle">
            See the Business Packages
          </div>
          <div className="home__packagesSection__packagesSubTitle">
            Click to see detail of packages
          </div>
          <div className="row home__packagesSection__row">
            <div className="col-md-4">
              {this.renderPackageCard(PACKAGES_DATA[0])}
            </div>
            <div className="col-md-4">
              {this.renderPackageCard(PACKAGES_DATA[1], true)}
            </div>
            <div className="col-md-4">
              {this.renderPackageCard(PACKAGES_DATA[2])}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
