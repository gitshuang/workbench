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
        name: '企業',
        edit: '首頁編輯',
        info: '員工資訊',
        invitation: '邀請成員',
        exit: '退出',
        markTitle: '創建成功',
        markDes: '快點邀請成員一起好好工作吧',
        do: '我知道了',
        set: '設置',
        logout: '註銷',
        account: '帳戶管理',
        dynamic: '動態',
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
          name: '下載用戶端',
        },
        {
          href: "https://ticket.yonyoucloud.com/ticket/create/KJ",
          name: '問題與回饋',
        },
        {
          href: `${getHost('cloundyy')}`,
          name: '用友雲官網',
        },
      ],
      TeamData: [
        {
          id: 'allowExit',
          name: '退出企業',
          value: '3',
          serverApi: 'enter/leave',
          msg: '退出後，您在當前企業下的應用將不能再使用，相應的資料也將被刪除，請確認資料已備份',
        },
        {
          id: 'allowExit',
          name: '退出團隊',
          value: '3',
          serverApi: 'team/leave',
          msg: '退出後，您在當前團隊下的應用將不能再使用，相應的資料也將被刪除，請確認資料已備份',
        },
      ],
      language: {
        show: true,
        defaultValue: 'zh',
        onChangeLanguage: this.onChangeLanguage,
        languageList: [
          {
            value: 'zh',
            context: '简体中文'
          },
          {
            value: 'en',
            context: 'English2'
          },
          {
            value: 'eh',
            context: '繁体中文'
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
    personalText.name = currType == 0 ? '企業' : '團隊';

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

