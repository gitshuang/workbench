import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import Button from 'bee/button';
import Icon from 'pub-comp/icon';
import FormControl from 'bee/form-control';
import ButtonGroup from 'bee/button-group';
import { ButtonBrand } from 'pub-comp/button';
import GoTo from './goto';

import {
  bg,
  bg_wrap,
  wrap,
  clearfix,
  serviceSearch,
  ufSearch,
  appContent,
  menuBtnGroup,
  search_tit,
  search_icon_con,
  searchPanel,
  um_content,
  topTabBtns,
  appsList,
  openMarketBtn,
} from './style.css';

import applicationActions from 'store/root/application/actions';
import rootActions from 'store/root/actions';
const { getAllApplicationList } = applicationActions;
const { requestStart, requestSuccess, requestError } = rootActions;
@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    {
      namespace: 'home',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getAllApplicationList,
  }
)

class serviceClassify extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      currentTab: 0,
      currentLabel: -1,
      currentApps: [],
      apps: [],
      appMaps: {},
      tabs: [],
    }
  }

  componentWillMount() {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getAllApplicationList,
    } = this.props;
    requestStart();
    getAllApplicationList().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return false;
      }
      requestSuccess();
      this.setState({
        apps: payload.applications,
        appMaps: payload.applications.reduce((result, app) => {
          const {
            applicationId,
            applicationName,
            applicationIcon,
            applicationCode,
          } = app;
          result[applicationId] = {
            applicationName,
            applicationIcon,
            applicationCode,
          };
          return result;
        }, {}),
        tabs: payload.labelGroups,
        currentApps: [...payload.applications],
      })
    });
  }

  changeCurrentApp = (currentTab, currentLabel) => {
    const { apps, appMaps, tabs, value } = this.state;
    let currentApps = [];
    if (currentLabel === -1) {
      currentApps = [...apps]
    } else {
      try {
        const appIds = tabs[currentTab].labels[currentLabel].appIds;
        currentApps = appIds.reduce((result, id) => {
          const app = appMaps[id];
          if (app) {
            result.push(app);
          }
          return result;
        }, []);
      } catch (e) {
        console.log(e);
      }
    }
    if (value.trim()) {
      this.btnSearch(currentApps);
    } else {
      this.setState({
        currentApps,
      });
    }
  }

  handleChangeTab = (index) => () => {
    this.setState({
      currentTab: index,
      currentLabel: -1,
    })
    this.changeCurrentApp(index, -1);
  }

  handleChangeLabel = (index) => () => {
    this.setState({
      currentLabel: index,
    })
    this.changeCurrentApp(this.state.currentTab, index);
  }

  btnSearch = (currentApps) => {
    const { value, apps, currentLabel } = this.state;
    if (!currentApps) {
      currentApps = this.state.currentApps;
    }
    if (value.trim()) {
      this.setState({
        currentApps: currentApps.filter(item => item.applicationName.indexOf(value) > -1)
      });
    } else {
      this.handleChangeLabel(currentLabel)();
    }
  }

  renderList() {
    const { currentApps } = this.state;
    return currentApps.map(({ applicationId, applicationCode, applicationIcon, applicationName }) => {
      return (
        <GoTo
          key={`${applicationId}${applicationCode}`}
          code={applicationCode}
          icon={applicationIcon}
          appName={applicationName}
        />
      );
    });
  }
  renderLabels() {
    const { tabs, currentTab, currentLabel } = this.state;
    const labels = (tabs[currentTab] && tabs[currentTab].labels) || [];
    return [
      <Button
        className={currentLabel === -1 ? 'active' : ''}
        key="all"
        onClick={this.handleChangeLabel(-1)}>
        All
      </Button>,
      ...labels.map(({ labelId, labelName }, index) => (
        <Button
          className={currentLabel === index ? 'active' : ''}
          onClick={this.handleChangeLabel(index)}
          key={labelId}>
          {labelName}
        </Button >
      )),
    ];
  }
  //类别、领域
  renderTabs() {
    const {
      currentTab,
      tabs
    } = this.state;

    return tabs.map(({ labelGroupName }, index) => {
      return (
        <Button className={currentTab === index ? 'active' : ''}
          onClick={this.handleChangeTab(index)}
          shape="border"
          key={index}>
          {labelGroupName}
        </Button>
      );
    });
  }
  //输入框修改data数据源
  inputOnChange = (value) => {
    this.setState({
      value,
    });
  }

  openMarket = () => {
    this.props.history.push('/market')
  }

  getCompanyType = () => {
    const { tenantid } = window.diworkContext();
    const {
      userInfo,
      userInfo: {
        allowTenants,
        admin,
      },
    } = this.props;
    if ( !Object.keys(userInfo).length ) { return false; }
    const curTenant = allowTenants.filter((tenant) => {
      return tenant.tenantId === tenantid;
    })[0];
    let type = false;
    if ((curTenant && curTenant.type == 0) && admin) {
      type = true;
    }
    return type;
  }

  onKeyup = (e) => {
    if (e.keyCode === 13) {
      this.btnSearch();
    }
  }

  render() {
    const { value } = this.state;
    const labels = this.renderLabels();
    const list = this.renderList();
    const tabs = this.renderTabs();
    const _appType = this.getCompanyType();

    return (
      <div className={bg + " um-vbox"}>
        <div className={bg_wrap + " um-content um-vbox"}>
          <div className={`${wrap} ${clearfix} um-content um-vbox`}>
            <div className={searchPanel}>
              <FormControl className={serviceSearch} placeholder="Search App" value={value} onKeyDown={this.onKeyup} onChange={this.inputOnChange} />
              <div className={search_icon_con}>
                <span>|</span>
                <Icon type="search" className={ufSearch} onClick={() => { this.btnSearch() }}></Icon>
                <span className={search_tit} onClick={() => { this.btnSearch() }}>Search</span>
              </div>
              {_appType ? <ButtonBrand className={openMarketBtn} onClick={this.openMarket} >App Market</ButtonBrand> : null}
            </div>

            <div className={um_content}>
              <div>
                <div className={topTabBtns}>
                  <ButtonGroup>
                    {tabs}
                  </ButtonGroup>
                </div>
                <div className={menuBtnGroup}>
                  <ButtonGroup vertical>
                    {labels}
                  </ButtonGroup>
                </div>
              </div>
              <div className={appContent + " um-bf1 um-content"}>
                <ul className={`${appsList} ${clearfix}`}>
                  {list}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default serviceClassify;
