import React, { useState, createRef, useEffect } from 'react'

import styles from './style.scss';
import TextareaAutosize from 'react-autosize-textarea';
import attachment from '../../icons/attachment.svg';
import store from '../../store';


function buildFileSelector(callback = () => { }, onCancel = () => { document.body.onfocus = null; }) {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('multiple', 'multiple');
  fileSelector.onchange = (e) => {
    callback(e.target.files)
  }
  document.body.onfocus = onCancel;
  return fileSelector;
}

export default function SendCommentShortcut({
  user,
  taskId,
  sendComment,
  open = false,
  textA,
  setterText,
  setOpen,
  loading,
  setLoading,
  selectedFiles = [],
  setSelectedFiles,
  commentMode = 'CREATE',
  setCommentMode,
}) {

  const [text, setText] = useState(textA);
  const [areYouSure, setAreYouSure] = useState(false);

  const buttonClass = loading || !(text.length > 0) ? `${styles.SCSTool} ${styles.SCSToolButtonBlue} ${styles.disabled}` : `${styles.SCSTool} ${styles.SCSToolButtonBlue}`;
  const toolsClass = loading ? `${styles.SCSTool} ${styles.disabled}` : `${styles.SCSTool}`;

  const _textArea = createRef();

  useEffect(() => {
    if (open && _textArea.current && !(text.length > 0) && !(commentMode === 'DELETE')) {
      _textArea.current.focus()
      return () => { }
    };
    return;
  }, [open])

  const onUpload = async (v, i) => {
    try {
      let uploadData = await store.uploadCommentFileType(v.type);
      let res = await store.uploadComment(uploadData.url, v);
      if (res) {
        v.key = await store.uploadCommentKey(uploadData.key);
        v.uri = v.key;
        return Promise.resolve(v);
      }
    } catch (error) {
      return Promise.resolve(null);
    }
  }

  const onFileUpload = async (files) => {
    files = Array.from(files);
    files = files.filter((v) => {
      let filtered = [];
      filtered = selectedFiles.filter(sv => {
        return sv.name === v.name;
      })
      if (filtered.length > 0) return false;
      return true;
    });

    let last = files.concat(selectedFiles);

    (Promise.all(last.map((v, i) => onUpload(v, i)))).then((data) => {
      last = data;
    });


    setSelectedFiles(last);
    setLoading(false);
  }

  const onCancelSelect = () => {
    if (!selectedFiles.length)
      setLoading(false);
    document.body.onfocus = null;
  }

  const fileSelector = buildFileSelector(onFileUpload, onCancelSelect);

  const FileSelect = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setterText(text)
    fileSelector.click();
  };

  const sender = async (e) => {
    e.preventDefault();
    if (loading || !(text.length > 0)) return;
    setLoading(true);
    sendComment(taskId, textA || text);
  }

  const removeSelectedFile = (file) => {
    const not_this = selectedFiles.filter((v) => !Object.is(v, file));
    setSelectedFiles(not_this)
  }

  return (
    <div
      onClick={() => {
        if (!loading && !open) {
          setOpen(true)
        };
      }}
      className={styles.SCSContainer}>
      {
        loading && (
          <div className={styles.loadingIndicator}>
            <span>Loading...</span>
          </div>
        )
      }
      <div className={styles.SCSProfileArea}>
        <img
          src={user.logo || user.avatar} />
      </div>
      <div className={styles.SCSTextAreaContainer}>
        <div className={styles.SCSTextArea}>
          <div>
            <TextareaAutosize ref={_textArea} placeholder={commentMode === 'CREATE' ? 'Write a comment' : (commentMode === 'EDIT' ? 'Editing' : (commentMode === 'DELETE' ? 'Click this area to cancel delete mode' : ''))} defaultValue={text} onClick={() => commentMode === 'DELETE' && setCommentMode('CREATE')} onChange={(v) => setText(v.target.value)} />
            <div v-if={open} className={styles.SCSToolsArea}>
              <label onClick={FileSelect} className={toolsClass} v-if={!(commentMode === 'DELETE')}>
                <img src={attachment} />
              </label>
              <label className={buttonClass} onClick={sender} v-if={!(commentMode === 'DELETE')}>
                <span>{commentMode === 'CREATE' ? 'Send' : 'Save'}</span>
              </label>
            </div>
            <div v-if={selectedFiles.length > 0} className={styles.SCSFileArea}>
              {(Array.isArray(selectedFiles) && selectedFiles.length > 0) && (
                <>
                  <div title={areYouSure ? 'Yes, i\'m sure.' : 'Click to remove all files'} className={`${styles.SCSFile} ${styles.removeAllFiles}`} onClick={() => {
                    if (areYouSure)
                      setSelectedFiles([])
                    else
                      setAreYouSure(true)
                  }}>
                    {areYouSure ? 'Are you sure?' : 'Remove All'}
                  </div>
                  {selectedFiles.map((v, i) => (
                    <div key={i} title={'Click to remove this file'} className={styles.SCSFile} onClick={() => removeSelectedFile(v)}>
                      {v.name}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
