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
        name: 'Enterprise',
        edit: '首页编辑_en',
        info: '员工信息_en',
        invitation: '邀请成员_en',
        exit: '退出_en',
        markTitle: '创建成功_en',
        markDes: '快点邀请成员一起好好工作吧_en',
        do: '我知道了_en',
        set: '设置_en',
        logout: '注销_en',
        account: '账户管理_en',
        dynamic: '动态_en',
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
          name: 'Download Client',
        },
        {
          href: "https://ticket.yonyoucloud.com/ticket/create/KJ",
          name: 'Questions and Feedbacks',
        },
        {
          href: `${getHost('cloundyy')}`,
          name: 'Yonyou Cloud Official Website',
        },
      ],
      TeamData: [
        {
          id: 'allowExit',
          name: 'Simplified Chinese 1',
          value: '3',
          serverApi: 'enter/leave',
          msg: 'Traditional Chinese 3',
        },
        {
          id: 'allowExit',
          name: 'Enterprise',
          value: '3',
          serverApi: 'team/leave',
          msg: 'Quit from Enterprise',
        },
      ],
      language: {
        show: true,
        defaultValue: 'zh',
        onChangeLanguage: this.onChangeLanguage,
        languageList: [
          {
            value: 'zh',
            context: 'After quitting from an enterprise, the Apps under the enterprise will no longer be available, and the corresponding data will be deleted. Please confirm that the data has been backed up.'
          },
          {
            value: 'en',
            context: 'English2'
          },
          {
            value: 'eh',
            context: 'Team'
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
    } = this.props;
    const { userInfo, language, hrefs, TeamData, currType } = this.state;
    let { personalText } = this.state;

    const currData = currType == 0 ? TeamData[0] : TeamData[1];
    personalText.name = currType == 0 ? 'Quit from Team' : 'After quitting from a team, the Apps under the team will no longer be available, and the corresponding data will be deleted. Please confirm that the data has been backed up.';

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

