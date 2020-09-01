import React, {Component, Fragment} from 'react';

/*** Components ***/
import Card from "../../components/Card";

/*** Utils ***/
import store from '../../store';
import {getCookie} from "../../utils/cookie";
import {formButtons, formItems} from "./formItems";
import {formJobData, onJobFormChange} from "../../utils/functions";

/*** Styles ***/
import styles from './myjobs.scss';

/*** Icons ***/
import Button from "../../components/Button";
import addIcon from "../../icons/add-circular-outlined-white-button.svg";
import Form from "../../components/Form";

class MyJobs extends Component {
    state = {
        appliedPosts: [],
        savedPosts: [],
        acceptedPosts: [],
        pendingPosts: [],
        postHistory: [],
        activePosts: [],
        passivePosts: [],
        page: 0,
        internPostPageSource: [
            {
                key: 'ApplicationHistory',
                value: 'Application History',
                selected: true,
                to:'/myJobs',
                onChange: () => this.setState({page: 0})
            },
            {
                key: 'SavedJobs',
                value: 'Saved Jobs',
                selected: false,
                to:'/myJobs',
                onChange: () => this.setState({page: 1})
            },
            {
                key: 'AcceptedJobs',
                value: 'Accepted Jobs',
                selected: false,
                to:'/myJobs',
                onChange: () => this.setState({page: 2})
            },
            {
                key: 'PendingJobs',
                value: 'Pending Jobs',
                selected: false,
                to:'/myJobs',
                onChange: () => this.setState({page: 3})
            },
        ],
        employerPostPageSource: [
            {
                key: 'PostHistory',
                value: 'Post History',
                selected: true,
                to:'/myJobs',
                onChange: () => this.setState({page: 0})
            },
            {
                key: 'ActivePosts',
                value: 'Active Posts',
                selected: false,
                to:'/myJobs',
                onChange: () => this.setState({page: 1})
            },
            {
                key: 'PassivePosts',
                value: 'Passive Posts',
                selected: false,
                to:'/myJobs',
                onChange: () => this.setState({page: 2})
            },
        ]
    };

    async componentDidMount() {
        let userType = getCookie('user');
        if (userType === 'intern') {
            await this.getSavedPosts();
            await this.getPosts();
        } else if (userType === 'employer') {
            await this.getJobPosts();
        }
    }

    fillPosts = (pst, buttons) => {
        return{
            id: pst.id,
            date: pst.age + ' days ago',
            header: pst.Employer.legalName,
            company: pst.position,
            image: pst.Employer.logo,
            location: `${pst.jobLocation.city} - ${pst.jobLocation.country}`,
            buttons:buttons,
            description: pst.description,
            note: '987 views'
        }
    };

    async getSavedPosts() {
        let savedPostsRes = await store.getSavedPost(getCookie('user_id'));
        let savedPosts = savedPostsRes.map(pst => {
            return this.fillPosts(pst, this.savedButtons(pst.id));
        });
        this.setState({ savedPosts });
    }

    async getPosts() {
        let userId = getCookie('user_id');
        let appliedPostsRes = await store.getAppliedPost(userId);
        let appliedPosts = appliedPostsRes.map(pst => {
            return this.fillPosts(pst.Job, this.appliedButtons());
        });
        let acceptedPosts = appliedPostsRes.filter(post => post.isAccepted).map(pst => {
            return this.fillPosts(pst.Job, this.acceptedButtons(userId, pst.Job.id));
        });
        let pendingPosts = appliedPostsRes.filter(post => post.isPending).map(pst => {
            return this.fillPosts(pst.Job, this.pendingButtons());
        });
        this.setState({ appliedPosts, acceptedPosts, pendingPosts });
    }

    async getJobPosts() {
        let id = getCookie('user_id');
        let postsRes = await store.getEmployerPosts(id);
        let activePostsRes = await store.getActivePosts(id);
        let passivePostsRes = await store.getPassivePosts(id);

        let posts = postsRes.map(pst => {
            return this.fillPosts(pst, this.historyButtons(pst));
        });
        let activePosts = activePostsRes.map(pst => {
            return this.fillPosts(pst, this.historyButtons(pst));
        });
        let passivePosts = passivePostsRes.map(pst => {
            return this.fillPosts(pst, this.historyButtons(pst));
        });
        this.setState({ postHistory: posts, activePosts: activePosts, passivePosts: passivePosts });
    }

