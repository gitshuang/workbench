import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { noop, get, post } from '@u';
import rootActions from 'store/root/actions';
import Header from 'containers/header';
import BreadcrumbContainer from 'components/breadcrumb';
import SuccessDialog from './successDialog';

import {
  header,
  appBreadcrumb,
  wrap,
  content,
  urlArea,
  mailList,
  copyLinkBtn,
  addMailBtn,
  submitBtn,
} from './style.css';

const {requestStart, requestSuccess, requestError} = rootActions;

const maxLength = 20;
const regMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

@withRouter
@connect(
  () => ({}),
  {
    requestStart,
    requestSuccess,
    requestError,
  }
)

class Invitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      mails: ['', ''],
      successDialogShow: false,
    }
    this.goBack = this.goBack.bind(this);
  }
  componentWillMount() {
    get('/getInvitationUrl').then(({ url }) => {
      requestSuccess();
      this.setState({
        url,
      });
      this.refs['shortUrl'].select();
    }, (err) => {
      requestError(err);
    });
  }
  goBack() {
    this.props.history.replace('');
  }
  copyLink = () => {
    this.refs['shortUrl'].select();
    document.execCommand('copy');
  }
  onMailChange = (i) => (e) => {
    const value = e.target.value;
    const mails = [...this.state.mails];
    mails[i] = value;
    this.setState({
      mails,
    });
  }
  addMail = () => {
    const mails = [...this.state.mails, ''];
    this.setState({
      mails,
    });
  }
  submit = () => {
    const mails = this.state.mails.filter(mail => mail && regMail.test(mail));
    if (mails.length) {
      /*
      requestStart();
      post('http://www.baidu.com', { mails }).then((data) => {
        requestSuccess();
        this.setState({
          mails: ['', ''],
          successDialogShow: false,
        });
      }, (err)=>{
        requestError(err);
      });
      */
        console.log(mails);
        this.setState({
          mails: ['', ''],
          successDialogShow: true,
        });
    }
  }
  closeSuccessDialog = () => {
    this.setState({
      successDialogShow: false,
    })
  }
  render() {
    const {
      url,
      mails,
      errorDialogShow,
      successDialogShow,
    } = this.state;
    return (
      <div className="um-win">
        <div className={header}>
          <div className="um-header">
            <Header onLeftClick={ this.goBack.bind(this) } iconName={"home"} >
              <div>
                <span>邀请成员</span>
              </div>
            </Header>
            <div className={appBreadcrumb}>
              <BreadcrumbContainer data={[{name:'邀请成员'}]} goback={this.goBack}/>
            </div>
          </div>
        </div>
        <div className={`${wrap} um-content`}>
          <div className={content}>
            <h2>发送链接邀请</h2>
            <p>将链接发给小伙伴就可以啦</p>
            <div className={urlArea}>
              <input ref='shortUrl' type='text' value={url} readOnly/>
              <button type="button" className={copyLinkBtn} onClick={this.copyLink}>复制链接</button>
            </div>
            <h2>邮件邀请</h2>
            <ul className={mailList}>
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
            </ul>
            <button type="button" className={submitBtn} onClick={this.submit}>确定发送</button>
          </div>
        </div>
        <SuccessDialog show={successDialogShow} close={this.closeSuccessDialog} />
      </div>
    );
  }
}

export default Invitation;
