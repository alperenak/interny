import React, { Component } from 'react';
import styles from "./style.scss"

import ScrollContainer from 'react-indiana-drag-scroll'

//
import { Search, Intern, AllInterns } from './sub-components';

export default class InternList extends Component {

  render() {
    const { userType = 'intern' } = this.props;
    if (userType !== 'employer') return (<></>);

    return (
      <div className={styles.container}>
        <Search {...this.props} />
        <AllInterns {...this.props} />
        <div className={styles.verticalHR} />
        <ScrollContainer className={styles.internList}>
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