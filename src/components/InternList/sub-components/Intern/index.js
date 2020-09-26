import React, { Component } from 'react'
import styles from '../../style.scss'

export class Intern extends Component {
  render() {
    const { internInfo = {}, allCheck, selectedInterns = [] } = this.props;

    let selectedFilter = selectedInterns.filter((id) => id === internInfo.id);
    let selected = selectedFilter.length > 0;

    const activeClass = ((selected || allCheck) ? styles.internActive : '');

    return (
      <div className={`${styles.intern} ${activeClass}`} onClick={() => {
        this.props.toggleIntern(internInfo)
      }}>
        <div className={styles.internImage}>
          <div className={styles.noSelectImage} />
          <img src={internInfo.avatar} />
        </div>
        <div className={styles.internName}>
          <span>{`${internInfo.name} ${internInfo.surname}`}</span>
        </div>
      </div>
    )
  }
}
