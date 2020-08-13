import React, {Component} from 'react';
import siemens from "../../assets/siemens.png";
import nanodems from "../../assets/nanodems.png";
import fikrimuhal from "../../assets/Fikrimuhal.png";
import Card from "../../components/Card";

class Posts extends Component {
    render() {
        let items = [1,2,3,4,5,6,7,8,9,0];
        return (
            <div>
                <Card
                    v-for={(item, i) in items}
                    key={i}
                    type={'jobPost'}
                    posts={[
                        {
                            date:'30 days ago',
                            header: i % 3 === 0 ? 'Siemens AG' : (i % 3 === 1 ? 'Nanodems Corp.' : 'Fikrimuhal'),
                            company:'Software Development Engineer',
                            location: 'Istanbul - Turkey',
                            image: i % 3 === 0 ? siemens : (i % 3 === 1 ? nanodems : fikrimuhal),
                            buttons:[
                                {
                                    type:'ghost',
                                    text:'20 Days Internships',
                                    sizeName:'small',
                                    to: '/SignUp'
                                }
                            ],
                            note:'Responsible for the design, coding, unit testing and documentation of software components and features. Build automation test framework. Work with the software engineering team to meet deliverables. ',
                        }
                    ]}
                />
            </div>
        );
    }
}

export default Posts;
