import React, { useState } from 'react'

import styles from './style.scss';

export default function Activity({ items, showLogs }) {

  if (typeof items === 'undefined') return <></>;

  const [open, setOpen] = useState(false);

  return items.map((v, i) => {
    if (v.type === 'log' && !showLogs) return;

    if (v.type === 'comment') {
      return (
        <div onClick={() => setOpen(true)} className={styles.SCSContainer} key={i}>
          <div className={styles.SCSProfileArea}>
            <img
              src={v.author.avatar} />
          </div>
          <div className={styles.SCSTextAreaContainer}>
            <div className={styles.SCSCommentTextArea}>
              <span>{v.body}</span>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div onClick={() => setOpen(true)} className={styles.SCSContainer} key={i}>
        <div className={styles.SCSProfileArea}>
        </div>
        <div className={styles.SCSTextAreaContainer}>
          <div className={styles.SCSTextArea}>
            <span>{v.text}</span>
          </div>
        </div>
      </div>
    )
  });

}
