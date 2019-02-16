import React, { Component, Children, cloneElement } from 'react';
import { getHost } from '@u';
import Icon from 'pub-comp/icon';
import Header from 'components/header';
import Info from './info';
import SearchContainer from './search';
import Im from '../im';

import styles from './index.css';

const {
  lebraNavbar,
  rightBtn,
} = styles;

class HeaderContainer extends Component {

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
    } = this.props;
    const rightArray = Children.toArray(rightContent);
    const portalUrl = getHost('yzone');
    const rightContents = rightArray.concat(
      <SearchContainer />,
      <div className={`${rightBtn}`} >
        <a href={portalUrl} target="_blank" >
          <Icon title="" type="Friends-space" />
        </a>
      </div>,
      <Im />,
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
