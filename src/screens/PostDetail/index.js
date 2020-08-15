import React, {Fragment, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";

/*** Component ***/
import Card from "../../components/Card";

/*** Utils ***/
import store from "../../store";

/*** Styles ***/
import styles from "./postDetail.scss";
import SearchSection from "../../components/SearchSection";


const PostDetail = () => {
    let {id} = useParams();

    const [posts, setPosts] = useState([]);
    const [company, setCompany] = useState({});

    useEffect(() => {
        async function getPost() {
            let pst = await store.getPost(id);
            setPosts([
                {
                    date: pst.startDate,
                    position: pst.position,
                    company: `${pst.Employer.legalName} - ${pst.jobLocation.city}`,
                    buttons:[
                        {
                            type:'primary',
                            text:'Apply Now',
                            sizeName:'small',
                            to: '/SignUp',
                            width: '85px'
                        }
                    ],
                    description: pst.description,
                    qualifications: pst.qualifications,
                    requirements: pst.requirements,
                    internQuota: pst.internQuota,
                }
            ]);
            setCompany({
                image: pst.Employer.logo,
                header: pst.Employer.legalName,
                location: `${pst.jobLocation.country} - ${pst.jobLocation.city}`,
                sector: pst.industry,
                jobType: pst.jobType,
                empNum: pst.Employer.employeeNumber,
                description: pst.description,
            });
        }

        getPost();
    }, []);

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
};

export default PostDetail;