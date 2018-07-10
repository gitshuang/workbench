import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

/*   actions   */
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';

import Icon from 'pub-comp/icon';
import Header from 'containers/header';

import { header, imgInner, allBtn, btnDisable, logoTitle } from './style.css';


const {
  changeRequestDisplay,
} = homeActions;

const {
  requestStart,
  requestSuccess,
  requestError,
} = rootActions;

@connect(
  mapStateToProps(
    'userInfo',
    {
      namespace: 'home',
    },
  ),
  {
    changeRequestDisplay,
    requestStart,
    requestSuccess,
    requestError,
  },
)
class HeaderPage extends Component {
  static propTypes = {
    changeRequestDisplay: PropTypes.func,
    userInfo: PropTypes.shape({
      userAvator: PropTypes.string,
      company: PropTypes.string,
    }),
    headerData: PropTypes.shape({
      background: PropTypes.string,
    }),
  };
  static defaultProps = {
    changeRequestDisplay: () => {},
    userInfo: {},
    headerData: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      allBtn: false, // 默认显示一行tab
      btnShow: false,
    };
  }

  componentDidMount() {
    const { changeRequestDisplay } = this.props;
    // 判断是否localstorage中包含这个值
    if (localStorage.getItem('create')) {
      changeRequestDisplay();
      localStorage.removeItem('create');
    }
  }

  getLeftContent() {
    const {
      userInfo: {
        company,
      },
    } = this.props;
    return <div className={logoTitle}>{company}</div>;
  }

  allBtnOnclick=() => {
    this.setState({
      allBtn: !this.state.allBtn,
    });
  }

  btnShowFn = (btnShow) => {
    this.setState({
      btnShow,
    });
  }

  render() {
    const {
      headerData,
    } = this.props;

    const img = this.props.userInfo.userAvator;
    let imgIcon = null;
    // let class2 = headerData && headerData.className;
    const background = headerData && headerData.background && JSON.parse(headerData.background);
    const titleContent = headerData && headerData.title;
    const titleStyle = headerData && headerData.titleStyle && JSON.parse(headerData.titleStyle);
    const color = headerData && headerData.color;
    if (img) {
      imgIcon = <img alt="" src={img} className={imgInner} />;
    } else {
      imgIcon = <Icon type="staff" />;
    }
    const BtnShow = this.state.btnShow ? null : btnDisable;

    return (
      <div className={`${header}`} style={background}>
        <Header
          leftContent={this.getLeftContent()}
          iconName={imgIcon}
          color={color}
        >
          <span style={titleStyle}>{titleContent || '$i18n{headerPage.js0}$i18n-end'}</span>
        </Header>

        <div className={`${allBtn} ${BtnShow}`} onClick={this.allBtnOnclick} onKeyDown={this.allBtnOnclick} role="presentation">
          {this.state.allBtn ? '$i18n{headerPage.js1}$i18n-end' : '$i18n{headerPage.js2}$i18n-end'}
          <Icon type={this.state.allBtn ? 'upward' : 'pull-down'} />
        </div>
      </div>
    );
  }
}


export default HeaderPage;
