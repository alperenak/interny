import React from 'react';
import Card from "./components/Card";

/*** Components ***/
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import Input from "./components/Input/index";

/*** Styles ***/
import styles from './app.scss';

/*** Icon ***/
import selectIcon from './icons/selectbox.svg';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            profile: {
                image: selectIcon,
                header: 'Ekrem Şanslı',
                location: 'Istanbul - Turkey',
                sector: 'Software',
                jobType: 'Full Time',
                education: 'Graduate',
                status: 'active'
            },
            buttons: [
                {
                    multiple: true,
                    listDirection: 'row',
                    positionX: 'right',
                    positionY: 'bottom',
                    buttons: [
                        {
                            disabled: false,
                            sizeName: 'small',
                            text: 'REJECTED',
                            type: 'secondary'
                        },
                        {
                            disabled: false,
                            sizeName: 'small',
                            text: 'ACCEPTED',
                            type: 'ghost'
                        },
                    ]
                }
            ],
            contents: [
                {
                    header: "Internship for Student & New Graduates",
                    date: '20 days ago',
                    company: 'Fikrimuhal - İstanbul',
                    location: 'Kadıköy, İstanbul - Turkey',
                    note: '987 views',
                    buttons: [
                        {
                            listDirection: 'column',
                            disabled: false,
                            sizeName: 'small',
                            text: 'ACCEPTED',
                            type: 'primary'
                        },
                        {
                            listDirection: 'column',
                            disabled: false,
                            sizeName: 'small',
                            text: 'REJECTED',
                            type: 'ghost'
                        },
                    ],
                },
                {
                    header: "Internship for Student & New Graduates",
                    date: '20 days ago',
                    company: 'Fikrimuhal - İstanbul',
                    location: 'Kadıköy, İstanbul - Turkey',
                    note: '867 views',
                    buttons: [
                        {
                            listDirection: 'column',
                            disabled: false,
                            sizeName: 'small',
                            text: 'ACCEPTED',
                            type: 'primary'
                        },
                        {
                            listDirection: 'column',
                            disabled: false,
                            sizeName: 'small',
                            text: 'REJECTED',
                            type: 'ghost'
                        },
                    ],
                }
            ],
            dropDownData: [
                {
                    key: "a",
                    value: '30 days ago',
                    selected: false,
                    icon: selectIcon
                },
                {
                    key: "ab",
                    value: '30 days ago',
                    selected: false
                },
                {
                    key: "ca",
                    value: '30 days ago',
                    selected: false
                },
                {
                    key: "ad",
                    value: '30 days ago',
                    selected: false
                },
                {
                    key: "ae",
                    value: '30 days ago',
                    selected: false
                },
                {
                    key: "b",
                    value: '20 days ago',
                    selected: false
                }
            ]
        };
    }
    onChange = (value, a) => {
      // this.setState({value: value});
    };

    render() {
        return (
            <div className={styles.App}>
                <Card
                    type={"profile"}
                    profileObject={this.state.profile}
                />
                <Card
                    type={"auth"}
                    title={"Create Account"}
                />
                <Card
                    type={"login"}
                    title={"Create Account"}
                />
                <Card
                    type={"coverLetter"}
                    header={{text: "Cover Letter", position: 'center'}}
                />
                <Card
                    type={"jobPost"}
                    header={{text: "Create Account", position: 'start'}}
                    posts={this.state.contents}
                />
                <div className={styles.temp}>

                    <Card
                        type={"dropDown"}
                        header={{text: "Create Account", position: 'center'}}
                        externalData={this.state.dropDownData}
                        title={'Notifications'}
                    />
                    <Card
                        type={"dropDown"}
                        externalData={this.state.dropDownData}
                        title={'Notifications'}
                    />
                </div>
                <Input
                    label={"Name"}
                    placeholder={"First name"}
                    onChange={this.onChange}
                    errorList={[]}
                    externalSource={[{key:'a', value:'ahmet', selected: false}, {key:'b', value:'b', selected: false}, {key:'c', value:'c', selected: false}]}
                    type={'select'}

                />
                <Input
                    label={"First Name"}
                    placeholder={"First name"}
                    onChange={this.onChange}
                    defaultValue={'asda'}
                    errorList={[]}
                    type={'text'}
                />
                <Input
                    label={"First Name"}
                    onChange={this.onChange}
                    value={"First name"}
                    errorList={[]}
                    type={'checkbox'}
                />
                <TopBar />
                <SideBar />
            </div>
        );
    }
}

export default App;
