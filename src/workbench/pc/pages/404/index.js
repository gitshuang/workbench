import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
/*   actions   */
import rootActions from 'store/root/actions';
import workActions from 'store/root/work/actions';
// 组件
import TabsContainer from 'containers/tabs';
import HeaderContainer from 'containers/header';
import BreadcrumbContainer from 'containers/breadcrumb';
import Icon from 'components/icon';
import Pin from 'containers/pin';
import Button from 'bee-button';

import styles from './style.css';

/*  定义style  css-loader  */
const {workArea, sideBarArea, contentArea, hasTab, tabArea, wrap,page404_area,remindWord} = styles;
/* 声明actions */
const {requestStart, requestSuccess, requestError} = rootActions;

@withRouter
@connect(
    mapStateToProps(
        'widthBrm',
        'domainName',
        {
            namespace: '404'
        }
    ),
    {
        requestStart,
        requestSuccess,
        requestError
    }
)
export default class Page404 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loaded: false,
        };
        this.goBack = this.goBack.bind(this);
    }
    goBack() {
        this.props.history.replace('');
    }
  
    render() {
        const {
          domainName,
          widthBrm,
          type,
        } = this.props;
        let iconName = <Icon type="home" style={{fontSize:"24px"}}/>
        return (
          <div className={wrap + " um-win"}>
            <div className="um-header">
              <HeaderContainer onLeftClick={ this.goBack } iconName={iconName} leftContent={ domainName }>
                <div className={"um-box"}>
                  <span>404</span>
                </div>
              </HeaderContainer>
            </div>
            <div className={`um-content ${page404_area}`}>
              <BreadcrumbContainer/>
              <section>
                <div className={remindWord}>很抱歉，当前访问的页面已丢失</div>
                <Button shape="border" ><a href="###">返回首页</a></Button>
              </section>
            </div>
            <Pin outsideClickIgnoreClass={'icon-dingzhi'} />
          </div>
        );
    }
}
