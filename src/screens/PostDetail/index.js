import React, { Component, Fragment } from "react";

/*** Component ***/
import Card from "../../components/Card";
import { MDBDataTable } from "mdbreact";
import SearchSection from "../../components/SearchSection";
import LoadingModal from "../../components/LoadingModal";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

/*** Utils ***/
import store from "../../store";
import { getCookie } from "../../utils/cookie";
import { formButtons, formItems } from "../MyJobs/formItems";
import { formJobData, onJobFormChange } from "../../utils/functions";

/*** Styles ***/
import styles from "./postDetail.scss";
import styles2 from "../../components/Card/sub-components/Intern/intern.scss";
import Form from "../../components/Form";
import Footer from "../../components/Footer";
import coverLetterIcon from "../../icons/file-rounded-outlined-symbol.svg";
import CVIcon from "../../icons/file-rounded-empty-sheet.svg";

class PostDetail extends Component {
  state = {
    posts: [],
    post: {},
    pst: {},
    company: {},
    applicants: [],
    coverLetter: [],
    processing: true,
  };

  async componentDidMount() {
    await this.getPost();
    this.setState({ processing: false });
  }

  getPost = async () => {
    let { id } = this.props.match.params;
    let userType = getCookie("user");
    let user = "";
    if (userType === "employer") {
      user = (await store.getEmployer(getCookie("user_id"))).data;
    }
    let pst = await store.getPost(id);
    this.setState(async (state) => {
      let text = pst.isApplied
        ? pst.acceptationByEmployer
          ? !pst.isApproved
            ? "Confirm Internship"
            : getCookie("isInProgram")
            ? "Withdraw"
            : "Withdraw"
          : "Withdraw"
        : "Apply Now";
      if (userType === "intern") {
        user = pst.Employer;
      }
      state.post = pst;
      state.posts = [
        {
          date: pst.age === "0" ? "Today" : pst.age + " days ago",
          position: pst?.position,
          company: `${pst?.country}`,
          buttons: [
            {
              type: userType === "intern" ? "primary" : "ghost",
              text: userType === "intern" ? text : "Edit",
              sizeName: "small",
              width: userType === "intern" ? "85px" : "105px",
            },
          ],
          description: pst?.description,
          endDate: pst?.endDate,
          gpa: pst?.gpa,
          internLevel: pst?.internLevel,
          startPeriod: pst?.startPeriod,
          internQuota: pst?.internQuota,
          internshipLength: pst?.internshipLength,
          languages: pst?.languages,
          maxSalary: pst?.maxSalary,
          minSalary: pst?.minSalary,
          qualifications: pst?.qualifications,
          startDate: pst?.startDate,
        },
      ];
      state.company = {
        logo: user.logo,
        header: user.legalName,
        location: `${user?.location?.country} - ${user?.location?.city}`,
        sector: pst?.industry,
        jobType: pst?.jobType,
        empNum: user?.employeeNumber,
        description: pst?.description,
      };

      if (userType === "intern") {
        if (pst.isApplied) {
          if (pst.acceptationByEmployer) {
            if (pst.isApproved) {
              await store.withdrawPost(getCookie("user_id", pst.id));
            } else {
              await store.startInternship(getCookie("user_id", pst.id));
            }
          } else {
            if (!pst.isRejected) {
              await store.withdrawPost(getCookie("user_id", pst.id));
            } else {
              state.posts[0].buttons[0].to = `/jobapplication/${pst?.id}`;
            }
          }
        } else {
          state.posts[0].buttons[0].to = `/jobapplication/${pst?.id}`;
        }
      } else {
        state.posts[0].buttons[0].onButtonClick = () =>
          this.onEditClick(pst.id);
        state.posts[0].buttons.splice(0, 0, {
          type: "primary",
          text: "View Applicants",
          sizeName: "small",
          width: "105px",
          onButtonClick: () => this.onViewApplicantsClick(pst.id),
        });
      }

      return state;
    });
  };

  getApplicants = async (id) => {
    let applicants = await store.getPostApplications(id);
    this.setState({ applicants });
  };

  getCoverLetters = async (id) => {
    let applicants = await store.getPostApplications(id);
    this.setState({ coverLetter: getPage.CoverLetter });
  };

  onEditClick = async () => {
    this.props.createModal({
      size: "large",
      header: "Edit Post",
      content: this.renderEditPostForm,
    });
  };

  onViewApplicantsClick = async (id) => {
    await this.getApplicants(id);
    this.props.createModal({
      header: "Applicants",
      content: this.renderApplicants,
    });
  };

