import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps, getContext } from '@u';

import EnterContent from 'pub-comp/enterContent';
import { uploadApplication } from 'store/root/api';
import { texts } from 'yutils/entertext';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter } = homeActions;

import { pageEnterprise, enterTitle, enterCont, hr } from './style.css';
import 'assets/style/Form.css';

@connect(
  mapStateToProps(
    'userInfo',
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    setCreateEnter,
  },
)
class Enterprise extends Component {
  static propTypes = {
    userInfo: PropTypes.shape({
      allowTenants: PropTypes.array,
    }),
  };
  static defaultProps = {
    userInfo: {},
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {

  }

  handleClick = (param, fn) => {
    const {
      requestStart,
      requestSuccess,
      requestError,
      setCreateEnter
    } = this.props;
    requestStart();
    setCreateEnter(param, "create").then(({ error, payload }) => {
      // 此处调用callback
      fn({ error, payload });
      if (error) {
        requestError(payload);
        return;
      }
      requestSuccess();
      localStorage.setItem('create', '1');
    });
  }

  render() {
    const { userInfo } = this.props;
    const { locale } = getContext();
    return (
      <div className={pageEnterprise}>
        <div className={enterTitle} >創建企業</div>
        <hr className={hr} />
        <div className={enterCont} >
          {
            Object.keys(userInfo).length > 0
              ? <EnterContent
                userInfo={userInfo}
                _from="create"
                handleClickFn={this.handleClick}
                buttonText="創建"
                loadingDesc="正在創建企業..."
                uploadApplication={uploadApplication}
                texts={texts}
                lang={locale}
              /> : null
          }
        </div>
      </div>
    );
  }
}
export default Enterprise;

