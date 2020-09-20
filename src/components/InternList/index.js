import React, { Component } from 'react';
import styles from "./style.scss"

import ScrollContainer from 'react-indiana-drag-scroll'

//
import { Search, Intern } from './sub-components';

export default class InternList extends Component {

  render() {
    const { userType = 'intern' } = this.props;
    if (userType !== 'employer') return (<></>);

    return (
      <div className={styles.container}>
        <Search />
        <div className={styles.verticalHR} />
        <ScrollContainer className={styles.internList}>
          {/* FOR TEST */}
          {
            this.props.internList.map((internInfo, index) => {
              return <Intern key={index} internInfo={internInfo} {...this.props} />
            })
          }
        </ScrollContainer >
      </div>
    );
  }
}