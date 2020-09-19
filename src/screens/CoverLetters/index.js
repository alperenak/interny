import React, { Component, Fragment } from "react";

/*** Components ***/
import Card from "../../components/Card";
import Button from "../../components/Button";
import SearchSection from "../../components/SearchSection";
import LoadingModal from '../../components/LoadingModal'

/*** Utils ***/
import store from "../../store";
import { getCookie } from "../../utils/cookie";

/*** Styles ***/
import styles from "./coverletters.scss";

/*** Icons ***/
import addIcon from "../../icons/add-circular-outlined-white-button.svg";
import Input from "../../components/Input";
import Footer from "../../components/Footer";

class CoverLetters extends Component {
  state = {
    coverLetters: [],
    newLetter: {
      title: "",
      text: "",
    },
    processing: true
  };

  async componentDidMount() {
    let response = await this.getCoverLetters();

    if (response) {
      this.setState({ processing: false })

    }
  }

  getCoverLetters = async () => {
    let id = getCookie("user_id");
    let res = await store.getCoverLetters(id);
    let coverLetters = res.map((cl) => {
      return {
        id: cl._id,
        title: cl.title,
        text: cl.text,
      };
    });

    this.setState({ coverLetters });
    return res;
  };

  renderModalButtons = () => [
    {
      type: "ghost",
      text: "Cancel",
      sizeName: "default",
      onButtonClick: () => this.props.closeModal(),
    },
    {
      type: "primary",
      text: "Create",
      sizeName: "default",
      loading: this.state.create_processing,
      onButtonClick: async () => {
        this.setState({ create_processing: true })

        await store.createCoverLetter(
          getCookie("user_id"),
          this.state.newLetter
        );

        let response = await this.getCoverLetters();
        console.log(response);
        if (response) {
          this.setState({ create_processing: false })
          if (!this.state.create_processing)
            this.props.closeModal();
        }
      },
    },
  ];

  createCoverLetter = () => {
    this.props.createModal({
      header: "Create Cover Letter",
      content: this.renderModalContent,
      buttons: this.renderModalButtons(),
    });
  };

  onCreateCoverLetterTitle = (value) => {
    this.setState((state) => {
      state.newLetter.title = value;
      return state;
    });
  };

  onCreateCoverLetter = (value) => {
    this.setState((state) => {
      state.newLetter.text = value;
      return state;
    });
  };

  onCoverLetterChange = (value, id) => {
    this.setState((state) => {
      let { coverLetters } = state;
      coverLetters.find((cl) => cl.id === id).text = value;
      return state;
    });
  };

  onEditSubmit = async (id) => {
    let { coverLetters } = this.state;
    let coverLetter = coverLetters.find((cl) => cl.id === id);
    await store.updateCoverLetter(getCookie("user_id"), coverLetter);
  };

  onCoverLetterDelete = async (id) => {
    await store.deleteCoverLetter(getCookie("user_id"), id);
    await this.getCoverLetters();
  };

  renderModalContent = () => {
    return (
      <Fragment>
        <Input
          type={"text"}
          size={"full"}
          label={"Name your Cover Letter"}
          labelDescription={"The name will be seen only to you"}
          placeholder={"Enter name"}
          onChange={(value) => this.onCreateCoverLetterTitle(value)}
        />
        <Input
          type={"textarea"}
          size={"full"}
          label={"Cover Letter Content"}
          placeholder={"Cover letter..."}
          onChange={(value) => this.onCreateCoverLetter(value)}
        />
      </Fragment>
    );
  };

  render() {
    let { coverLetters, processing } = this.state;
    let { user } = this.props;
    return (
      <>
        {processing && <LoadingModal text={"Loading..."} />}
        <div className={styles.CoverLetters}>
          <div className={styles.cards}>
            <div className={styles.CoverLettersWrapper}>
              <Card
                type={"coverLetter"}
                showButtons={true}
                v-for={(coverLetter, i) in coverLetters}
                header={{ text: coverLetter.title, position: "center" }}
                coverLetter={coverLetter}
                key={i}
                onChange={(value) =>
                  this.onCoverLetterChange(value, coverLetter.id)
                }
                onSubmit={() => this.onEditSubmit(coverLetter.id)}
                onDelete={() => this.onCoverLetterDelete(coverLetter.id)}
                accordion={true}
              />
              {coverLetters.length <= 0 && (
                <Card>There is no Cover Letter...</Card>
              )}
            </div>
            <div className={styles.profileSection}>
              <Card
                type={"profile"}
                getUser={this.props.getUser}
                profileObject={{
                  avatar: user.avatar,
                  status: "active",
                  header: `${user.name} ${user.surname}`,
                  location: "Istanbul - Turkey",
                  sector: "Software",
                  position: "Full Time",
                  education: "Graduate",
                }}
              />
              <Button
                text={"Create new Cover Letter"}
                width={"60%"}
                icon={addIcon}
                iconPosition={"right"}
                onButtonClick={this.createCoverLetter}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CoverLetters;
