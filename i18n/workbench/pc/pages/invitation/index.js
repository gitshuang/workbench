import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import inviteActions from 'store/root/invitation/actions';

import Tabs, { TabPane } from 'bee/tabs';
import FormControl from 'bee/form-control';
import Message from 'bee/message';
import { ButtonBrand } from 'pub-comp/button';
import Header from 'containers/header';
import TagsInput from 'components/tagsInput';
import BreadcrumbContainer from 'components/breadcrumb';

import SuccessDialog from './successDialog';


import {
  header,
  appBreadcrumb,
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
} from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const { getInviteUsersJoinAddress, sendMessage } = inviteActions;

const regMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

@withRouter
@connect(
  mapStateToProps(
    'inviteJoinAddress',
    {
      key: 'userInfo',
      value: (invitation, ownProps, root) => root.home.userInfo,
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
    getInviteUsersJoinAddress: () => {},
    sendMessage: () => {},
    requestStart: () => {},
    requestSuccess: () => {},
    requestError: () => {},
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
    this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    const {
      requestStart, requestSuccess, requestError, getInviteUsersJoinAddress,
    } = this.props;
    requestStart();
    getInviteUsersJoinAddress().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
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

  setOptherData=(obj) => {
    this.state[obj.name] = obj.value;
    this.setState({
      ...this.state,
    });
  }

  goBack() {
    this.props.history.goBack();
  }

  goHome = () => {
    this.props.history.replace('');
  }

  copyLink = () => {
    this.shortUrl.select();
    document.execCommand('copy');

    Message.create({
      content: '$i18n{index.js0}$i18n-end!', duration: 1.5, position: 'topLeft', color: 'success',
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
      Message.create({
        content: '$i18n{index.js1}$i18n-end!', duration: 1.5, position: 'topLeft', color: 'warning',
      });
    } else {
      const parent = { email: mails, message: message === '' ? '$i18n{index.js2}$i18n-end-$i18n{index.js3}$i18n-end、$i18n{index.js4}$i18n-end' : message, creator };
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
    /*
    const tip = (
      <div className={tootip}>
        $i18n{index.js5}$i18n-end
      </div>
    );
    */
    return (
      <div className="um-win">
        <div className={header}>
          <div className="um-header">
            <Header onLeftClick={this.goHome} iconName="home" >
              <div>
                <span>$i18n{index.js6}$i18n-end</span>
              </div>
            </Header>
            <div className={appBreadcrumb}>
              <BreadcrumbContainer data={[{ name: '$i18n{index.js7}$i18n-end' }]} goback={this.goBack} />
            </div>
          </div>
        </div>
        <div className={`${wrap} um-content`}>
          <div className={content}>
            <Tabs
              destroyInactiveTabPane
              defaultActiveKey="1"
              onChange={this.callback}
              className="demo-tabs"
            >
              <TabPane tab="$i18n{index.js8}$i18n-end" key="1" className={tabPane1}>
                <p>$i18n{index.js9}$i18n-end</p>
                <div className={urlArea}>
                  <span>$i18n{index.js10}$i18n-end</span>
                  <input ref={(c) => { this.shortUrl = c; }} type="text" value={url} readOnly />
                </div>
                <ButtonBrand className={copyLinkBtn} onClick={this.copyLink} >$i18n{index.js11}$i18n-end</ButtonBrand>

              </TabPane>
              <TabPane tab="$i18n{index.js12}$i18n-end" key="2" className={tabPane2}>

                <p className={firstP}>$i18n{index.js13}$i18n-end</p>
                <FormControl
                  placeholder="$i18n{index.js14}$i18n-end-$i18n{index.js15}$i18n-end、$i18n{index.js16}$i18n-end"
                  value={message}
                  onChange={(e) => { this.setOptherData({ name: 'message', value: e }); }}
                />

                <p>$i18n{index.js17}$i18n-end</p>
                <FormControl value={creator} onChange={(e) => { this.setOptherData({ name: 'creator', value: e }); }} />

                <p>$i18n{index.js18}$i18n-end “;” $i18n{index.js19}$i18n-end</p>
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
                {/* <ul className={mailList}>
                {
                  mails.map((mail, i) => {
                    return (
                      <li key={i}>
                        <input type='text' value={mail} onChange={this.onMailChange(i)}/>
                        {
                          i + 1 === mails.length && mails.length < maxLength ? (
                            <button className={addMailBtn} onClick={this.addMail}>+</button>
                          ) : null
                        }
                      </li>
                    );
                  })
                }
                </ul> */}
                <ButtonBrand className={submitBtn} onClick={this.submit} >$i18n{index.js20}$i18n-end</ButtonBrand>
              </TabPane>
              <TabPane tab="$i18n{index.js21}$i18n-end" key="3" className={tabPane3}>
                <div>
                  <span>$i18n{index.js22}$i18n-end</span>
                  <div className={qrCode} id="qrCode">
                    <img alt="" src="/invite/getQRCode" />
                  </div>
                  {/* <ButtonBrand className={printQrBtn} >$i18n{index.js23}$i18n-end</ButtonBrand> */}
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <SuccessDialog show={successDialogShow} close={this.closeSuccessDialog} />
      </div>
    );
  }
}

export default Invitation;