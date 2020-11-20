import React, { Component, Fragment } from "react";

/*** Components ***/
import Button from "../../../Button";

/*** Styles ***/
import styles from "./jobPost.scss";

/*** Icons ***/
import locationIcon from "../../../../icons/location.svg";
import { Link } from "react-router-dom";
import { getCookie } from "../../../../utils/cookie";

class JobPost extends Component {
  renderPostButtons(buttons) {
    return (
      <div className={`${"postButton"}`}>
        {buttons.map((btn, i) => {
          return (
            <Button
              key={i}
              disabled={btn.disabled}
              hoverIcon={btn.hoverIcon}
              icon={btn.icon}
              loading={btn.loading}
              iconAutoWidth={btn.iconAutoWidth}
              iconPosition={btn.iconPosition}
              onButtonClick={btn.onButtonClick}
              sizeName={btn.sizeName}
              responsive={btn.responsive}
              text={btn.text}
              type={btn.type}
              width={btn.width}
              to={btn.to}
              hoverText={btn.hoverText ? btn.hoverText : null}
            />
          );
        })}
      </div>
    );
  }

  renderPost = (pst, multiple) => {
    const { selectJob, RedirectControl = (props) => props.is === false ? props.children : <></> } = this.props;
    let link = getCookie('token') ? `/postdetail/${pst.id}` : 'signup';
	return (
		<Fragment>
			<div className={`${multiple ? "multiplePost" : "singlePost"}`}>
				<div class="row">
					<RedirectControl is={false}>
						<div class="col-md-3">
							<Link to={link} className={"itemImage"}>
					    		<img src={pst.image ? pst.image : ""} alt={"image"} />
					 		</Link>
						</div>
						<div class="col-md-6">
							<Link
								to={link}
								className={"postHeaderWrapper"}
					  		>
								<div className={"postHeader"}>{pst.header}</div>
					  		</Link>
							<Link to={link} className={"postCompany"}>
					  			{pst.company}
					  	  	</Link>
							<a href="#" onClick={() => selectJob(pst.id)} v-if={pst.location} className={"postLocation"}>
								<img src={locationIcon} alt={"location"} />
								{pst.location}
							</a>
							<Link to={link} className={"postNote"}>
					  			{pst.note}
					  	  	</Link>
						</div>
						<div class="col-md-3">
							{pst.buttons && this.renderPostButtons(pst.buttons)}
						</div>
					</RedirectControl>
				</div>
				<RedirectControl>
					<div class="row">
						<div class="col-md-3">
							<a href="#" onClick={() => selectJob(pst.id)} className={"itemImage"}>
		  						<img src={pst.image ? pst.image : ""} alt={"image"} />
		  					</a>
						</div>
						<div class="col-md-6">
							<a
								href="#"
								onClick={() => selectJob(pst.id)}
								className={"postHeaderWrapper"}
							>
								<div className={"postHeader"}>{pst.header}</div>

							</a>
							<a href="#" onClick={() => selectJob(pst.id)} className={"postCompany"}>
						   		{pst.company}
						 	</a>
							<a href="#" onClick={() => selectJob(pst.id)} v-if={pst.location} className={"postLocation"}>
								<img src={locationIcon} alt={"location"} />
								{pst.location}
							</a>
							<a href="#" onClick={() => selectJob(pst.id)} className={"postNote"}>
								{pst.description}
							</a>
							<a href="#" onClick={() => selectJob(pst.id)} className={"postNote"}>
								{pst.note}
							</a>
						</div>
						<div class="col-md-3">
							<div className={"postDate"}>{pst.date}</div>
							{pst.buttons && this.renderPostButtons(pst.buttons)}


						</div>
					</div>
				</RedirectControl>

			</div>
		</Fragment>
	);
  };

  renderEmpty = () => {
    let { posts } = this.props;

    if (posts.length < 1) {
      return <div className={"noJob"}> <span>There is no job post for you...</span> </div>
    }
    return;
  }

  render() {
    let { posts } = this.props;
    return (
      <Fragment>
        {posts.map((post, i) => {
          return (
			<div class="col-md-12">
				<div key={i} className={`${"jobPost2"}`}>
				  {this.renderPost(post, posts.length > 1)}
				</div>
			</div>

          );
        })}
        {this.renderEmpty()}
      </Fragment>
    );
  }
}

export default JobPost;
