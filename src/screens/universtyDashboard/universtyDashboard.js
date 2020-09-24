import React, { Component, Fragment } from "react";
import styles from "./universtyDashboard.scss";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ConversationSearch from "../../components/ConversationSearch";

class UniverstyDashboard extends Component {
  state = {
    filteredStaticData: staticData,
  };
  onSearchTextChange = (value) => {
    this.setState((state) => {
      if (value) {
        state.filteredStaticData = staticData.filter(
          (el) =>
            `${el.name} ${el.surname}`.includes(value) ||
            `${el.name} ${el.surname}`.toLocaleLowerCase().includes(value)
        );
      } else {
        if (state.searchText) {
          state.filteredStaticData = staticData;
        }
      }

      state.searchText = value;
      return state;
    });
  };
  render() {
    let { history } = this.props;
    return (
      <Fragment>
        <ConversationSearch
          onChange={this.onSearchTextChange}
          className="inputSearchBar"
          type={"internList"}
        />
        <div className={styles.internTitles}>
          <div>
            <article className={styles.student}>Student</article>
          </div>
          <div>
            <article className={styles.companyProgram}>
              Company / Program
            </article>
          </div>
          <div>
            <article className={styles.InternshipInfo}>Internship Info</article>
          </div>
        </div>
        <div className={styles.searchIntern}></div>
        {this.state.filteredStaticData.map((item) => {
          return <Card type={"internList"} item={item} history={history} />;
        })}
      </Fragment>
    );
  }
}

export default UniverstyDashboard;

const staticData = [
  {
    id: "5f5145c6cb4ec4130143bbd4",
    name: "Gustavo",
    surname: "Velasco",
    email: "gustavo.velasco@example.com",
    phone: "+90 543 739 05 54",
    location: {
      country: "Turkey",
      city: "Ankara",
    },
    gradStatus: "Student",
    avatar:
      "https://interny-pp.s3.eu-central-1.amazonaws.com/5f5145c6cb4ec4130143bbd4/pp.jpeg",
    Internship: {
      id: "5f640f3dc782454860f792f1",
      Employer: {
        id: "5f514d5f73b6d41b674e16fb",
        legalName: "Innovation and Partners Limited Inc.",
        logo:
          "https://interny-pp.s3.eu-central-1.amazonaws.com/5f514d5f73b6d41b674e16fb/pp.png",
      },
      position: "Game Developer",
      startDate: "9/30/2020",
      endDate: "11/30/2020",
      duration: "61",
      dayLeft: 13,
      internshipLength: "10 weeks",
      status: "Completed",
    },
  },
  {
    id: '5f5146f8cb4ec4130143bbd6',
    name: 'Oya',
    surname: 'Alyanak',
    email: 'oya.alyanak@example.com',
    phone: '',
    membershipStatus: 'FREEMIUM',
    location: {
      country: 'Turkey',
      city: 'Ankara'
    },
    university: {
      university: 'Ankara University',
      faculty: 'Engineering',
      department: 'Computer Science',
      universityMail: 'example@ogrenci.ankara.edu.tr',
      studentNumber: '18290454'
    },
    gradStatus: 'Student',
    avatar: 'https://interny-pp.s3.eu-central-1.amazonaws.com/5f5146f8cb4ec4130143bbd6/pp.jpeg',
    isCompleted: true,
    Internship: {
      id: '5f640f3dc782454860f792f1',
      Employer: {
        id: '5f514d5f73b6d41b674e16fb',
        legalName: 'Innovation and Partners Limited Inc.',
        accountName: 'innovation',
        email: 'info@innovationandpartners.com',
        logo: 'https://interny-pp.s3.eu-central-1.amazonaws.com/5f514d5f73b6d41b674e16fb/pp.png',
        isValid: null,
        employeeNumber: 24,
        sectors: [],
        workingLocations: []
      },
      position: 'Game Developer',
      startDate: '8/30/2020',
      endDate: '10/30/2020',
      duration: 61,
      age: 6,
      internshipLength: '10 weeks',
      country: [
        'Afghanistan',
        'Åland Islands',
        'Albania'
      ],
      postedAt: '9/18/2020',
      overAllScore: 4.8,
      dayLeft: 36,
      status: "Ongoing",
    }
  },
  {
    id: "5f5145c6cb4ec4130143bbd4",
    name: "Gustavo",
    surname: "Velasco",
    email: "gustavo.velasco@example.com",
    phone: "+90 543 739 05 54",
    location: {
      country: "Turkey",
      city: "Ankara",
    },
    gradStatus: "Student",
    avatar:
        "https://interny-pp.s3.eu-central-1.amazonaws.com/5f5145c6cb4ec4130143bbd4/pp.jpeg",
    Internship: {
      id: "5f640f3dc782454860f792f1",
      Employer: {
        id: "5f514d5f73b6d41b674e16fb",
        legalName: "Innovation and Partners Limited Inc.",
        logo:
            "https://interny-pp.s3.eu-central-1.amazonaws.com/5f514d5f73b6d41b674e16fb/pp.png",
      },
      position: "Game Developer",
      startDate: "9/30/2020",
      endDate: "11/30/2020",
      duration: "61",
      dayLeft: 13,
      internshipLength: "10 weeks",
      status: "Completed",
    },
  },
  {
    id: '5f5146f8cb4ec4130143bbd6',
    name: 'Oya',
    surname: 'Alyanak',
    email: 'oya.alyanak@example.com',
    phone: '',
    membershipStatus: 'FREEMIUM',
    location: {
      country: 'Turkey',
      city: 'Ankara'
    },
    university: {
      university: 'Ankara University',
      faculty: 'Engineering',
      department: 'Computer Science',
      universityMail: 'example@ogrenci.ankara.edu.tr',
      studentNumber: '18290454'
    },
    gradStatus: 'Student',
    avatar: 'https://interny-pp.s3.eu-central-1.amazonaws.com/5f5146f8cb4ec4130143bbd6/pp.jpeg',
    isCompleted: true,
    Internship: {
      id: '5f640f3dc782454860f792f1',
      Employer: {
        id: '5f514d5f73b6d41b674e16fb',
        legalName: 'Innovation and Partners Limited Inc.',
        accountName: 'innovation',
        email: 'info@innovationandpartners.com',
        logo: 'https://interny-pp.s3.eu-central-1.amazonaws.com/5f514d5f73b6d41b674e16fb/pp.png',
        isValid: null,
        employeeNumber: 24,
        sectors: [],
        workingLocations: []
      },
      position: 'Game Developer',
      startDate: '8/30/2020',
      endDate: '10/30/2020',
      duration: 61,
      age: 6,
      internshipLength: '10 weeks',
      country: [
        'Afghanistan',
        'Åland Islands',
        'Albania'
      ],
      postedAt: '9/18/2020',
      overAllScore: 4.8,
      dayLeft: 36,
      status: "Ongoing",
    }
  },
];
