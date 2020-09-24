import React, { useState } from 'react'

import styles from './style.scss';

export default function SendCommentShortcut({ user }) {

  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(true)} className={styles.SCSContainer}>
      <div className={styles.SCSProfileArea}>
        <img
          src={user.logo} />
      </div>
      <div className={styles.SCSTextAreaContainer}>
        <div className={styles.SCSTextArea}>
          <textarea placeholder="yorum yaz"></textarea>
        </div>
        <div className={styles.SCSToolsArea}>
          <div></div>
        </div>
      </div>
    </div>
  )
}
