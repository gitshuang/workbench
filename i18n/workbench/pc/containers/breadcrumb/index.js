import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import Breadcrumbs from 'components/breadcrumb';
import Icon from 'pub-comp/icon';
import { mapStateToProps } from '@u';
import actions from 'store/root/work/actions';
import {
  breadcrumbClass,
  breadcrumb_menu,
  closeMenu,
  breadcrumb_tab,
  breadcrumbArea,
} from './style.css';

const {
  setExpandedSidebar,
  popBrm,
  popUrl
} = actions;

@withRouter
@connect(
  mapStateToProps(
    'brm',
    'backUrl',
    {
      namespace: 'work',
    },
  ),
  {
    setExpandedSidebar,
    popBrm,
    popUrl
  }
)
class BreadcrumbContainer extends Component {

  static propTypes = {
    withSidebar: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      breadcrumbMenu: "",
      breadcrumbTab: ""
    }
    this.back = false;
    this.backVal = 0;
    this.backClickUrl = '';//线上点击返回需要go(-2),其他需要go(-1)
  }

  componentDidMount(){
    this.setExpended();
  }

  // componentWillReceiveProps(nextProps) {
  //   const { withSidebar } = this.props;
  //   if (!withSidebar) {
  //     this.setExpended();
  //   }
  // }

  setExpended = () => {
    this.setExpandedSidebar(true);
    this.setState({
      breadcrumbMenu: breadcrumb_menu,
      breadcrumbTab: breadcrumb_tab
    })
  }

  setExpandedSidebar(state) {
    const { setExpandedSidebar } = this.props;
    setExpandedSidebar(state);
    const evt = new CustomEvent('resize');
    window.dispatchEvent(evt);
  }

  closeMenu = () => {
    this.setExpandedSidebar(false);
    this.setState({
      breadcrumbMenu: "",
      breadcrumbTab: ""
    })
  }

  goback = (index) => {
    const { backUrl, popBrm, history, match, brm, popUrl } = this.props;
    // const {
    //   params: {
    //     code,
    //     type,
    //   },
    // } = match;
    // 取brm 最后的值
    const data = brm[brm.length - 1];

    // TODO 现在只是做的 如果是面包屑点击 按照返回规则， 点击返回按钮只切换服务
    if (index > -1) {
      // key 最大为0
      const key = index + 1 - data.length
      history.go(key);
      popBrm({ index: -key });
      return false;
    }
    // 下边 方法为 如果实现返回一级一级的   先注释  担心哪天被还原
    // let flag = false;
    // for (var i = data.length - 1; i >= 0; i--) {
    //   if (data[i].addBrm) {
    //     flag = true;
    //     break;
    //   }
    // }
    // if (flag) {
    //   if (index > -1) {
    //     const key = index + 1 - data.length
    //     history.go(key);
    //     popBrm({ index: key });
    //   } else {
    //     history.goBack();
    //     popBrm({ index: -1 });
    //   }
    //   return false;
    // }
    // backUrl.pop();
    popUrl();
    if (backUrl.length) {
      const currUrl = backUrl[backUrl.length - 1];
      history.replace(`/${currUrl.type}/${currUrl.code}/${currUrl.subCode}`);
    } else {
      history.replace('');
    }
  }


  render() {
    const { withSidebar, brm } = this.props;

    return (
      <div className={`${breadcrumbClass} menu_work`}>
        {
          withSidebar ? (
            <section
              className={this.state.breadcrumbMenu} >
              $i18n{index.js0}$i18n-end
                <Icon
                title="$i18n{index.js1}$i18n-end"
                type="error3"
                className={closeMenu}
                onClick={this.closeMenu} />
            </section>
          ) : null
        }
        {
          withSidebar ? (
            <Icon
              title="$i18n{index.js2}$i18n-end"
              type="tabulation"
              className={this.state.breadcrumbTab}
              onClick={this.setExpended} />
          ) : null
        }
        <div className={breadcrumbArea}>
          <Breadcrumbs
            data={brm && brm.length ? brm[brm.length - 1] : [{ name: '' }]}
            goback={this.goback}
          />
        </div>
      </div>
    );
  }
}

export default BreadcrumbContainer;
