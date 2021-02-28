import React, { Component, Fragment } from "react";

/*** Components ***/
import Card from "../../components/Card";

/*** Utils ***/
import store from "../../store";
import { getCookie } from "../../utils/cookie";
import { formButtons, formItems } from "./formItems";
import { formJobData, onJobFormChange } from "../../utils/functions";

/*** Styles ***/
import styles from "./myjobs.scss";

import WFA from "../../components/WFA";

import "../ReferrenceLetter/referrenceLetter.scss";

// Components
import Input from "../../components/Input";
import FooterAlternative from "../../components/FooterAlternative";

// Assets
import image from "../../assets/company-ims_wait.png";

/*** Icons ***/
import Button from "../../components/Button";
import addIcon from "../../icons/add-circular-outlined-white-button.svg";
import Form from "../../components/Form";
import LoadingModal from "../../components/LoadingModal";

class MyJobs2 extends Component {
  state = {
    appliedPosts: [],
    savedPosts: [],
    acceptedPosts: [],
    pendingPosts: [],
    postHistory: [],
    activePosts: [],
    passivePosts: [],
    jobsForTask: [],
    page: 0,
    internPostPageSource: [
      {
        key: "ApplicationHistory",
        value: "Application History",
        selected: true,
        to: "/myJobs",
        onChange: () => this.setState({ page: 0 }),
      },
      {
        key: "SavedJobs",
        value: "Saved Jobs",
        selected: false,
        to: "/myJobs",
        onChange: () => this.setState({ page: 1 }),
      },
      {
        key: "AcceptedJobs",
        value: "Accepted Jobs",
        selected: false,
        to: "/myJobs",
        onChange: () => this.setState({ page: 2 }),
      },
      {
        key: "PendingJobs",
        value: "Pending Jobs",
        selected: false,
        to: "/myJobs",
        onChange: () => this.setState({ page: 3 }),
      },
    ],
    employerPostPageSource: [
      {
        key: "PostHistory",
        value: "Post History",
        selected: true,
        to: "/myJobs",
        onChange: () => this.setState({ page: 0 }),
      },
      {
        key: "ActivePosts",
        value: "Active Posts",
        selected: false,
        to: "/myJobs",
        onChange: () => this.setState({ page: 1 }),
      },
      {
        key: "PassivePosts",
        value: "Passive Posts",
        selected: false,
        to: "/myJobs",
        onChange: () => this.setState({ page: 2 }),
      },
    ],
    processing: true,
    redirected: false,
    error: null,
  };

  redirectControl(props) {
    const { children = "", is = true } = props;

    if ((this.state.redirected !== false) === is) {
      // when redirected is true
      return <>{children}</>;
    } else return <></>;
  }

  jobIDSelector = (selectedJOBId) => {
    if (!this.props.selectJobID) return;

    const callbackMethod = () => {
      this.props.history.push("/mytasks");
    };

    this.props.selectJobID(selectedJOBId, callbackMethod);
  };

  async componentDidUpdate() {
    let userType = getCookie("user");
    if (userType === "employer") {
      if (
        this.state.redirected !== false &&
        !(this.state.jobsForTask.length > 0)
      )
        await this.getJobsForTask();
    }
  }

  async componentDidMount() {
    // clear location state
    if (this.props.location.state && this.props.location.state.redirectInfo) {
      const redirected = this.props.location.state.redirectInfo;
      this.setState({ redirected });
      let state = { ...this.props.location.state };
      delete state.redirectInfo;
      this.props.history.replace({ ...this.props.location, state });
    }
    //

    let userType = getCookie("user");
    if (userType === "intern") {
      await this.getSavedPosts();
      await this.getPosts();
    } else if (userType === "employer") {
      await this.getJobsForTask();
      this.setState({ processing: false });
    }
  }

  fillPosts = (pst, buttons) => {
    let city = pst?.jobLocation?.city ? pst?.jobLocation?.city : "";
    let country = pst?.jobLocation?.country ? pst?.jobLocation?.country : "";
    let location = pst?.jobLocation
      ? `${country}${country && city ? " - " : ""}${city}`
      : "";

    let currentDate = new Date();
    let startDate = new Date(pst.startDate).toLocaleDateString();
    /*         let endDate = new Date(pst.endDate).toLocaleDateString();*/
    let canStart = false;
    if (startDate > currentDate) {
      canStart = true;
    }

    return {
      id: pst.id,
      date: pst.age === "0" ? "Today" : pst.age + " days ago",
      header: pst.Employer.legalName,
      company: pst.position,
      image: pst.Employer.logo,
      location: `${location}`,
      buttons: buttons,
      description: pst.description,
      note: pst.views ? pst.views : "0 view",
      isStarted: pst.isStarted,
      isFinished: pst.isFinished,
      canStart,
    };
  };

