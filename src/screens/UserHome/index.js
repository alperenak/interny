import React, {Component} from 'react';
import {Link} from "react-router-dom";

/*** Utils ***/
import {getCookie} from "../../utils/cookie";
import store from '../../store';

/*** Styles ***/
import styles from './userhome.scss';

/*** Icons ***/import siemens from "../../assets/siemens.png";
import Card from "../../components/Card";
import SearchSection from "../../components/SearchSection";
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
            let res = await store.getPosts(offset, limit);
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
                    text:'Apply Now',
                    sizeName:'small',
                    to: '/SignUp',
                    width: '85px'
                },
                {
                    type:'ghost',
                    text:'Save Ad',
                    sizeName:'small',
                    to: '/SignUp',
                    width: '85px'
                }
            ],
            description: pst.description,
            note: '987 views'
        }
    ];

    onLoadMore = async () => {
        let {offset, limit} = this.state;
        let res = await store.getPosts(offset + limit, limit);
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
                <Link v-for={(pst, i) in posts} key={i} to={`/PostDetail/${pst[0].id}`}>
                    <Card
                        type={'jobPost'}
                        posts={pst}
                    />
                </Link>
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
