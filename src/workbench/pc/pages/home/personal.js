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
        name: '企业',
        edit: '首页编辑',
        info: '员工信息',
        invitation: '邀请成员',
        exit: '退出',
        markTitle: '创建成功',
        markDes: '快点邀请成员一起好好工作吧',
        do: '我知道了',
        set: '设置',
        logout: '注销',
        account: '账户管理',
        dynamic: '动态',
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
          name: '下载客户端',
        },
        {
          href: "https://ticket.yonyoucloud.com/ticket/create/KJ",
          name: '问题与反馈',
        },
        {
          href: `${getHost('cloundyy')}`,
          name: '用友云官网',
        },
      ],
      TeamData: [
        {
          id: 'allowExit',
          name: '退出企业',
          value: '3',
          serverApi: 'enter/leave',
          msg: '退出后，您在当前企业下的应用将不能再使用，相应的数据也将被删除，请确认数据已备份',
        },
        {
          id: 'allowExit',
          name: '退出团队',
          value: '3',
          serverApi: 'team/leave',
          msg: '退出后，您在当前团队下的应用将不能再使用，相应的数据也将被删除，请确认数据已备份',
        },
      ],
      language: {
        show: true,
        defaultValue: 'zh',
        onChangeLanguage: this.onChangeLanguage,
        languageList: [
          {
            value: 'zh',
            context: '简体中文1'
          },
          {
            value: 'en',
            context: 'English2'
          },
          {
            value: 'eh',
            context: '繁体中文3'
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
    // 获取当前是企业还是团队
    // this.getCompanyType();
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.userInfo)
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
    return currType;
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
    const { userInfo, language, hrefs, TeamData, } = this.state;
    let { personalText } = this.state;
    let CurrData = {};

    const currType = this.getCompanyType();
    if(currType === 0){
      CurrData = TeamData[0];
      personalText.name = '企业';
    }else {
      CurrData = TeamData[1];
      personalText.name = '团队';
    }

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

