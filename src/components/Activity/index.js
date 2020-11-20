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
  showLogFunc
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

	return(
		<>
			<div className={"TaskDetail__logsArea__logsHeader"}>
				<h3>Comments</h3>
			</div>
			{items.filter(i => i.type == "comment").map((v, i) => {
				return(
					<div className={"SCSContainer"} key={i}>
			  		<div className={"SCSProfileArea"}>
			  		  <img
			  			src={v.author.avatar} />
			  		</div>
			  		<div className={"SCSTextAreaContainer"}>
			  		  <div className={"SCSCommentTextArea"}>
			  			<div>
			  			  <span>{v.body}</span>
			  			  <div v-if={v.files.length > 0} className={"SCSFileArea"}>
			  				{(Array.isArray(v.files) && v.files.length > 0) && (
			  				  <>
			  					{v.files.map((q, i) => (
			  					  <a href={q.key} key={i} className={"SCSFile"}>
			  						{q.name}
			  					  </a>
			  					))}
			  				  </>
			  				)}
			  			  </div>
			  			</div>
			  		  </div>
			  		  <div className={"bottomBar"}>
			  			<div>
			  			  <span v-if={userType == 'employer' || v.author.id === user.id} className={"spnBtn"} onClick={() => {
			  				if (commentMode === 'CREATE' || commentMode === 'EDIT' || selectedId != v.id) {
			  				  setCommentMode('DELETE')
			  				  setSelectedId(v.id);
			  				}
			  				else {
			  				  setCommentMode('CREATE');
			  				  deleteComment(v);
			  				};
			  			  }}>{commentMode === 'DELETE' && selectedId === v.id ? 'Are you sure?' : 'delete'}</span>
			  			  <span v-if={v.author.id === user.id} className={"spnBtn"} onClick={() => {
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
				);
			})}
			<div class="TaskDetail__logsArea__buttonDiv">
				<button type={'button'} className={"TaskDetail__logsArea__logsOpenButton"} onClick={() => showLogFunc()}>
					{showLogs ? (
						"Hide Logs"
					):(
						"Show Logs"
					)}
				</button>
			</div>
			{showLogs ? (
				<>
				<div className={"TaskDetail__logsArea__logsHeader"}>
					<h3>Logs</h3>
				</div>
				{items.filter(i => i.type == "log").map((v, i) => {
					return(
						<div onClick={() => setOpen(true)} className={"SCSContainer"} key={i}>
						<div className={"SCSTextAreaContainer"} style={{"max-width":"100%"}}>
						  <div className={"SCSTextArea"}>
							<span>{v.text}</span>
						  </div>
						</div>
					  </div>
					);
				})}
				</>
			):("")}


		</>
	);

}
