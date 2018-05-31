import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Personal } from 'diwork-business-components';
// import Personal from 'components/personal';
import { connect } from 'react-redux';
import { mapStateToProps, getHost, logout } from '@u';
import TeamExitModal from 'containers/teamExitModal';

/*   actions   */
import homeActions from 'store/root/home/actions';
import teamconfigActions from 'store/root/teamconfig/actions';
import rootActions from 'store/root/actions';
import { get } from 'http';

const { closeRequestDisplay, getUserInfo } = homeActions;
const { openExitModal } = teamconfigActions;
const { setCurrent, getAllEnable, getCurrent} = rootActions;
@withRouter
@connect(
  mapStateToProps(
    'requestDisplay',
    {
      key: 'exitModal',
      value: (home, ownProps, root) => root.teamconfig.exitModal,
    },
    {
      namespace: 'home',
    },
  ),
  {
    closeRequestDisplay,
    openExitModal,
    getUserInfo,
    setCurrent,
    getAllEnable,
    getCurrent,
  },
)
class Personals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      routers: {
        openEntersetting: '/entersetting/home',
        openTeamconfig: '/teamconfig',
        openAccount: '/account',
        openManage: '/manage',
        openUserinfo: '/userinfo',
        openInvitation: '/invitation',
      },
      hrefs: [
        {
          href: `${getHost('org')}/download/download.html`,
          name: '$i18n{personal.js0}$i18n-end',
        },
        {
          href: 'https://ticket.yonyoucloud.com/ticket/menu/router/myticket/KJ',
          name: '$i18n{personal.js1}$i18n-end',
        },
        {
          href: `${getHost('cloundyy')}`,
          name: '$i18n{personal.js2}$i18n-end',
        },
      ],
      TeamData: [
        {
          id: 'allowExit',
          name: '$i18n{personal.js3}$i18n-end',
          value: '3',
          serverApi: 'enter/leave',
          msg: '$i18n{personal.js4}$i18n-end',
        },
        {
          id: 'allowExit',
          name: '$i18n{personal.js5}$i18n-end',
          value: '3',
          serverApi: 'team/leave',
          msg: '$i18n{personal.js6}$i18n-end',
        },
      ],
      language: {
        show: true,
        defaultValue: 'zh',
        onChangeLanguage: this.onChangeLanguage,
        languageList: [
          {
            value: 'zh',
            context: '$i18n{personal.js7}$i18n-end1'
          },
          {
            value: 'en',
            context: 'English2'
          },
          {
            value: 'eh',
            context: '$i18n{personal.js8}$i18n-end3'
          },
        ]
      }
    };
  }
  
  componentWillMount() {
    const { getUserInfo } = this.props;
    getUserInfo().then(({ error, payload }) => {
      if (error) {
        return;
      }
      this.setState({
        userInfo: payload,
      });
    });
    //新增 添加多语的所有语言
    this.getAllEnableFunc();
    //获取默认
    this.getDefaultLang();
  }
 
  componentDidMount() {

  }

  getAllEnableFunc = () =>{
    const {getAllEnable} = this.props;
    getAllEnable().then(({ error, payload }) => {
      if (error) {
        return;
      }
      let languageListVal = [],item={},defaultValue;
      payload.map((item,index)=>{
        item = {value:item.langCode, context:item.dislpayName}
        languageListVal.push(item);
      });
      
      this.setState({
        language:{...this.state.language, languageList:languageListVal}
      })
    });
  }
  getDefaultLang = () =>{
    const {getCurrent} = this.props;
    getCurrent().then(({ error, payload }) => {
      if (error) {
        return;
      }
      this.setState({
        language:{...this.state.language,defaultValue:payload.langCode}
      })
    });
   
  }
  onChangeLanguage = (value) =>{
    this.props.setCurrent(value).then(({ error, payload }) => {
      if (error) {
        return;
      }
      window.location.reload();
    });;
  
  }
  getCompanyType = () => {
    const { tenantid } = window.diworkContext();
    const {
      userInfo: {
        allowTenants,
      },
    } = this.state;
    const curTenant = allowTenants && allowTenants.filter(tenant => tenant.tenantId === tenantid)[0];
    let name = '$i18n{personal.js9}$i18n-end';
    if (curTenant && curTenant.type == 0) {
      name = '$i18n{personal.js10}$i18n-end';
    }
    return name;
  }

  closeRequestDisplay = () => {
    const { closeRequestDisplay } = this.props;
    closeRequestDisplay();
  }

  openExitModal = () => {
    const { openExitModal } = this.props;
    openExitModal();
  }

  dispatch = (action) => {
    const { routers } = this.state;
    if (routers[action]) {
      this.openNewRouter(routers[action]);
    }
  }

  openNewRouter = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    const {
      requestDisplay,
      exitModal,
    } = this.props;
    const { userInfo, language } = this.state;
    const { hrefs, TeamData } = this.state;

    const titleType = this.getCompanyType();
    const CurrData = titleType == '$i18n{personal.js11}$i18n-end' ? TeamData[0] : TeamData[1];
    return (
      <div>
        <Personal
          userInfo={userInfo}
          requestDisplay={requestDisplay}
          exitModal={exitModal}
          closeRequestDisplay={this.closeRequestDisplay}
          openExitModal={this.openExitModal}
          dispatch={this.dispatch}
          titleType={titleType}
          hrefs={hrefs}
          logout={logout}
          language={this.state.language}
        />
        {
          exitModal ?
            <TeamExitModal
              data={CurrData}
              isManage={userInfo.admin}
              userId={userInfo.userId}
              close
            /> : null
        }
      </div>
    );
  }
}
export default Personals;

