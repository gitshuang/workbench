import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from 'bee/breadcrumb';
import { postMessageToWin } from '@u';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
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
    isBack: PropTypes.bool,
  }
  static defaultProps = {
    goback: () => { },
    data: [],
    history: {},
    isBack: false,
  };

  // 标配
  goBack = () => {
    this.props.history.goBack();
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
    const { data, isBack } = this.props;
    const self = this;
    return (
      <div className={breadcrumbClass} >
        {
          isBack ? null :
            <div style={{ float: "left" }}>
              <a
                onClick={() => this.enhancedGoBack('defaultUrl', -1)}
                onKeyDown={() => this.enhancedGoBack('defaultUrl', -1)}
                role="presentation"
              >Back
            </a>
              <span className={breadcrumbBack}>|</span>
            </div>
        }
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
                  onClick: () => {
                    //增加面包屑点击逻辑，将iframe内部跳转逻辑交给iframe内部通过postmessage注册的回调函数
                    if (window.brmClickPrevent && window.brmClickPrevent.type) {
                      postMessageToWin(window.brmClickPrevent.source, {
                        type: window.brmClickPrevent.type,
                      });
                      dispatchMessageTypeHandler({
                        type: 'popBrm',
                        detail: { index: -1 }
                      });
                      window.brmClickPrevent = null;
                    } else {
                      self.enhancedGoBack(url, i);
                    }
                  },
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
