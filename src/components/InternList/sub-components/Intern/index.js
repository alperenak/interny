import React, { Component } from 'react'
import styles from '../../style.scss'

export class Intern extends Component {
  render() {
    const { internInfo = {}, allCheck, selectedInterns = [] } = this.props;

    let selectedFilter = selectedInterns.filter((id) => id === internInfo.id);
    let selected = selectedFilter.length > 0;

    const activeClass = ((selected || allCheck) ? "internActive" : '');

    return (
      <div className={`${"intern"} ${activeClass}`} onClick={() => {
        this.props.toggleIntern(internInfo)
      }}>
        <div className={"internImage"}>
          <div className={"noSelectImage"} />
          <img src={internInfo.avatar} />
        </div>
        <div className={"internName"}>
          <span>{`${internInfo.name} ${internInfo.surname}`}</span>
        </div>
      </div>
    )
  }
}