  async getSavedPosts() {
    let savedPostsRes = await store.getSavedPost(getCookie("user_id"));
    let savedPosts = savedPostsRes.map((pst) => {
      return this.fillPosts(pst, this.savedButtons(pst.id));
    });
    this.setState({ savedPosts, processing: false });
  }

  async getPosts() {
    let userId = getCookie("user_id");
    let appliedPostsRes = await store.getAppliedPost(userId);
    let appliedPosts = appliedPostsRes.map((pst) => {
      return this.fillPosts(pst.Job, this.appliedButtons(pst.id));
    });
    let acceptedPosts = appliedPostsRes
      .filter((post) => post.isAccepted)
      .map((pst) => {
        return this.fillPosts(
          pst.Job,
          this.acceptedButtons(userId, pst.Job.id)
        );
      });
    let pendingPosts = appliedPostsRes
      .filter((post) => post.isPending)
      .map((pst) => {
        return this.fillPosts(pst.Job, this.pendingButtons(pst.id));
      });
    this.setState({
      appliedPosts,
      acceptedPosts,
      pendingPosts,
      processing: false,
    });
  }

  //
  async getJobsForTask() {
    let id = getCookie("user_id");
    let postsRes = await store.getEmployerPostsStarted(id);

    let jobsForTask = postsRes.map((pst) => {
      return this.fillPosts(pst, this.goBoardButton(pst));
    });

    this.setState({ jobsForTask });
  }
  goBoardButton = (pst) => [
    {
      type: "primary",
      text: "Go to board",
      sizeName: "small",
      width: "85px",
      onButtonClick: () => this.jobIDSelector(pst.id),
    },
  ];

  async getJobPosts() {
    let id = getCookie("user_id");
    let postsRes = await store.getEmployerPosts(id);
    let activePostsRes = await store.getActivePosts(id);
    let passivePostsRes = await store.getPassivePosts(id);

    let posts = postsRes.map((pst) => {
      if (pst.isSuspended)
        return this.fillPosts(pst, this.historyButtonsPassive(pst));
      else return this.fillPosts(pst, this.historyButtonsActive(pst));
    });
    let activePosts = activePostsRes.map((pst) => {
      return this.fillPosts(pst, this.historyButtonsActive(pst));
    });
    let passivePosts = passivePostsRes.map((pst) => {
      return this.fillPosts(pst, this.historyButtonsPassive(pst));
    });
    this.setState({
      postHistory: posts,
      activePosts: activePosts,
      passivePosts: passivePosts,
      processing: false,
    });
  }

  appliedButtons = (id) => [
    {
      type: "primary",
      text: "Withdraw",
      sizeName: "small",
      width: "85px",
      onButtonClick: async () => {
        let res = await store.withdrawPost(getCookie("user_id"), id);
        if (res.status && res.status === 203) {
          await this.getPosts();
        }
      },
    },
  ];
  savedButtons = (id) => [
    {
      type: "ghost",
      text: "Remove Post",
      sizeName: "small",
      width: "85px",
      onButtonClick: async () => {
        let res = await store.removePost(getCookie("user_id"), id);
        if (res.status && res.status === 203) {
          await this.getSavedPosts();
        }
      },
    },
  ];
  pendingButtons = (id) => [
    {
      type: "primary",
      text: "Withdraw",
      sizeName: "small",
      width: "100px",
      onButtonClick: async () => {
        let res = await store.withdrawPost(getCookie("user_id"), id);
        if (res.status && res.status === 203) {
          await this.getPosts();
        }
      },
    },
    {
      type: "ghost",
      disabled: true,
      text: "Pending...",
      sizeName: "small",
      width: "100px",
    },
  ];
  acceptedButtons = (userId, jobId) => [
    {
      type: "primary",
      text: "Start Internship",
      sizeName: "small",
      width: "150px",
      onButtonClick: async () => {
        await store.startInternship(userId, jobId);
        window.location.pathname = "/myTasks";
      },
    },
  ];

