import React, { Component } from 'react';
/*** Components ***/
import Card from "../../components/Card";
import Button from "../../components/Button";
import Form from "../../components/Form";
import CV from "../../components/CV";
/*** Utils ***/
import store from '../../store';
import { getCookie } from "../../utils/cookie";
import { formButtons, formItems } from "./formItems";
import { formCVData, onCVFormChange } from "../../utils/functions";
/*** Styles ***/
import styles from './cvs.scss';
/*** Icons ***/
import addIcon from '../../icons/add-circular-outlined-white-button.svg';
import editIcon from '../../icons/note-outlined-symbol.svg';
import editIconBlue from '../../icons/note-outlined-symbol-blue.svg';
import binIcon from '../../icons/recycling-bin.svg';
import binIconBlue from '../../icons/recycling-bin-blue.svg';
import LoadingModal from '../../components/LoadingModal';

class CVList extends Component {
    state = {
        sections: [],
        processing: true
    };

    async componentDidMount() {
        await this.getCVs();

    }

    getCVs = async () => {
        let id = getCookie('user_id');
        let res = await store.getCVs(id);
		window.location.href = '/Cvdetail/' + res[0].id;
        //this.setState({ sections: [...(res)], processing: false });
    };

    render() {
        let { user } = this.props;
        let { sections, processing } = this.state;
        return (
            <div className={"cvList"}>
                {processing && <LoadingModal text="Loading" />}
            </div>
        );
    }
}

export default CVList;
