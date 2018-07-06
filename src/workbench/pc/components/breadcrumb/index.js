import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from 'bee/breadcrumb';
import { breadcrumbClass, breadcrumbBack, itmeHover } from './style.css';

/**
 * data:{name:"",url:""}
 */
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
  enhancedGoBack = (url, i) => {
    const { goback, data } = this.props;
    if (!url) {
      return;
    }
    const backVal = data.length - 1 - i;
    if (goback) {
      if (i === -1) {
        goback(i, 1, url);
      } else {
        goback(i, backVal, url);
      }
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
          onClick={() => this.enhancedGoBack('defaultUrl', -1)}
          onKeyDown={() => this.enhancedGoBack('defaultUrl', -1)}
          role="presentation"
        >返回
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
                  onClick: () => self.enhancedGoBack(url, i),
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
