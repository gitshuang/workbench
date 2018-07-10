import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from 'bee/breadcrumb';
import { breadcrumbClass, breadcrumbBack, itmeHover } from './style.css';

class Breadcrumbs extends Component {
  static propTypes = {
    goback: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.object),
    history: PropTypes.shape({
      replace: PropTypes.func,
    }),
  }
  static defaultProps = {
    goback: () => { },
    data: [],
    history: {},
  };

  // 标配
  goBack = () => {
    this.props.history.replace('');
  }

  // 需要新增一个回退函数
  enhancedGoBack = (i) => {
    const { goback } = this.props;
    if (goback) {
      goback(i);
    } else {
      this.goBack();
    }
  }

  render() {
    const { data } = this.props;
    const self = this;
    return (
      <div className={breadcrumbClass} >
        <a
          onClick={() => this.enhancedGoBack(-1)}
          onKeyDown={() => this.enhancedGoBack(-1)}
          role="presentation"
        >$i18n{index.js0}$i18n-end
        </a>
        <span className={breadcrumbBack}>|</span>
        <Breadcrumb>
          {
            data.map(({ name, url }, i) => {
              let itemProps = {
                key: `item${i}`,
                className: '',
                children: name,
              };
              if (i !== data.length - 1 && url) {
                itemProps = {
                  ...itemProps,
                  onClick: () => self.enhancedGoBack(i),
                  className: itmeHover,
                };
              }
              return (
                <Breadcrumb.Item {...itemProps} />
              );
            })
          }
        </Breadcrumb>
      </div>
    );
  }
}

export default Breadcrumbs;
