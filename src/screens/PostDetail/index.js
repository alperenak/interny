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
        let pst = await store.getPost(id);
        this.setState(state => {
            state.post = pst;
            state.posts = [
                {
                    date: pst?.startDate,
                    position: pst?.position,
                    company: `${pst?.Employer?.legalName} - ${pst?.jobLocation?.city}`,
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
                image: pst?.Employer.logo,
                header: pst?.Employer.legalName,
                location: `${pst?.jobLocation?.country} - ${pst?.jobLocation?.city}`,
                sector: pst?.industry,
                jobType: pst?.jobType,
                empNum: pst?.Employer?.employeeNumber,
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

    onEditClick = async () => {
        this.props.createModal({ header: 'Edit Post', content: this.renderEditPostForm });
    };

    onViewApplicantsClick = async (id) => {
        let applicants = await store.getPostApplications(id);
        this.setState({ applicants });
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
                        key={i}
                    />
                </Fragment>
            );
        });
    };

    onEditFormSubmit = async (payload) => {
        await store.editPost(payload);
        this.props.closeModal();
    };

    render() {
        let {posts, company} = this.state;
        return (
            <div className={styles.postDetail}>
                <SearchSection />
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
                    />
                </div>
            </div>
        );
    }
}

export default PostDetail;
