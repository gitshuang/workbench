import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
/*   actions   */
import rootActions from 'store/root/actions';
// 组件
import Pin from 'containers/pin';
import Button from 'bee/button';

import styles from './style.css';

/*  定义style  css-loader  */
const { wrap, page404Area, remindWord } = styles;
/* 声明actions */
const { requestStart, requestSuccess, requestError } = rootActions;

@withRouter
@connect(
  mapStateToProps(
    'widthBrm',
    {
      namespace: '404',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
  },
)
export default class Page404 extends Component {
  static propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func,
    }),
  };
  static defaultProps = {
    history: {},
  };
  constructor(props) {
    super(props);
    this.state = {
    };
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.history.replace('');
  }

  render() {
    // let iconName = <Icon title="返回首页" type="home" style={{ fontSize: "24px" }} />
    return (
      <div className={`${wrap} um-win`}>
        <div className={`um-content ${page404Area}`}>
          <section>
            <div className={remindWord}>Sorry, this page is not available.</div>
          </section>
          <section>
            <Button shape="border" ><a href="/">Homepage</a></Button>
          </section>
        </div>
        <Pin outsideClickIgnoreClass="icon-dingzhi" />
      </div>
    );
  }
}
