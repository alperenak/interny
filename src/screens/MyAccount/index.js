import React, { Component, Fragment } from "react";

/*** Components ***/
import Card from "../../components/Card";
import Button from "../../components/Button";
import LoadingModal from '../../components/LoadingModal'
import Input from "../../components/Input";

/*** Utils ***/
import store from "../../store";
import { getCookie } from "../../utils/cookie";

/*** Styles ***/
import styles from "./myaccount.scss";

/*** Styles ***/
import addIcon from "../../icons/add-circular-outlined-white-button.svg";
import logo from "../../assets/interny-logo-white.png";

class MyAccount extends Component {
  state = {
    items: [
      { key: "email", title: "E-mail Address" },
      { key: "password", title: "Password" },
      { key: "name", title: "Name" },
      { key: "accountName", title: "Account Name" },
      { key: "legalName", title: "Legal Name" },
      { key: "surname", title: "Surname" },
      { key: "membershipStatus", title: "Membership" },
      { key: "phone", title: "Phone" },
      { key: "location", title: "Location" },
    ],
    value: "",
    processing: false
  };

  onFileUpload = async (files) => {
    let uploadData = await store.uploadImageType(files[0].type);
    let res = await store.uploadImage(uploadData.url, files[0]);
    if (res) {
      await store.uploadImageKey(uploadData.key);
    }
    await this.props.getUser();
  };

  onChangeClick = (item) => {
    if (item.key !== "membershipStatus") {
      this.props.createModal({
        header: `Update ${item.title}`,
        content: () => this.renderModalContent(item.title),
        buttons: this.renderModalButtons(item.key),
      });
    }
  };

  renderModalContent(title) {
    return (
      <Input
        type={"text"}
        placeholder={`Enter ${title}`}
        size={"half"}
        onChange={(value) => this.setState({ value })}
      />
    );
  }
  onUpdateClick = async (key) => {
    this.setState({ processing: true })
    console.log(this.state.processing);
    if (getCookie("user") === "intern") {
      await store.editIntern(this.props.user.id, {
        field: key,
        value: this.state.value,
      });
    } else {
      await store.editEmployer(this.props.user.id, {
        field: key,
        value: this.state.value,
      });
    }
    this.setState({ value: "" });
    let response = await this.props.getUser();


    if (response) {
      this.setState({ processing: false })
      this.props.closeModal();
    }
  }

  renderModalButtons = (key) => [
    {
      type: "ghost",
      text: "Cancel",
      sizeName: "default",
      onButtonClick: () => this.props.closeModal(),
    },
    {
      type: "primary",
      text: "Update",
      sizeName: "default",
      onButtonClick: (key) => this.onUpdateClick(key),
    },
  ];
  render() {
    let { user } = this.props;
    let { items, processing } = this.state;
    let duration = (((user?.Internship?.duration - user?.Internship?.dayLeft) / user?.Internship?.duration) * 100);
    return (
      <>
        {processing && <LoadingModal text={"Loading..."} />}
        <div className={styles.myAccount}>
          <div className={styles.infoSection}>
            <Card
              header={{ text: "Profile Photo", position: "start" }}
              type={"photo"}
            >
              <div className={styles.profileImage}>
                <div
                  v-if={user.avatar || user.logo}
                  className={styles.imageContainer}
                >
                  <img src={user.avatar || user.logo} alt={"profile photo"} />
                </div>
                <label
                  className={
                    user.avatar || user.logo
                      ? styles.statusCircle
                      : styles.fileInput
                  }
                  htmlFor="fileInput"
                >
                  <img src={addIcon} alt={"icon"} />
                </label>
                <input
                  id={"fileInput"}
                  hidden={true}
                  accept={"image/*"}
                  type={"file"}
                  aria-label={""}
                  onChange={(e) => this.onFileUpload(e.target.files)}
                />
              </div>
            </Card>
            <Card v-if={user?.Internship} type={'photo'}>
              <div className={styles.internship}>
                <div className={styles.internshipHeader}>Internship</div>
                <div className={styles.internshipField}>
                  <span>Position: </span>
                  <span className={styles.value}>{user?.Internship?.position}</span>
                </div>
                <div className={styles.internshipField}>
                  <span>Start Date: </span>
                  <span className={styles.value}>{user?.Internship?.startDate}</span>
                </div>
                <div className={styles.internshipField}>
                  <span>End Date: </span>
                  <span className={styles.value}>{user?.Internship?.endDate}</span>
                </div>
                <div className={styles.internshipField}>
                  <span>Duration: </span>
                  <div className={styles.bar}>
                    <div
                        style={{width: duration+'%'}}
                        className={styles.duration}
                    />
                  </div>
                </div>
                <div className={styles.internshipField}>
                  <span>Day(s) Left: </span>
                  <span className={styles.value}>{user?.Internship?.dayLeft}</span>
                </div>
                <div className={styles.internshipField}>
                  <span>Internship Length: </span>
                  <span className={styles.value}>{user?.Internship?.internshipLength}</span>
                </div>
                <div className={styles.internshipField}>
                  <span>Overall Score: </span>
                  <span className={styles.value}>{user?.Internship?.overAllScore}</span>
                </div>
              </div>
            </Card>
            <Card v-else type={'logo'} backgroundColor={'#2c3f58'}>
              <img src={logo} alt={'logo'} />
              <div className={styles.slogan}>"The way to be a global intern"</div>
            </Card>
          </div>
          <Card
            type={"myAccount"}
            header={{ text: "My Account", position: "start" }}
          >
            {items.map((item, i) => {
              return (
                <div
                  v-if={user[item.key]}
                  key={i}
                  className={styles.MyAccountRow}
                >
                  <div className={styles.title}>{item.title}</div>
                  <div v-if={item.key !== "password"} className={styles.text}>
                    {item.key === "location"
                      ? user[item.key].city + " - " + user[item.key].country
                      : user[item.key]}
                  </div>
                  <div v-if={item.key === "password"} className={styles.text}>
                    **********
                </div>
                  <Button
                    type={"ghost"}
                    sizeName={"small"}
                    text={"Update"}
                    onButtonClick={() => this.onChangeClick(item)}
                  />
                </div>
              );
            })}
          </Card>
        </div>
      </>
    );
  }
}

export default MyAccount;
