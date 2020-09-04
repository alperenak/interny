import React, {Component, Fragment} from 'react';

/*** Component ***/
import Card from "../../components/Card";
import SearchSection from "../../components/SearchSection";

/*** Utils ***/
import store from "../../store";
import {getCookie} from "../../utils/cookie";
import {formButtons, formItems} from "../MyJobs/formItems";
import {formJobData, onJobFormChange} from "../../utils/functions";

/*** Styles ***/
import styles from "./postDetail.scss";
import Form from "../../components/Form";
import Footer from "../../components/Footer";


class PostDetail extends Component{
    state = {
        posts: [],
        post: {},
        company: {},
        applicants: []
    };

    async componentDidMount() {
        await this.getPost();
    }

    getPost = async () => {
        let {id} = this.props.match.params;
        let userType = getCookie('user');
        let user = '';
        if (userType === 'employer') {
            user = (await store.getEmployer(getCookie('user_id'))).data;
        }
        let pst = await store.getPost(id);
        this.setState(state => {
            if (userType === 'intern') {
                user = pst.Employer;
            }
            state.post = pst;
            let city = pst?.jobLocation?.city ? pst?.jobLocation?.city : '';
            let country = pst?.jobLocation?.country ? pst?.jobLocation?.country : '';
            let location = pst?.jobLocation ?
                `${country}${country && city ? ' - ' : ''}${city}` : '';
            state.posts = [
                {
                    date: pst.age === "0" ? 'Today' : pst.age + ' days ago',
                    position: pst?.position,
                    company: `${location}`,
                    buttons:[
                        {
                            type: userType === 'intern' ? 'primary' : 'ghost',
                            text: userType === 'intern' ? 'Apply Now' : 'Edit',
                            sizeName:'small',
                            width: userType === 'intern' ? '85px' : '105px',
                        }
                    ],
                    description: pst?.description,
                    qualifications: pst?.qualifications,
                    requirements: pst?.requirements,
                    internQuota: pst?.internQuota,
                }
            ];
            state.company = {
                logo: user.logo,
                header: user.legalName,
                location: `${pst?.jobLocation?.country} - ${pst?.jobLocation?.city}`,
                sector: pst?.industry,
                jobType: pst?.jobType,
                empNum: user?.employeeNumber,
                description: pst?.description,
            };

            if (userType === 'intern') {
                state.posts[0].buttons[0].to = `/jobapplication/${pst?.id}`;
            } else {
                state.posts[0].buttons[0].onButtonClick = () => this.onEditClick(pst.id);
                state.posts[0].buttons.splice(0, 0, {
                    type: 'primary',
                    text: 'View Applicants',
                    sizeName:'small',
                    width:'105px',
                    onButtonClick: () => this.onViewApplicantsClick(pst.id)
                });
            }

            return state;
        });
    };

    getApplicants = async (id) => {
        let applicants = await store.getPostApplications(id);
        this.setState({ applicants });
    };

    onEditClick = async () => {
        this.props.createModal({ header: 'Edit Post', content: this.renderEditPostForm });
    };

    onViewApplicantsClick = async (id) => {
        this.getApplicants(id);
        this.props.createModal({ header: 'Applicants', content: this.renderApplicants });
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

    renderApplicants = () => {
        let {applicants} = this.state;
        return applicants.map((app, i) => {
            return (
                <Fragment>
                    <Card
                        type={'intern'}
                        application={app}
                        getApplicants={this.getApplicants}
                        key={i}
                    />
                </Fragment>
            );
        });
    };

    onEditFormSubmit = async (payload) => {
        await store.editPost(payload);
        this.props.closeModal();
        await this.getPost();
    };

    render() {
        let {posts, company} = this.state;
        return (
            <div className={styles.postDetail}>
                <div className={styles.cards}>
                    <Card
                        type={'jobDetail'}
                        posts={posts}
                        v-for={(pst, i) in posts}
                        key={i}
                    />
                    <Card
                        type={'companyProfile'}
                        profileObject={company}
                        getUser={this.getPost}
                    />
                </div>
            </div>
        );
    }
}

export default PostDetail;
