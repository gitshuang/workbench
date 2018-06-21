import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from 'containers/header';
import Icon from 'pub-comp/icon';
import BreadcrumbContainer from 'components/breadcrumb';
import { header } from './style.css';


@withRouter
class HeaderPage extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
      replace: PropTypes.func,
    }),
  };
  static defaultProps = {
    history: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      brm: [{ name: '$i18n{headerPage.js0}$i18n-end' }],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }

  getLeftContent = () => {
    // const {
    //   userInfo: {
    //     logo,
    //   },
    // } = this.props;
    // return (<img src={logo || logoUrl} onClick={this.goback} className={logoImg}/>);
  }

  goback = () => {
    this.props.history.goBack();
  }

  goHome = () => {
    this.props.history.replace('');
  }

  render() {
    const iconName = <Icon type="home" />;
    return (
      <div className={header}>
        <Header
          onLeftClick={this.goHome}
          leftContent={this.getLeftContent()}
          iconName={iconName}
        >
          <span>$i18n{headerPage.js1}$i18n-end</span>
        </Header>
        <div style={{ paddingLeft: '23px', fontSize: '12px' }}>
          <BreadcrumbContainer data={this.state.brm} goback={this.goback} />
        </div>
      </div>
    );
  }
}


export default HeaderPage;
