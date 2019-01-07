import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import inviteActions from 'store/root/invitation/actions';

import Tabs, { TabPane } from 'bee/tabs';
import FormControl from 'bee/form-control';
import { openMess } from 'pub-comp/notification';
import { ButtonBrand } from 'pub-comp/button';
import Header from 'containers/header';
import TagsInput from 'components/tagsInput';
import BreadcrumbContainer from 'components/breadcrumb';

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

  goBack = () => {
    this.props.history.goBack();
  }

  goHome = () => {
    this.props.history.replace('');
  }

  copyLink = () => {
    this.shortUrl.select();
    document.execCommand('copy');
    openMess({
      title: 'Link copied. Send it to your friends now!',
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
        title: 'Please input a correct email address.!',
        duration: 1.5,
        type: 'error',
        closable: false,
      });
    } else {
      const parent = { email: mails, message: message === '' ? 'YouZone-Empowering Employees Organizations' : message, creator };
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

    const { userInfo: { allowTenants, } } = this.props;
    const { tenantid } = window.diworkContext();
    const curTenant = allowTenants && allowTenants.filter(tenant => tenant.tenantId === tenantid)[0];
    const curText = curTenant.type === 0 ? " enterprise directly" : " team directly"; 
    /*
    const tip = (
      <div className={tootip}>
        Link copied. Send it to your friends now
      </div>
    );
    */
    return (
      <div className="um-win">
        <div className="um-header header">
          <Header onLeftClick={this.goHome} >
            <div>
              <span>Invite Member</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <BreadcrumbContainer data={[{ name: 'Invite Member' }]} goback={this.goBack} />
          </div>
        </div>
        <div className={`${wrap} um-content content`}>
          <div className={content}>
            <Tabs
              destroyInactiveTabPane
              defaultActiveKey="1"
              onChange={this.callback}
              className="demo-tabs"
            >
              <TabPane tab="Link" key="1" className={tabPane1}>
                <p>Send the link to your friends</p>
                <div className={urlArea}>
                  <span>Link</span>
                  <input ref={(c) => { this.shortUrl = c; }} type="text" value={url} readOnly />
                </div>
                <ButtonBrand className={copyLinkBtn} onClick={this.copyLink} >Copy Link</ButtonBrand>

              </TabPane>
              <TabPane tab="Email" key="2" className={tabPane2}>

                <p className={firstP}>Send a message to your friends</p>
                <FormControl
                  placeholder="Yonyou Cloud-Empowering Employees Organizations"
                  value={message}
                  onChange={(e) => { this.setOptherData({ name: 'message', value: e }); }}
                />

                <p>Signature</p>
                <FormControl value={creator} onChange={(e) => { this.setOptherData({ name: 'creator', value: e }); }} />

                <p>Enter email addresses and separate them with “;”  </p>
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
                <div className={btnboxIe}>
                  <ButtonBrand className={submitBtn} onClick={this.submit} >Send</ButtonBrand>
                </div>
              </TabPane>
              <TabPane tab="QR Code" key="3" className={tabPane3}>
                <div>
                  <span>{`Scan QR code to enter the${curText}`}</span>
                  <div className={qrCode} id="qrCode">
                    <img alt="" src="/invite/getQRCode" />
                  </div>
                  {/* <ButtonBrand className={printQrBtn} >QR Code</ButtonBrand> */}
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
