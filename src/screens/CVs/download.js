import React, { Component } from 'react';

/*** Components ***/
import Card from "../../components/Card";

import CV from "../../components/CV";
/*** Utils ***/
import store from '../../store';
import { getCookie } from "../../utils/cookie";
/*** Styles ***/
import styles from './cvs.scss';
/*** Icons ***/

import LoadingModal from '../../components/LoadingModal';
//import FooterAlternative from "../../components/FooterAlternative";

class CVDownload extends Component {
    state = {
        cv: {},
        processing: true,
        sections:[]
    };

    async componentDidMount() {
        await this.getCVs();
    }
    getCVs = async () => {
        let id = getCookie('user_id');
        let res = await store.getCV(this.props.match.params.id);
        const self = this;
        this.setState({ cv: res, processing: false });
    };

    renderProgressBar(){
        const divs = [];
        for (var i = 1; i <= this.state.cv.total; i++) {
            if(i <= this.state.cv.completeness){
                divs.push(
                    <div class="progress-bar progress-bar-danger" role="progressbar" style={{"width":"14.1%","background-color":"#f69f1e"}}></div>
                );
            }else{
                divs.push(
                    <div class="progress-bar progress-bar-danger" role="progressbar" style={{"width":"14.1%","background-color":"#dfe2f3"}}></div>
                );
            }
        }
        return divs;
    }
    render() {
        let { user } = this.props;
        let { cv, processing } = this.state;
        console.log(user)
        const self = this;
        return (
            <>
                <div className={"cvDetail cvShow"}>
                    {processing && <LoadingModal text="Loading" />}
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                {user.legalName === undefined ? (
                                    <div class="cvTitle">{cv.title}</div>
                                ) : (
                                    null
                                )}
                                <div className={"cvDetail__profileSection"}>
                                    <Card
                                        type={'profile'}
                                        profileObject={{
                                            avatar: cv.avatar,
                                            status: 'active',
                                            header: cv.name,
                                            location: 'Istanbul - Turkey',
                                            sector: 'Software',
                                            position: 'Full Time',
                                            education: 'Graduate',
                                        }}
                                    />

                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">

                                <div className={styles.CVs}>
                                    {typeof this.state.cv.id !== "undefined" ? (
                                        <CV
                                            file={this.state.cv}
                                            getCVs={this.state.cv}
                                        />
                                    ):(null)}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </>
        );
    }
}

export default CVDownload;
