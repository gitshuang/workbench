import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Personal } from 'diwork-business-components';
// import Personal from 'components/personal';
import { connect } from 'react-redux';
import { mapStateToProps, getHost, logout } from '@u';
import TeamExitModal from 'containers/teamExitModal';

import Icon from 'pub-comp/icon';

/*   actions   */
import homeActions from 'store/root/home/actions';
import teamconfigActions from 'store/root/teamconfig/actions';
import rootActions from 'store/root/actions';

import { openService, openHomePage } from 'public/regMessageTypeHandler';

const { closeRequestDisplay } = homeActions;
const { openExitModal } = teamconfigActions;
const { setCurrent } = rootActions;
@withRouter
@connect(
  mapStateToProps(
    'requestDisplay',
    {
      key: 'userInfo',
      value: (home, ownProps, root) => {
        return root.userInfo
      }
    },
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
    setCurrent,
  },
)
class Personals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currType: 0,
      userInfo: {},
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
          name: '',
        },
        {
          href: "https://ticket.yonyoucloud.com/ticket/create/KJ",
          name: '',
        },
        {
          href: `${getHost('cloundyy')}`,
          name: '',
        },
      ],
      TeamData: [
        {
          id: 'allowExit',
          name: '',
          value: '3',
          serverApi: 'enter/leave',
          msg: '',
        },
        {
          id: 'allowExit',
          name: '',
          value: '3',
          serverApi: 'team/leave',
          msg: '',
        },
      ],
      language: {
        show: true,
        defaultValue: 'zh',
        onChangeLanguage: this.onChangeLanguage,
        languageList: [
          {
            value: 'zh',
            context: ''
          },
          {
            value: 'en',
            context: 'English2'
          },
          {
            value: 'eh',
            context: ''
          },
        ]
      },
      icons: [
        {
          element: <Icon title="" type="Internet2" />,
          background: 'blue',
          arguments: 'openDynamic',
        },
        {
          element: <Icon title="" type="glory" />,
          background: 'red',
          arguments: 'openHomepage',
        },
      ],
    };
  }

  componentWillMount() {
    // const { getUserInfo } = this.props;
    // getUserInfo().then(({ error, payload }) => {
    //   if (error) {
    //     return;
    //   }
    //   this.setState({
    //     userInfo: payload,
    //   },()=>{
    //     this.getCompanyType();
    //   });

    // });
    //新增 添加多语的所有语言
    this.getAllEnableFunc();
  }

  componentDidMount() {
    const { userInfo } = this.props;
    this.setState({
      userInfo: userInfo,
    }, () => {
      this.getCompanyType();
    });
  }

  getAllEnableFunc = () => {
    const { locale, multilist } = window.diworkContext();
    let languageListVal = [];
    if (multilist && JSON.parse(multilist).length) {
      JSON.parse(multilist).map((item) => {
        item = { value: item.langCode, context: item.dislpayName }
        languageListVal.push(item);
      });
      let newObj = Object.assign({}, this.state.language);
      newObj.languageList = languageListVal;
      newObj.defaultValue = locale ? locale : 'zh_CN';
      this.setState({
        language: newObj,
      }, () => {
        //获取默认
        this.getDefaultLang(locale);
      })
    }
  }

  getDefaultLang = (locale) => {
    this.setState({
      language: { ...this.state.language, defaultValue: locale ? locale : 'zh_CN' }
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
    const { routers, currType, userInfo } = this.state;
    if (action === "openConfig") {
      openService({
        id: 'teamconfig',
        type: 'local',
        url: 'Teamconfig',
        title: '',
      });
      return false;
    }
    if (action === "openConfig" && currType == 0) {
      openService('GZTSYS001');
      return false;
    }
    if (action === "openHomepage") {
      openHomePage({
        userId: userInfo.userId,
        key: 'honor'
      });
      return false;
    }
    if (action === "openDynamic") {
      openHomePage({
        userId: userInfo.userId,
        key: 'speak'
      });
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
      icons
    } = this.props;
    const { userInfo, language, hrefs, TeamData, currType } = this.state;

    const currData = currType == 0 ? TeamData[0] : TeamData[1];
    const { locale } = window.diworkContext();
    if (language.defaultValue !== locale) return null;
    return (
      <div>
        <Personal
          currType={currType}
          userInfo={userInfo}
          requestDisplay={requestDisplay}
          exitModal={exitModal}
          closeRequestDisplay={this.closeRequestDisplay}
          openExitModal={this.openExitModal}
          dispatch={this.dispatch}
          hrefs={hrefs}
          logout={logout}
          language={language}
          icons={icons || this.state.icons}
          locale={locale}
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
