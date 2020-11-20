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
        this.setState({ sections: [...(res)], processing: false });
    };

    render() {
        let { user } = this.props;
        let { sections, processing } = this.state;
        return (
            <div className={"cvList"}>
                {processing && <LoadingModal text="Loading" />}
				<div class="container">
					<div class="row">
						{this.state.sections.length > 0 ? (
							<div class="col-md-8 order-xl-1 order-lg-1 order-md-1 order-2">
								{this.state.sections.map(function(item,index){
									return(
										<div class="col-md-12">
											<div class={"cvList__cvrow"}>
												<span class={"cvList__cvrow_title"}>{item.title}</span>
												<div class="cvrow_buttons">
													<Button
														type={'ghost'}
														text={'Edit'}
														icon={editIconBlue}
														sizeName={'small'}
														iconPosition={'left'}
														to={'/Cvdetail/' + item.id}
													/>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						):(
							<div class="col-md-8 order-xl-1 order-lg-1 order-md-1 order-2">
								<div>CV yok</div>
							</div>
						)}
						<div class="col-md-4 order-xl-2 order-lg-2 order-md-2 order-1">
							<div className={"cvList__profileSection"}>
		                        <Card
		                            type={'profile2'}
		                            getUser={this.props.getUser}
		                            profileObject={{
		                                avatar: user.avatar,
		                                status: 'active',
		                                header: `${user.name} ${user.surname}`,
		                                location: 'Istanbul - Turkey',
		                                sector: 'Software',
		                                position: 'Full Time',
		                                education: 'Graduate',
		                            }}
		                        />
		                        <Button
		                            text={'Create new CV'}
		                            size={'full'}
		                            icon={addIcon}
		                            iconPosition={'right'}
		                            to={'/cvcreate'}
		                        />
		                    </div>
						</div>
					</div>
				</div>
            </div>
        );
    }
}

export default CVList;