    appliedButtons = () => [
        {
            type:'primary',
            text:'Withdraw',
            sizeName:'small',
            width:'85px',
        }
    ];
    savedButtons = (id) => [
        {
            type:'ghost',
            text:'Remove Post',
            sizeName:'small',
            width:'85px',
            onButtonClick: async () => {
                let res = await store.removePost(getCookie('user_id'), id);
                if (res.status && res.status === 203) {
                    await this.getSavedPosts();
                }
            }
        }
    ];
    pendingButtons = () => [
        {
            type:'primary',
            text:'Withdraw',
            sizeName:'small',
            width:'100px',
        },
        {
            type:'ghost',
            disabled: true,
            text:'Pending...',
            sizeName:'small',
            width:'100px',
        }
    ];
    acceptedButtons = (userId, jobId) => [
        {
            type:'primary',
            text:'Start Internship',
            sizeName:'small',
            width:'100px',
            onButtonClick: async () => {
                await store.startInternship(userId, jobId);
            }
        }
    ];

    historyButtons = (pst) => [
        {
            type: pst.isSuspended ? 'primary' : 'ghost',
            text: pst.isSuspended ? 'Activate' : 'Suspend',
            sizeName:'small',
            width:'85px',
            onButtonClick: async () => {
                if (pst.isSuspended)
                    await store.activatePost(pst.id);
                else
                    await store.suspendPost(pst.id);
                await this.getJobPosts();
            }
        }
    ];

    onCreateClick = async () => {
        this.props.createModal({ header: 'Create Post', content: this.renderCreatePostForm });
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
        await store.createPost(payload);
        this.props.closeModal();
        await this.getJobPosts();
    };

    render() {
        let {appliedPosts, savedPosts, page, acceptedPosts, pendingPosts,
            postHistory, activePosts, passivePosts} = this.state;
        let userType = getCookie('user');
        return (
            <div className={styles.MyJobs}>
                <div className={styles.listButtonContainer}>
                    <Card
                        type={'list'}
                        externalData={this.state[`${userType}PostPageSource`]}
                    />
                    <Button
                        v-if={userType === 'employer'}
                        text={'Create new Post'}
                        width={'60%'}
                        icon={addIcon}
                        iconPosition={'right'}
                        onButtonClick={this.onCreateClick}
                    />
                </div>
                <Fragment v-if={userType === 'intern'}>
                    <Card
                        header={{text: 'Application History', position: 'center'}}
                        v-if={page === 0}
                        type={'jobPost'}
                        posts={appliedPosts}
                    />
                    <Card
                        header={{text: 'Saved Jobs', position: 'center'}}
                        v-if={page === 1}
                        type={'jobPost'}
                        posts={savedPosts}
                    />
                    <Card
                        header={{text: 'Accepted Jobs', position: 'center'}}
                        v-if={page === 2}
                        type={'jobPost'}
                        posts={acceptedPosts}
                    />
                    <Card
                        header={{text: 'Pending Jobs', position: 'center'}}
                        v-if={page === 3}
                        type={'jobPost'}
                        posts={pendingPosts}
                    />
                </Fragment>
                <Fragment v-else-if={userType === 'employer'}>
                    <Card
                        header={{text: 'Post History', position: 'center'}}
                        v-if={page === 0}
                        type={'jobPost'}
                        posts={postHistory}
                    />
                    <Card
                        header={{text: 'Active Posts', position: 'center'}}
                        v-if={page === 1}
                        type={'jobPost'}
                        posts={activePosts}
                    />
                    <Card
                        header={{text: 'Passive Posts', position: 'center'}}
                        v-if={page === 2}
                        type={'jobPost'}
                        posts={passivePosts}
                    />
                </Fragment>
            </div>
        );
    }
}

export default MyJobs;
