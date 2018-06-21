import React, { Component, Children, cloneElement  } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import homeActions from 'store/root/home/actions';
import Header from 'containers/header';
import Breadcrumbs from 'components/breadcrumb';
import { header, um_content, appBreadcrumb } from './style.css';

const { getUserInfo } = homeActions;
@withRouter
@connect(mapStateToProps(),{ getUserInfo })
class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }
  componentWillMount() {
    const { getUserInfo } = this.props;
    getUserInfo().then(({ error, payload }) => {
      if(error){
        return false;
      }
      this.setState({
        userInfo: payload
      });
    });
  }
  goBack = () => {
    const { history } = this.props;
    const {userInfo} = this.state;
    if (!userInfo.allowTenants.length) {
      history.replace('/establish');
    }else{
      history.replace('');
    }
  }
  render() {
    const {
      name,
      children,
      brms,
      goBackHistory,
      goBack,
    } = this.props;
    return (
      <div className="um-win">
        <div className={header}>
          <div className="um-header">
            <Header onLeftClick={this.goBack} iconName={"home"} >
              <div>
                <span>{name}</span>
              </div>
            </Header>
            <div className={appBreadcrumb}>
              <Breadcrumbs data={brms && brms.length ? [...brms, { name: name }] : [{ name: name }]} goback={goBack || this.goBack} />
            </div>
          </div>
        </div>
        <div className={`${um_content} um-box um-content`}>
          {
            Children.map(children, (child) => cloneElement(child))
          }
        </div>
      </div>
    );
  }
}

export default Application;
