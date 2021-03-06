import React, { Component } from 'react'
import styles from '../../style.scss'

export class Search extends Component {
  render() {
    const { searchInInternList = (v) => null } = this.props;
    return (
      <div className={"searchArea"}>
        <input onChange={({ target }) => searchInInternList(target.value)} type="text" className={"searchInput"} size="1" placeholder={'search'} />
      </div>
    )
  }
}
