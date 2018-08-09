import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';

import Header from 'containers/header';
import Breadcrumbs from 'components/breadcrumb';
import EnterOption from 'containers/enterOption';
import EnterSetting from './enterSetting';

import {
  pageEnterprise, enterTitle, enterCont, hr, hr2, title, 
} from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter, getEnterInfo } = homeActions;

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    'enterInfo',
    {
      namespace: 'home',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    setCreateEnter,
    getEnterInfo,
  },
)
class Enterprise extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
      replace: PropTypes.func,
    }),
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    userInfo: PropTypes.shape({
      company: PropTypes.string,
    }),
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    getEnterInfo: PropTypes.func,
  };
  static defaultProps = {
    history: {},
    userInfo: {},
    match: {},
    requestSuccess: () => {},
    requestError: () => {},
    getEnterInfo: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      enterData: null,
    };

    this.tenantIndustry = {
      name: 'tenantIndustry',
      value: 'A',
      verify: true,
    };
  }

  componentWillMount() {
    const { requestSuccess, requestError, getEnterInfo } = this.props;
    const param = '123';
    getEnterInfo(param).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return false;
      }
      requestSuccess();
      this.setState({
        enterData: payload,
      });
    });
  }

  setOption = () => {

  }

  setOptherData(obj) {
    this.tenantIndustry.value = obj.value;
  }

  goBack = () => {
    this.props.history.goBack();
  }

  goHome = () => {
    this.props.history.replace('');
  }

  render() {
    const { match: { params }, userInfo: { company } } = this.props;
    const { enterData } = this.state;

    return (
      <div>
        <div className="um-header header">
          <Header onLeftClick={this.goHome} iconName="computer" >
            <div>
              <span>設置企業</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <Breadcrumbs data={[{ name: '設置企業' }]} goback={this.goBack} />
          </div>
        </div>
        <div className={`${pageEnterprise} content`}>
          <div className={enterTitle}>
            <div className={title}>{company}</div>
            <EnterOption
              data={[
                {
                  id: 'aa',
                  name: '解散企業',
                  value: '2',
                  serverApi: 'enter/remove',
                  msg: '解散後，當期企業下的應用將不能再使用，相應的資料也將被刪除，請確認資料已備份',
                },
                {
                  id: 'allowExit',
                  name: '退出企業',
                  value: '3',
                  serverApi: 'enter/leave',
                  msg: '退出後，您在當前企業下的應用將不能再使用，相應的資料也將被刪除，請確認資料已備份',
                },
              ]}
              type="企業"
            />

          </div>
          <hr className={hr} />
          <div className={`${enterCont} enter_setting`} >
            <EnterSetting updateenter="update_enter" data={enterData} />
          </div>
          <hr className={`${hr} ${hr2}`} />
        </div>
      </div>
    );
  }
}
export default Enterprise;

