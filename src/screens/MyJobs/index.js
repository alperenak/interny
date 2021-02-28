import React, { Component, Fragment } from "react";

/*** Components ***/
import Card from "../../components/Card";

/*** Utils ***/
import store from "../../store";
import { getCookie } from "../../utils/cookie";
import { formButtons, formItems } from "./formItems";
import { formJobData, onJobFormChange } from "../../utils/functions";
import CKEditor from "react-ckeditor-component";

/*** Styles ***/
import styles from "./myjobs.scss";

/*** Icons ***/
import Button from "../../components/Button";
import addIcon from "../../icons/add-circular-outlined-white-button.svg";
import Form from "../../components/Form";
import LoadingModal from "../../components/LoadingModal";
import Input from "../../components/Input";
import { Multiselect } from "multiselect-react-dropdown";

import FooterAlternative from "../../components/FooterAlternative";

class MyJobs extends Component {
  state = {
    langs: [
      { name: "English", id: "en" },
      { name: "French", id: "it" },
      { name: "German", id: "it" },
      { name: "Portuguese", id: "it" },
      { name: "Spanish", id: "it" },
      { name: "Turkish", id: "tr" },
    ],
    compents: [
      { name: "Analytical Thinking", id: "Analytical Thinking" },
      { name: "Problem Solving", id: "Problem Solving" },
      { name: "Collaboration and Teamwork", id: "Collaboration and Teamwork" },
      { name: "Focus on Success", id: "Focus on Success" },
      { name: "Result Oriented", id: "Result Oriented" },
      { name: "Use of Technology", id: " Use of Technology" },
      { name: "Flexibility", id: "Flexibility" },
      { name: "Critical Thinking", id: "Critical Thinking" },
      { name: "Leadership", id: "Leadership" },
      { name: "Creative Thinking", id: "Creative Thinking" },
      { name: "Stress Management", id: "Stress Management" },
      { name: "Emotional Resilience", id: "Emotional Resilience" },
      { name: "Communication", id: "Communication" },
      { name: "Planning and Organization", id: "Planning and Organization" },
      { name: "Active Learning", id: "Active Learning" },
    ],
    prefLang: [],
    appliedPosts: [],
    savedPosts: [],
    acceptedPosts: [],
    pendingPosts: [],
    postHistory: [],
    activePosts: [],
    passivePosts: [],
    jobsForTask: [],
    page: 1,
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
      getCookie("user") == "company"
        ? {
            key: "PostHistory",
            value: "Post History",
            selected: true,
            to: "/myJobs",
            onChange: () => this.setState({ page: 0 }),
          }
        : {},
      {
        key: "ActivePosts",
        value: "Active",
        selected: false,
        to: "/myJobs",
        onChange: () => this.setState({ page: 1 }),
      },
      {
        key: "PassivePosts",
        value: "Passive",
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
      if (this.state.redirected !== false) {
        await this.getJobsForTask();
      } else await this.getJobPosts();
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
      width: 150,
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
      width: "fit-content",
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
  onChange = (evt) => {
    var newContent = evt.editor.getData();
    this.setState((state) => {
      state.description = newContent;
      return state;
    });
  };
  onCreateClick = async () => {
    this.props.createModal({
      size: "large",
      header: "Create Internship",
      content: this.renderCreatePostForm,
    });
  };

  renderCreatePostForm = () => {
    const self = this;
    return (
      <div class="jobCreateForm">
        <div class="row">
          <div class="col-md-6">
            <Input
              type={"select"}
              id={"internshipLength"}
              label={"Internship Length"}
              size={"full"}
              labelDescription={"Choose one below"}
              onChange={(value, slValue) => {
                this.setState({ internshipLength: slValue.key });
              }}
              placeholder={"Internship Length"}
              externalSource={[
                { key: 4, value: "4 weeks", selected: false },
                { key: 8, value: "8 weeks", selected: false },
                { key: 12, value: "12 weeks", selected: false },
              ]}
            />
          </div>
          <div class="col-md-6">
            <Input
              type={"text"}
              placeholder={`Position`}
              size={"full"}
              defaultValue={this.state.position}
              onChange={(value) => this.setState({ position: value })}
              label={"Position"}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="inputWrapper">
              <label for="">Description</label>
            </div>
            <CKEditor
              activeClass="p10"
              content={this.state.description}
              events={{
                change: this.onChange,
              }}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <Input
              type={"textarea"}
              placeholder={`Qualifications`}
              size={"full"}
              defaultValue={this.state.qualifications}
              onChange={(value) => this.setState({ qualifications: value })}
              label={"Qualifications"}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <Input
              type={"select"}
              id={"internLevel"}
              label={"Intern Level"}
              size={"full"}
              labelDescription={"Choose one below"}
              onChange={(value, slValue) => {
                this.setState({ internLevel: slValue.key });
              }}
              placeholder={"Internship Length"}
              externalSource={[
                {
                  key: "newlyGraduated",
                  value: "Newly Graduated",
                  selected: false,
                },
                {
                  key: "universityStudent",
                  value: "University Student",
                  selected: false,
                },
              ]}
            />
          </div>

          <div class="col-md-6">
            <div class="inputWrapper">
              <label for="">Preferred Language</label>
              <Multiselect
                style={{
                  searchBox: {
                    "border-radius": "12px",
                    "box-shadow": "0 6px 12px 0 rgba(215,219,252,0.55)",
                    "background-color": "#ffffff",
                    border: "1px solid #d6dfea",
                    "font-family": "Sofia Pro",
                    color: "#AFB8C3",
                    "font-size": "calc(2px + 11px)",
                    height: 50,
                  },
                }}
                options={this.state.langs} // Options to display in the dropdown
                selectedValues={this.state.prefLang} // Preselected value to persist in dropdown
                onSelect={(a) => {
                  self.setState({
                    prefLang: a,
                  });
                }} // Function will trigger on select event
                onRemove={(a) => {
                  self.setState({
                    prefLang: a,
                  });
                }} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <Input
              type={"text"}
              id={"industry"}
              placeholder={"Preferred Profession"}
              size={"full"}
              labelDescription={"Enter an Preferred Profession"}
              defaultValue={this.state.pref_prof}
              onChange={(value) => {
                this.setState({ pref_prof: value });
              }}
              label={"Preferred Profession"}
            />
          </div>

          <div class="col-md-6">
            <div class="inputWrapper">
              <label for="">Preferred Competency</label>
              <Multiselect
                style={{
                  searchBox: {
                    "border-radius": "12px",
                    "box-shadow": "0 6px 12px 0 rgba(215,219,252,0.55)",
                    "background-color": "#ffffff",
                    border: "1px solid #d6dfea",
                    "font-family": "Sofia Pro",
                    color: "#AFB8C3",
                    "font-size": "calc(2px + 11px)",
                    height: 50,
                  },
                }}
                options={this.state.compents} // Options to display in the dropdown
                selectedValues={this.state.prefComp} // Preselected value to persist in dropdown
                onSelect={(a) => {
                  self.setState({
                    prefComp: a,
                  });
                }} // Function will trigger on select event
                onRemove={(a) => {
                  self.setState({
                    prefComp: a,
                  });
                }} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <Input
              type={"select"}
              id={"applicationType"}
              label={"Application Type"}
              size={"full"}
              labelDescription={"Choose one below"}
              onChange={(value, slValue) => {
                this.setState({ applicationType: slValue.key });
              }}
              placeholder={"Application Type"}
              externalSource={[
                { key: "local", value: "Local", selected: false },
                { key: "global", value: "Global", selected: false },
              ]}
            />
          </div>
          <div class="col-md-6">
            <Input
              type={"select"}
              id={"gpa"}
              label={"Preferred GPA"}
              size={"full"}
              labelDescription={"Choose one below"}
              onChange={(value, slValue) => {
                this.setState({ gpa: slValue.key });
              }}
              placeholder={"Preferred GPA"}
              externalSource={[
                { key: "-", value: "-" },
                { key: "2/4", value: "2/4 or Higher" },
                { key: "2.5/4", value: "2.5/4 or Higher" },
                { key: "3/4", value: "3/4 or Higher" },
                { key: "3.5/4", value: "3.5/4 or Higher" },
              ]}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <Input
              type={"select"}
              id={"internType"}
              label={"Begin Period"}
              size={"full"}
              labelDescription={"Choose one below"}
              defaultValue={this.state.begin_period}
              onChange={(value, slValue) => {
                this.setState({ begin_period: slValue.value });
              }}
              placeholder={"Select begin period"}
              externalSource={[
                { key: "Apr", value: "April – 1st Week" },
                { key: "Jan1", value: "April – 2nd Week" },
                { key: "Jan1", value: "April – 3rd Week" },
                { key: "Jan1", value: "April – 4th Week" },
                { key: "Jan1", value: "May – 1st Week" },
                { key: "Jan1", value: "May – 2nd Week" },
                { key: "Jan1", value: "May – 3rd Week" },
                { key: "Jan1", value: "May – 4th Week" },
              ]}
            />
          </div>
          <div class="col-md-6">
            <Input
              type={"select"}
              id={"internType"}
              label={"Quota"}
              size={"full"}
              labelDescription={"Choose one below"}
              defaultValue={this.state.quota}
              onChange={(value, slValue) => {
                this.setState({ quota: slValue.value });
              }}
              placeholder={"Quota"}
              externalSource={[
                { key: "1", value: "1" },
                { key: "2", value: "2" },
                { key: "3", value: "3" },
                { key: "4", value: "4" },
                { key: "5", value: "5" },
                { key: "6", value: "6" },
                { key: "7", value: "7" },
                { key: "8", value: "8" },
                { key: "9", value: "9" },
                { key: "10", value: "10" },
              ]}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <Input
              type={"select"}
              id={"internType"}
              label={"Salary"}
              size={"full"}
              labelDescription={"Choose one below"}
              defaultValue={this.state.salary}
              onChange={(value, slValue) => {
                this.setState({ salary: slValue.value });
              }}
              placeholder={"Select salary"}
              externalSource={[
                { key: "Yes", value: "Yes" },
                { key: "No", value: "No" },
              ]}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <Button
              type={"primary"}
              text={"Create"}
              onButtonClick={this.onCreateFormSubmit}
            />
          </div>
        </div>
      </div>
    );
  };

  onCreateFormSubmit = async (payload) => {
    /*
    const internshipLength = parseInt(this.state.internshipLength);
    const addedDays = internshipLength * 7;

    const endDate = new Date(payload.startDate);

    endDate.setDate(endDate.getDate() + addedDays);

    payload.endDate = endDate;
	this.setState({endDate:endDate})
	*/
    console.log({
      internshipLength: this.state.internshipLength,
      position: this.state.position,
      description: this.state.description,
      qualifications: this.state.qualifications,
      internLevel: this.state.internLevel,
      languages: this.state.prefLang,
      applicationType: this.state.applicationType,
      gpa: this.state.gpa,
      startDate: this.state.begin_period,
      internQuota: this.state.quota,
      salary: this.state.salary,
      competency: this.state.prefComp,
      profession: this.state.pref_prof,
    });
    await store.createPost({
      internshipLength: this.state.internshipLength,
      position: this.state.position,
      description: this.state.description,
      qualifications: this.state.qualifications,
      internLevel: this.state.internLevel,
      languages: this.state.prefLang,
      applicationType: this.state.applicationType,
      gpa: this.state.gpa,
      startDate: this.state.begin_period,
      internQuota: this.state.quota,
      salary: this.state.salary,
      competency: this.state.prefComp,
      profession: this.state.pref_prof,
    });
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
    return (
      <div style={{ "background-color": "#f6f8fa" }}>
        <div className={"MyJobs"}>
          <div class="container">
            <div class="responsiveRow">
              <div className={"MyJobs__listButtonContainer"}>
                <RedirectControl is={false}>
                  <Card
                    type={"list"}
                    externalData={this.state[`${userType}PostPageSource`]}
                  />
                  <Button
                    v-if={userType === "employer"}
                    text={"Create Internship"}
                    width={"60%"}
                    icon={addIcon}
                    iconPosition={"right"}
                    onButtonClick={this.onCreateClick}
                  />
                </RedirectControl>
              </div>
              <div class="col-md-12 responsiveCard">
                <Fragment v-if={userType === "intern"}>
                  <RedirectControl is={false}>
                    <Card
                      header={{
                        text: cardText("Application History"),
                        position: "center",
                      }}
                      v-if={page === 0}
                      type={"jobPost"}
                      RedirectControl={this.redirectControl.bind(this)}
                      posts={appliedPosts}
                      anim={false}
                    />
                    <Card
                      header={{
                        text: cardText("Saved Jobs"),
                        position: "center",
                      }}
                      v-if={page === 1}
                      type={"jobPost"}
                      RedirectControl={this.redirectControl.bind(this)}
                      posts={savedPosts}
                      anim={false}
                    />
                    <Card
                      header={{
                        text: cardText("Accepted Jobs"),
                        position: "center",
                      }}
                      v-if={page === 2}
                      type={"jobPost"}
                      RedirectControl={this.redirectControl.bind(this)}
                      posts={acceptedPosts}
                      anim={false}
                    />
                    <Card
                      header={{
                        text: cardText("Pending Jobs"),
                        position: "center",
                      }}
                      v-if={page === 3}
                      type={"jobPost"}
                      RedirectControl={this.redirectControl.bind(this)}
                      posts={pendingPosts}
                      anim={false}
                    />
                  </RedirectControl>
                  <RedirectControl>
                    <></>
                  </RedirectControl>
                </Fragment>
                <Fragment v-else-if={userType === "employer"}>
                  <RedirectControl is={false}>
                    <Card
                      header={{ text: cardText("Active"), position: "center" }}
                      v-if={page === 1}
                      type={"jobPost"}
                      RedirectControl={this.redirectControl.bind(this)}
                      posts={activePosts}
                      anim={false}
                    />
                    <Card
                      header={{ text: cardText("Passive"), position: "center" }}
                      v-if={page === 2}
                      type={"jobPost"}
                      RedirectControl={this.redirectControl.bind(this)}
                      posts={passivePosts}
                      anim={false}
                    />
                  </RedirectControl>
                  <RedirectControl>
                    <Card
                      header={{
                        text: cardText("Post History"),
                        position: "center",
                      }}
                      v-if={page === 0}
                      selectJob={this.jobIDSelector.bind(this)}
                      type={"jobPost"}
                      RedirectControl={this.redirectControl.bind(this)}
                      posts={jobsForTask}
                      anim={false}
                    />
                  </RedirectControl>
                </Fragment>
              </div>
            </div>
          </div>
          {error && this.renderNoPermission(error)}
          {processing && <LoadingModal text="Loading" />}
        </div>
        <FooterAlternative />
      </div>
    );
  }
}

export default MyJobs;