  historyButtonsPassive = (pst) => [
    {
      type: pst.isSuspended ? "primary" : "ghost",
      text: pst.isSuspended ? "Activate" : "Suspend",
      sizeName: "small",
      width: "85px",
      onButtonClick: async () => {
        if (pst.isSuspended) await store.updateStatusOfPost(pst.id, "active");
        else await store.updateStatusOfPost(pst.id, "passive");
        await this.getJobPosts();
      },
    },
  ];
  historyButtonsActive = (pst) => [
    {
      type: pst.isSuspended ? "primary" : "ghost",
      text: pst.isSuspended ? "Activate" : "Suspend",
      sizeName: "small",
      width: "85px",
      onButtonClick: async () => {
        if (pst.isSuspended) await store.updateStatusOfPost(pst.id, "active");
        else await store.updateStatusOfPost(pst.id, "passive");
        await this.getJobPosts();
      },
    },
    {
      type: pst.isSuspended ? "primary" : "ghost",
      text: pst.isStarted ? "End Internship" : "Start Internship",
      sizeName: "small",
      width: "85px",
      onButtonClick: async () => {
        if (pst.canStart && !pst.isStarted)
          return this.setState({
            error: {
              title: "Error Title Here",
              description: "You can't do that!",
            },
          });

        if (pst.isStarted) await store.updateStatusOfPost(pst.id, "finish");
        else await store.updateStatusOfPost(pst.id, "start");
      },
    },
  ];

  onCreateClick = async () => {
    this.props.createModal({
      header: "Create Job",
      content: this.renderCreatePostForm,
    });
  };

  renderCreatePostForm = () => {
    return (
      <Form
        formItems={formItems()}
        formButtons={formButtons()}
        formDataFormatter={formJobData}
        onFormChange={onJobFormChange}
        onSubmit={this.onCreateFormSubmit}
        onCancel={this.props.closeModal}
      />
    );
  };

  onCreateFormSubmit = async (payload) => {
    const internshipLength = parseInt(payload.internshipLength.split(" ")[0]);
    const addedDays = internshipLength * 7;

    const endDate = new Date(payload.startDate);

    endDate.setDate(endDate.getDate() + addedDays);

    payload.endDate = endDate;

    await store.createPost(payload);
    this.props.closeModal();
    await this.getJobPosts();
  };

  renderNoPermission = ({ title, description }) => {
    return (
      <div
        className={"MyJobs__modal_wrapper"}
        onClick={(e) => {
          this.setState({ error: null });
        }}
      >
        <div
          className={"MyJobs__modal_wrapper__modal"}
          onClick={(e) => {
            e.stopPropaganda();
          }}
        >
          <div className={"title"}> {title} </div>
          <div className={"description"}> {description} </div>

          <div className={"button_wrapper"}>
            <button
              onClick={(e) => {
                this.setState({ error: null });
              }}
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let {
      appliedPosts,
      savedPosts,
      page,
      acceptedPosts,
      pendingPosts,
      postHistory,
      jobsForTask,
      activePosts,
      passivePosts,
      processing,
      error,
    } = this.state;
    let userType = getCookie("user");

    //
    const RedirectControl = this.redirectControl.bind(this);
    const cardText = (text) =>
      this.state.redirected !== false ? "please choose a job" : text;
    console.log(jobsForTask);
    return (
      <div className="pageWrapper">
        <div className={"referrenceLetter"}>
          <LoadingModal text="Loading" v-if={this.state.processing} />
          <div class="container">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                className="referrenceLetter__image"
                src={image}
                alt="Tasks"
              />
            </div>
            <div className={"referrenceLetter__modal"}>
              <div class="row">
                <div class="col-md-12">
                  <div className={"referrenceLetter__header"}>Tasks </div>
                  <div className={"referrenceLetter__description"}>
                    Welcome to the Interny Management System: iMS™. There is no
                    ongoing internship process. Click to post an internship.
                  </div>
                </div>
                <div class="col-md-12">
                  <div className={"referrenceLetter__buttonWrapper"}>
                    <Button
                      type="secondary"
                      text="Learn More"
                      to={"/internyBusiness"}
                      textClass="referrenceLetter__buttonWrapper__text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterAlternative />
      </div>
    );
    /*
    return (
		<div className={"MyJobs"}>
			<div class="container">
				<div class="row">
					<div class="col-md-12">

						<Fragment v-if={userType === 'employer'}>
								<Card
									header={{ text: cardText('Post History'), position: 'center' }}
									v-if={page === 0}
									multiple={false}
									type={'jobPost'}
									RedirectControl={this.redirectControl.bind(this)}
									posts={jobsForTask}
								/>

						</Fragment>
					</div>
				</div>
			</div>
			{error && this.renderNoPermission(error)}
			{processing && <LoadingModal text='Loading' />}
		</div>
    );
    */
  }
}

export default MyJobs2;
