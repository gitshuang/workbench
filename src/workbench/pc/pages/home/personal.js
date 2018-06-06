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


const { closeRequestDisplay, getUserInfo } = homeActions;
const { openExitModal } = teamconfigActions;

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
        openDynamic: '/dynamic',
      },
      hrefs: [
        {
          href: `${getHost('org')}/download/download.html`,
          name: '下载客户端',
        },
        {
          href: 'https://ticket.yonyoucloud.com/ticket/menu/router/myticket/KJ',
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
        onChangeLanguage: (value) => {console.log(value)},
        languageList: [
          {
            value: 'zh',
            context: '简体中文'
          },
          {
            value: 'en',
            context: 'English'
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
      });
    });
  }

  componentDidMount() {

  }

  getCompanyType = () => {
    const { tenantid } = window.diworkContext();
    const {
      userInfo: {
        allowTenants,
      },
    } = this.state;
    const curTenant = allowTenants && allowTenants.filter(tenant => tenant.tenantId === tenantid)[0];
    let name = '团队';
    if (curTenant && curTenant.type == 0) {
      name = '企业';
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
    const CurrData = titleType == '企业' ? TeamData[0] : TeamData[1];
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

