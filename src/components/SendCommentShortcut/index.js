import React, { useState, createRef } from 'react'

import styles from './style.scss';
import TextareaAutosize from 'react-autosize-textarea';
import attachment from "../../icons/attachment.svg";


export default function SendCommentShortcut({ user }) {

  const [open, setOpen] = useState(false);

  const onFileUpload = async (files) => {
    console.log('runned', files);
  };


  return (
    <div onClick={() => setOpen(true)} className={styles.SCSContainer}>
      <div className={styles.SCSProfileArea}>
        <img
          src={user.logo} />
      </div>
      <div className={styles.SCSTextAreaContainer}>
        <div className={styles.SCSTextArea}>
          <div>
            <TextareaAutosize placeholder="Write a comment" />
            <div v-if={open} className={styles.SCSToolsArea}>
              <input
                id={"file-input-id"}
                hidden={true}
                accept={"image/*"}
                type={"file"}
                aria-label={""}
                onChange={(e) => onFileUpload(e.target.files)}
              />
              <label htmlFor="file-input-id" className={styles.SCSTool}>
                <img src={attachment} />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
