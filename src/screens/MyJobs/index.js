import React, {Component} from 'react';

/*** Components ***/
import Card from "../../components/Card";

/*** Utils ***/
import store from '../../store';
import {getCookie} from "../../utils/cookie";

/*** Styles ***/
import styles from './myjobs.scss';

/*** Icons ***/
import userIcon from "../../icons/02-User-Oultine.svg";

class MyJobs extends Component {
    state = {
        appliedPosts: [],
        savedPosts: [],
        acceptedPosts: [],
        pendingPosts: [],
        page: 0,
        postPageSource: [
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
        ]
    };

    async componentDidMount() {
        await this.getSavedPosts();
        await this.getPosts();
    }

    fillPosts = (pst, buttons) => {
        return{
            id: pst.id,
            date: pst.startDate,
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
        let appliedPostsRes = await store.getAppliedPost(getCookie('user_id'));
        let appliedPosts = appliedPostsRes.map(pst => {
            return this.fillPosts(pst.Job, this.appliedButtons());
        });
        let acceptedPosts = appliedPostsRes.filter(post => post.isAccepted).map(pst => {
            return this.fillPosts(pst.Job, this.acceptedButtons());
        });
        let pendingPosts = appliedPostsRes.filter(post => post.isPending).map(pst => {
            return this.fillPosts(pst.Job, this.pendingButtons());
        });
        this.setState({ appliedPosts, acceptedPosts, pendingPosts });
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
    acceptedButtons = () => [
        {
            type:'primary',
            text:'Start Internship',
            sizeName:'small',
            width:'100px',
        },
        {
            type:'ghost',
            text:'Reject Internship',
            sizeName:'small',
            width:'100px',
        }
    ];

    render() {
        let {appliedPosts, savedPosts, page, postPageSource, acceptedPosts, pendingPosts} = this.state;
        return (
            <div className={styles.MyJobs}>
                <Card
                    type={'list'}
                    externalData={postPageSource}
                />
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
            </div>
        );
    }
}

export default MyJobs;
