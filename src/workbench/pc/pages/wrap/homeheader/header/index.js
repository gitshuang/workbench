import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps, getHost } from '@u';
import Icon from 'pub-comp/icon';
import Header from 'components/header';
import Info from './info';
import SearchContainer from './search';
import Im from '../im';

import actions from 'store/root/actions';
import styles from './index.css';

const {
  lebraNavbar,
  rightBtn,
} = styles;
const {
  requestError,
  requestSuccess
} = actions;

@withRouter
@connect(
  mapStateToProps(
    'retract',
    {
      namespace: 'wrap',
    },
  ),
  {
    requestError,
    requestSuccess,
  }
)
class HeaderContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    retract: PropTypes.bool,
  }

  static defaultProps = {
    iconName: "home",
    retract: false,
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      children,
      onLeftClick,
      onLeftTitleClick,
      iconName,
      leftContent,
      rightContent,
      retract,
    } = this.props;
    const rightArray = Children.toArray(rightContent);
    const portalUrl = getHost('yzone');
    const im = retract ? <Im /> : <div/>;
    const rightContents = rightArray.concat(
      <SearchContainer />,
      <div className={`${rightBtn}`} >
        <a href={portalUrl} target="_blank" >
          <Icon title="我的门户" type="Friends-space" />
        </a>
      </div>,
      im,
      <Info />
    );
    return (
      <Header
        className={lebraNavbar}
        mode="light"
        iconName={iconName}
        leftContent={leftContent}
        rightContent={
          rightContents.map((child, i) => cloneElement(child, { key: i }))
        }
        onLeftTitleClick={onLeftTitleClick ? onLeftTitleClick : onLeftClick}
        onLeftClick={onLeftClick}>

        {children}
      </Header>
    );
  }
}

export default HeaderContainer;
