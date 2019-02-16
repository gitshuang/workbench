import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import inviteActions from 'store/root/invitation/actions';

import Tabs, { TabPane } from 'bee/tabs';
import FormControl from 'bee/form-control';
import { openMess } from 'pub-comp/notification';
import { ButtonBrand } from 'pub-comp/button';

import TagsInput from './tagsInput';

import SuccessDialog from './successDialog';


import {
  wrap,
  content,
  urlArea,
  copyLinkBtn,
  submitBtn,
  tabPane1,
  tabPane2,
  tabPane3,
  qrCode,
  firstP,
  btnboxIe
} from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const { getInviteUsersJoinAddress, sendMessage } = inviteActions;

const regMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

// @withRouter
@connect(
  mapStateToProps(
    'inviteJoinAddress',
    {
      key: 'userInfo',
      value: (home, ownProps, root) => {
        return root.userInfo
      }
    },
    {
      namespace: 'invitation',
    },

  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getInviteUsersJoinAddress,
    sendMessage,
  },
)
class Invitation extends Component {
  static propTypes = {
    getInviteUsersJoinAddress: PropTypes.func,
    sendMessage: PropTypes.func,
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    userInfo: PropTypes.shape({
      userName: PropTypes.string,
    }),
    history: PropTypes.shape({
      goBack: PropTypes.func,
      replace: PropTypes.func,
    }),
  };
  static defaultProps = {
    getInviteUsersJoinAddress: () => { },
    sendMessage: () => { },
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    userInfo: {},
    history: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      mails: [],
      successDialogShow: false,
      copy: false,
      creator: props.userInfo.userName,
      message: '',
    };
    // this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    const {
      requestStart, requestSuccess, requestError, getInviteUsersJoinAddress,
    } = this.props;
    requestStart();
    getInviteUsersJoinAddress().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return false;
      }
      this.setState({
        url: payload,
      });
      this.shortUrl.select();
      requestSuccess();
    });
  }

  onMailChange = i => (e) => {
    const { value } = e.target;
    const mails = [...this.state.mails];
    mails[i] = value;
    this.setState({
      mails,
    });
  }

  setOptherData = (obj) => {
    this.state[obj.name] = obj.value;
    this.setState({
      ...this.state,
    });
  }

  copyLink = () => {
    this.shortUrl.select();
    document.execCommand('copy');
    openMess({
      title: '鏈接複製成功，趕快發送給你的小夥伴吧!',
      duration: 2,
      type: 'success',
      closable: false,
    });
  }

  addMail = () => {
    const mails = [...this.state.mails, ''];
    this.setState({
      mails,
    });
  }

  submit = () => {
    const {
      requestStart, requestSuccess, requestError, sendMessage,
    } = this.props;
    const { message, creator } = this.state;
    const mails = this.state.mails.filter(mail => mail && regMail.test(mail));
    if (mails.length <= 0) {
      openMess({
        title: '請輸入正確的郵件地址!',
        duration: 1.5,
        type: 'error',
        closable: false,
      });
    } else {
      const parent = { email: mails, message: message === '' ? '友空間-賦能個人、啟動組織' : message, creator };
      requestStart();
      sendMessage(parent).then(() => {
        requestSuccess();
        this.setState({
          mails: [],
          // successDialogShow: false,
        });
      }, (err) => {
        requestError(err);
      });
      this.setState({
        mails: ['', ''],
        successDialogShow: true,
      });
    }
  }

  handleChange = (tags) => {
    this.setState({ mails: tags });
  }

  printQr = () => {
    const newstr = document.getElementById('qrCode').innerHTML;
    const oldstr = document.body.innerHTML;
    document.body.innerHTML = newstr;
    window.print();
    document.body.innerHTML = oldstr;
    return false;
  }

  closeSuccessDialog = () => {
    this.setState({
      successDialogShow: false,
    });
  }

  render() {
    const {
      url,
      successDialogShow,
      creator,
      message,
    } = this.state;
    return (
      <div className={wrap}>
        {/* <div className=" header">
          <Header onLeftClick={this.goHome} >
            <div>
              <span>邀請成員</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <BreadcrumbContainer data={[{ name: '邀請成員' }]} goback={this.goBack} />
          </div>
        </div> */}
        {/* <div className={`${wrap}  content`}> */}
        <div className={content}>
          <Tabs
            destroyInactiveTabPane
            defaultActiveKey="1"
            onChange={this.callback}
            className="demo-tabs"
          >
            <TabPane tab="鏈接邀請" key="1" className={tabPane1}>
              <p>將鏈接發給小夥伴就可以啦</p>
              <div className={urlArea}>
                <span>鏈接</span>
                <input ref={(c) => { this.shortUrl = c; }} type="text" value={url} readOnly />
              </div>
              <ButtonBrand className={copyLinkBtn} onClick={this.copyLink} >複製鏈接</ButtonBrand>

            </TabPane>
            <TabPane tab="郵件邀請" key="2" className={tabPane2}>

              <p className={firstP}>給你的小夥伴捎句話吧</p>
              <FormControl
                placeholder="用友雲-賦能個人、啟動組織"
                value={message}
                onChange={(e) => { this.setOptherData({ name: 'message', value: e }); }}
              />

              <p>署名</p>
              <FormControl value={creator} onChange={(e) => { this.setOptherData({ name: 'creator', value: e }); }} />

              <p>輸入郵箱地址並用 “;” 隔開</p>
              <TagsInput
                value={this.state.mails}
                addKeys={[13, 186, 59]} // enter,semicolon:chrome186,firefox59
                addOnBlur
                onlyUnique
                addOnPaste
                validationRegex={regMail}
                pasteSplit={data => data.replace(/[\r\n,;]/g, ' ').split(' ').map(d => d.trim())}
                onChange={this.handleChange}
              />
              <div className={btnboxIe}>
                <ButtonBrand className={submitBtn} onClick={this.submit} >確定發送</ButtonBrand>
              </div>
            </TabPane>
            <TabPane tab="二維碼邀請" key="3" className={tabPane3}>
              <div>
                <span>掃描二維碼直接進入團隊</span>
                <div className={qrCode} id="qrCode">
                  <img alt="" src="/invite/getQRCode" />
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
        {/* </div> */}
        <SuccessDialog show={successDialogShow} close={this.closeSuccessDialog} />
      </div>
    );
  }
}

export default Invitation;
