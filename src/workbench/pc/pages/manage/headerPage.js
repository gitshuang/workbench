import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import homeActions from 'store/root/home/actions';
import Header from 'containers/header';
import Icon from 'components/icon';
import BreadcrumbContainer from 'components/breadcrumb';
import { logoImg, header } from './style.css';
import logoUrl from 'assets/image/wgt/yonyou_logo.svg';

const { changeUserInfoDisplay,hideUserInfoDisplay} = homeActions;

@withRouter
@connect(
  mapStateToProps(
    'userInfoDisplay',
    'userInfo',
    {
      namespace:'home',
    }
  ),
  {
    changeUserInfoDisplay,
    hideUserInfoDisplay
  }
)
class HeaderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brm: [{name:"首页编辑"}]
    }
  }
  getLeftContent() {
    const {
      userInfo: {
        logo,
      }
    } = this.props;
    return (<img src={logo || logoUrl} onClick={this.goback} className={logoImg}/>);
  }
  goback = () => {
    this.props.history.goBack();
  }
  componentDidMount() {
    setTimeout(() => {
      window.scrollTo(0, 1)
    },0);
  }
  render() {
    const {
      changeUserInfoDisplay,
      hideUserInfoDisplay,
      userInfoDisplay,
      list,
    } = this.props;
    let iconName = <Icon type="home"/>
    return (
      <div className={header}>
        <Header
          onLeftClick={ this.goback }
          leftContent={this.getLeftContent()}
          iconName={iconName} >
          <span>首页编辑</span>
        </Header>
        <div style={{paddingLeft:"70px","fontSize":"12px"}}>
          <BreadcrumbContainer data={this.state.brm} goback={this.goback}/>
        </div>
      </div>
    );
  }
}


export default HeaderPage;
