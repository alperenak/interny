import React, { useState } from 'react'

import styles from './style.scss';

export default function Activity({
  items,
  showLogs,
  selectedId,
  setSelectedId,
  commentMode,
  setCommentMode,
  setterText,
  deleteComment,
  setSelectedFiles,
  user,
  userType,
}) {

  if (typeof items === 'undefined') return <></>;

  const timeSince = (date) => {

    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return (new Date(date)).toLocaleDateString();
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return (new Date(date)).toLocaleDateString();
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return (new Date(date)).toLocaleDateString();
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  return items.map((v, i) => {

    if (v.type === 'log' && !showLogs) return;

    if (v.type === 'comment') {
      return (
        <div className={styles.SCSContainer} key={i}>
          <div className={styles.SCSProfileArea}>
            <img
              src={v.author.avatar} />
          </div>
          <div className={styles.SCSTextAreaContainer}>
            <div className={styles.SCSCommentTextArea}>
              <div>
                <span>{v.body}</span>
                <div v-if={v.files.length > 0} className={styles.SCSFileArea}>
                  {(Array.isArray(v.files) && v.files.length > 0) && (
                    <>
                      {v.files.map((q, i) => (
                        <a href={q.key} key={i} className={styles.SCSFile}>
                          {q.name}
                        </a>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.bottomBar}>
              <div>
                <span v-if={userType == 'employer' || v.author.id === user.id} className={styles.spnBtn} onClick={() => {
                  if (commentMode === 'CREATE' || commentMode === 'EDIT' || selectedId != v.id) {
                    setCommentMode('DELETE')
                    setSelectedId(v.id);
                  }
                  else {
                    setCommentMode('CREATE');
                    deleteComment(v);
                  };
                }}>{commentMode === 'DELETE' && selectedId === v.id ? 'Are you sure?' : 'delete'}</span>
                <span v-if={v.author.id === user.id} className={styles.spnBtn} onClick={() => {
                  if (commentMode === 'CREATE' || commentMode === 'DELETE' || selectedId != v.id) {
                    setCommentMode('EDIT');
                    setSelectedId(v.id);
                    setterText(v.body);
                    setSelectedFiles(v.files || []);
                  } else {
                    setSelectedId(null);
                    setCommentMode('CREATE');
                    setterText('')
                    setSelectedFiles([])
                  }
                }}>
                  {commentMode == 'EDIT' && selectedId == v.id ? 'cancel edit' : 'edit'}
                </span>
              </div>
              <div>
                <span>{timeSince((new Date(v.createdAt)).getTime())}</span>
              </div>
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
