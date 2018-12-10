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
    return (
      <div className={`${wrap} `}>
        <div className={` ${page404Area}`}>
          <section>
            <div className={remindWord}>很抱歉，當前訪問的頁面已丟失</div>
          </section>
          <section>
            <Button shape="border" ><a href="/">返回首頁</a></Button>
          </section>
        </div>
        <Pin outsideClickIgnoreClass="icon-dingzhi" />
      </div>
    );
  }
}
