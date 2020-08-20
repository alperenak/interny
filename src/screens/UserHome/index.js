import React, {Component} from 'react';

/*** Components ***/
import Card from "../../components/Card";
import SearchSection from "../../components/SearchSection";

/*** Utils ***/
import {getCookie} from "../../utils/cookie";
import store from '../../store';

/*** Styles ***/
import styles from './userhome.scss';

/*** Icons ***/
import Button from "../../components/Button";

class UserHome extends Component {
    state = {
        posts: [],
        offset: 0,
        limit: 5
    };

    async componentDidMount() {
        let {offset, limit} = this.state;
        let userType = getCookie('user');
        let userId = getCookie('userId');
        if (userType === 'intern') {
            let res = await store.getPosts('','', offset, limit);
            let posts = res.map(pst => {
                return this.fillPosts(pst);
            });
            this.setState({ posts });
        }
    }

    fillPosts = (pst) => [
        {
            id: pst.id,
            date: pst.startDate,
            header: pst.Employer.legalName,
            company: pst.position,
            image: pst.Employer.logo,
            location: `${pst.jobLocation.city} - ${pst.jobLocation.country}`,
            buttons:[
                {
                    type:'primary',
                    text:pst.isApplied?'Withdraw':'Apply Now',
                    sizeName:'small',
                    width:'85px',
                    to:`/jobApplication/${pst.id}`
                },
                {
                    type:'ghost',
                    text:pst.isSaved?'Remove Post':'Save Post',
                    sizeName:'small',
                    width:'85px',
                    onButtonClick: async () => {
                        let res = {};
                        if (pst.isSaved) {
                            res = await store.removePost(getCookie('user_id'), pst.id);
                        } else {
                            res = await store.savePost(getCookie('user_id'), pst.id);
                        }
                        if (res.status && res.status === 203) {
                            let res = await store.getPosts('', '', this.state.offset, this.state.limit);
                            let posts = res.map(pst => {
                                return this.fillPosts(pst);
                            });
                            this.setState({ posts });
                        }
                    }
                }
            ],
            description: pst.description,
            note: '987 views'
        }
    ];

    onLoadMore = async () => {
        let {offset, limit} = this.state;
        let res = await store.getPosts('', '', offset + limit, limit);
        let posts = res.map(pst => {
            return this.fillPosts(pst);
        });
        this.setState({ posts: [...this.state.posts, ...posts], offset: offset + limit });
    };

    render() {
        let {posts} = this.state;
        return (
            <div className={styles.UserHome}>
                <SearchSection />
                <Card
                    v-for={(pst, i) in posts}
                    key={i}
                    type={'jobPost'}
                    posts={pst}
                />
                <Button
                    type={'ghost'}
                    text={'Load More'}
                    sizeName={'small'}
                    onButtonClick={() => this.onLoadMore()}
                    width={'160px'}
                />
            </div>
        );
    }
}

export default UserHome;
