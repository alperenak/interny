import React, { Component } from 'react'
import styles from '../../style.scss'

export class Search extends Component {
  render() {
    return (
      <div className={styles.searchArea}>
        <input type="text" className={styles.searchInput} size="1" placeholder={'search'} />
      </div>
    )
  }
}
