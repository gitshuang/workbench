/* tslint:disable:jsx-no-multiline-js */
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import './index.css';

const defaultProps = {
  prefixCls: 'lebra-navbar',
  mode: 'dark',
  iconName: '',
  onLeftClick() {
  },
  className: '',
  children: '',
  leftContent: '',
  rightContent: [],
  onLeftTitleClick: () => { },
};

const propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element,
  mode: PropTypes.string,
  iconName: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  leftContent: PropTypes.element,
  rightContent: PropTypes.arrayOf(PropTypes.element),
  onLeftClick: PropTypes.func,
  onLeftTitleClick: PropTypes.func,
};

class Header extends Component {
  static defaultProps = defaultProps;
  static propTypes = propTypes;

  render() {
    const {
      prefixCls,
      className, children, mode, iconName, leftContent, rightContent, onLeftClick, onLeftTitleClick,
    } = this.props;

    const wrapCls = classnames(prefixCls, `${prefixCls}-${mode}`, className);

    return (
      <div className={wrapCls} >
        <div className={`${prefixCls}-left`} role="button">
          <span className={`${prefixCls}-left-icon`} aria-hidden="true" onClick={onLeftClick}>
            {typeof iconName === 'string' ? <Icon type={iconName} /> : iconName}
          </span>
          <span className={`${prefixCls}-left-content`} onClick={onLeftTitleClick || onLeftClick} onKeyDown={onLeftTitleClick || onLeftClick} role="presentation">{leftContent}</span>
        </div>
        <div className={`${prefixCls}-title`} >{children}</div>
        <div className={`${prefixCls}-right`} >
          {rightContent}
        </div>
      </div>
    );
  }
}

export default Header;
