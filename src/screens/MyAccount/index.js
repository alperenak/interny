import React, {Component, Fragment} from 'react';

/*** Components ***/
import Card from "../../components/Card";
import Button from "../../components/Button";

/*** Utils ***/
import store from "../../store";

/*** Styles ***/
import styles from "./myaccount.scss";
import Input from "../../components/Input";
import {getCookie} from "../../utils/cookie";
import addIcon from "../../icons/add-circular-outlined-white-button.svg";

class MyAccount extends Component {
    state = {
        items: [
            {key: 'email', title: 'E-mail Address'},
            {key: 'password', title: 'Password'},
            {key: 'name', title: 'Name'},
            {key: 'accountName', title: 'Account Name'},
            {key: 'legalName', title: 'Legal Name'},
            {key: 'surname', title: 'Surname'},
            {key: 'membershipStatus', title: 'Membership'},
            {key: 'phone', title: 'Phone'},
            {key: 'location', title: 'Location'},
        ],
        value: '',
    };

    onFileUpload = async (files) => {
        let uploadData = await store.uploadImageType(files[0].type);
        let res = await store.uploadImage(uploadData.url, files[0]);
        if (res) {
            await store.uploadImageKey(uploadData.key);
        }
        await this.props.getUser();
    };

    onChangeClick = (item) => {
        if (item.key !== 'membershipStatus') {
            this.props.createModal({
                header: `Update ${item.title}`,
                content: () => this.renderModalContent(item.title),
                buttons: this.renderModalButtons(item.key)
            });
        }
    };

    renderModalContent(title) {
        return (
            <Input
                type={'text'}
                placeholder={`Enter ${title}`}
                size={'half'}
                onChange={(value) => this.setState({value})}
            />
        );
    }

    renderModalButtons = (key) => [
        {
            type: 'ghost',
            text: 'Cancel',
            sizeName: 'default',
            onButtonClick: () => this.props.closeModal()
        },
        {
            type: 'primary',
            text: 'Update',
            sizeName: 'default',
            onButtonClick: async () => {
                if (getCookie('user') === 'intern') {
                    await store.editIntern(this.props.user.id, {field: key, value: this.state.value});
                } else {
                    await store.editEmployer(this.props.user.id, {field: key, value: this.state.value});
                }
                this.props.closeModal();
                this.setState({ value: '' });
                await this.props.getUser();
            }
        },
    ];
    render() {
        let {user} = this.props;
        let {items} = this.state;
        return (
            <div className={styles.myAccount}>
                <Card header={{text: 'Profile Photo', position: 'start'}} type={'photo'}>
                    <div className={styles.profileImage}>
                        <div v-if={user.avatar || user.logo} className={styles.imageContainer}>
                            <img src={user.avatar || user.logo} alt={'profile photo'}/>
                        </div>
                        <label className={user.avatar || user.logo ? styles.statusCircle : styles.fileInput} htmlFor="fileInput">
                            <img src={addIcon} alt={'icon'} />
                        </label>
                        <input
                            id={'fileInput'}
                            hidden={true}
                            accept={"image/*"}
                            type={'file'}
                            aria-label={""}
                            onChange={(e) => this.onFileUpload(e.target.files)}
                        />
                    </div>
                </Card>
                <Card type={'myAccount'} header={{text: 'My Account', position: 'start'}}>
                    {items.map((item, i) => {
                        return (
                            <div v-if={user[item.key]} key={i} className={styles.MyAccountRow}>
                                <div className={styles.title}>{item.title}</div>
                                <div v-if={item.key !== 'password'} className={styles.text}>
                                    {item.key === 'location' ? user[item.key].city+' - '+user[item.key].country : user[item.key]}
                                </div>
                                <div v-if={item.key === 'password'} className={styles.text}>
                                    **********
                                </div>
                                <Button
                                    type={'ghost'}
                                    sizeName={'tiny'}
                                    text={'Update'}
                                    onButtonClick={() => this.onChangeClick(item)}
                                />
                            </div>
                        );
                    })}
                </Card>
            </div>
        );
    }
}

export default MyAccount;
