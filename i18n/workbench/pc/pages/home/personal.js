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

import { openService } from 'public/regMessageTypeHandler';

const { closeRequestDisplay, getUserInfo } = homeActions;
const { openExitModal } = teamconfigActions;
const { setCurrent, getAllEnable, getCurrent } = rootActions;
@withRouter
@connect(
  mapStateToProps(
    'requestDisplay',
    'userInfo',
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
      currType: 0,
      userInfo: {},
      personalText: {
        name: '$i18n{personal.js0}$i18n-end',
        edit: '$i18n{personal.js1}$i18n-end',
        info: '$i18n{personal.js2}$i18n-end',
        invitation: '$i18n{personal.js3}$i18n-end',
        exit: '$i18n{personal.js4}$i18n-end',
        markTitle: '$i18n{personal.js5}$i18n-end',
        markDes: '$i18n{personal.js6}$i18n-end',
        do: '$i18n{personal.js7}$i18n-end',
        set: '$i18n{personal.js8}$i18n-end',
        logout: '$i18n{personal.js9}$i18n-end',
        account: '$i18n{personal.js10}$i18n-end',
        dynamic: '$i18n{personal.js11}$i18n-end',
      },

      routers: {
        // openEntersetting: '/entersetting/home',
        openConfig: '/teamconfig',
        openAccount: '/account',
        openManage: '/manage',
        openUserinfo: '/userinfo',
        openInvitation: '/invitation',
        openDynamic: '/dynamic',
      },
      hrefs: [
        {
          href: `${getHost('org')}/download/download.html`,
          name: '$i18n{personal.js12}$i18n-end',
        },
        {
          href: "https://ticket.yonyoucloud.com/ticket/create/KJ",
          name: '$i18n{personal.js13}$i18n-end',
        },
        {
          href: `${getHost('cloundyy')}`,
          name: '$i18n{personal.js14}$i18n-end',
        },
      ],
      TeamData: [
        {
          id: 'allowExit',
          name: '$i18n{personal.js15}$i18n-end',
          value: '3',
          serverApi: 'enter/leave',
          msg: '$i18n{personal.js16}$i18n-end',
        },
        {
          id: 'allowExit',
          name: '$i18n{personal.js17}$i18n-end',
          value: '3',
          serverApi: 'team/leave',
          msg: '$i18n{personal.js18}$i18n-end',
        },
      ],
      language: {
        show: true,
        defaultValue: 'zh',
        onChangeLanguage: this.onChangeLanguage,
        languageList: [
          {
            value: 'zh',
            context: '$i18n{personal.js19}$i18n-end'
          },
          {
            value: 'en',
            context: 'English2'
          },
          {
            value: 'eh',
            context: '$i18n{personal.js20}$i18n-end'
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
      },()=>{
        this.getCompanyType();
      });

    });
    //新增 添加多语的所有语言
    this.getAllEnableFunc();
    //获取默认
    this.getDefaultLang();
  }

  getAllEnableFunc = () => {
    const { getAllEnable } = this.props;
    getAllEnable().then(({ error, payload }) => {
      if (error) {
        return;
      }
      let languageListVal = [], item = {}, defaultValue;
      payload.map((item, index) => {
        item = { value: item.langCode, context: item.dislpayName }
        languageListVal.push(item);
      });

      this.setState({
        language: { ...this.state.language, languageList: languageListVal }
      })
    });
  }

  getDefaultLang = () => {
    const { getCurrent } = this.props;
    getCurrent().then(({ error, payload }) => {
      if (error) {
        return;
      }
      this.setState({
        language: { ...this.state.language, defaultValue: payload.langCode }
      });
    });
  }

  onChangeLanguage = (value) => {
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
    let currType = 1;
    if (curTenant && curTenant.type == 0) {
      currType = 0;
    }
    this.setState({
      currType
    });
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
    const { routers, currType } = this.state;
    if (action === "openConfig" && currType == 0) {
      openService('GZTSYS001');
      return false;
    }
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
      dynamicHide,
    } = this.props;
    const { userInfo, language, hrefs, TeamData, currType } = this.state;
    let { personalText } = this.state;

    const currData = currType == 0 ? TeamData[0] : TeamData[1];
    personalText.name = currType == 0 ? '$i18n{personal.js21}$i18n-end' : '$i18n{personal.js22}$i18n-end';

    const dynamicType = !dynamicHide;
    return (
      <div>
        <Personal
          currType={currType}
          personalText={personalText}
          userInfo={userInfo}
          requestDisplay={requestDisplay}
          exitModal={exitModal}
          closeRequestDisplay={this.closeRequestDisplay}
          openExitModal={this.openExitModal}
          dispatch={this.dispatch}
          hrefs={hrefs}
          logout={logout}
          language={language}
          dynamicType={dynamicType}
        />
        {
          exitModal ?
            <TeamExitModal
              data={currData}
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