  onCoverLetterClick = async (app) => {
    let { id } = this.props.match.params;
    let pst = await store.getPost(id);
    await this.setState({ coverLetter: app.CoverLetter, pst: pst.id });
    this.props.createModal({
      header: "Cover Letter",
      content: this.renderCoverLetter,
    });
  };

  renderEditPostForm = () => {
    let postData = this.state.post;
    let isEdit = true;
    return (
      <Form
        formItems={formItems(postData)}
        formButtons={formButtons(isEdit)}
        formData={postData}
        formDataFormatter={formJobData}
        onFormChange={onJobFormChange}
        onSubmit={this.onEditFormSubmit}
        onCancel={this.props.closeModal}
      />
    );
  };

  renderCoverLetter = () => {
    let coverLetter = this.state.coverLetter;
    let pst = this.state.pst;
    return (
      <div>
        {coverLetter.text}
        <Button
          text="Go Back"
          sizeName={"small"}
          width={"72px"}
          style="margin-top:15px"
          onButtonClick={async () => this.onViewApplicantsClick(pst)}
        />
      </div>
    );
  };

  renderApplicants = () => {
    let { applicants } = this.state;
    let appForm = {
      columns: [
        {
          label: "Image",
          field: "image",
          sort: "asc",
          width: 25,
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
          width: 100,
        },
        {
          label: "",
          field: "buttons",
          sort: "asc",
          width: 50,
        },
        {
          label: "",
          field: "buttons2",
          sort: "asc",
          width: 50,
        },
      ],
      rows: [],
    };

    applicants.forEach((app) => {
      let primaryButtonText = "";
      let primaryFunc = () => {};
      let ghostButtonText = "";
      let ghostFunc = () => {};

      if (app.isPending) {
        // when intern applies
        primaryButtonText = "ACCEPT";
        primaryFunc = async () => store.acceptApplication(app.Job.id, app.id);
        ghostButtonText = "REJECT";
        ghostFunc = async () => store.rejectApplication(app.Job.id, app.id);
      } else if (app.isAccepted) {
        if (app.isApproved) {
          // when intern agree
          primaryButtonText = "ASSIGNMENTS";
          primaryFunc = () => {};
          ghostButtonText = "WITHDRAW";
          ghostFunc = () => {};
        } else {
          // when employer accepted
          primaryButtonText = "WITHDRAW";
          primaryFunc = () => {};
          ghostButtonText = "REJECT";
          ghostFunc = async () => store.rejectApplication(app.Job.id, app.id);
        }
      } else if (app.isRejected) {
        // when employer or intern rejcet
        primaryButtonText = "ACCEPT";
        primaryFunc = () => {};
        ghostButtonText = "WITHDRAW";
        ghostFunc = () => {};
      }
      var person = {
        image: <img src={app.Intern.avatar} alt={"image"} />,
        name: app.Intern.name + " " + app.Intern.surname,
        buttons: (
          <div className={"detailButtons"}>
            <a
              className={"detailButton"}
              onClick={() => window.open("/CvPreview/" + app.Cv.id)}
              href={"/CvPreview/" + app.Cv.id}
              target="_blank"
            >
              <img src={CVIcon} alt={"icon"} />
              <div>Curriculum vitae</div>
            </a>
            <a
              className={"detailButton"}
              onClick={() => this.onCoverLetterClick(app)}
            >
              <img src={coverLetterIcon} alt={"icon"} />
              <div>Cover Letter</div>
            </a>
          </div>
        ),
        buttons2: (
          <div className={"buttonContainer"}>
            <Button
              type={"primary"}
              text={primaryButtonText}
              sizeName={"small"}
              width={"72px"}
              onButtonClick={async () => await primaryFunc()}
            />
            <Button
              type={"ghost"}
              text={ghostButtonText}
              sizeName={"small"}
              width={"72px"}
              onButtonClick={async () => await ghostFunc()}
            />
          </div>
        ),
      };
      appForm.rows.push(person);
    });
    return (
      <Fragment>
        <MDBDataTable striped bordered small data={appForm} />
      </Fragment>
    );
  };

  onEditFormSubmit = async (payload) => {
    await store.editPost(payload);
    this.props.closeModal();
    await this.getPost();
  };

  render() {
    let { posts, company, processing } = this.state;
    return (
      <div className={"postDetail"}>
        <LoadingModal text="Loading" v-if={processing} />
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <Card
                type={"jobDetail"}
                posts={posts}
                v-for={(pst, i) in posts}
                key={i}
              />
            </div>
            <div class="col-md-4 postDetail__rightBox">
              <Card
                type={"companyProfile"}
                profileObject={company}
                getUser={this.getPost}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostDetail;
