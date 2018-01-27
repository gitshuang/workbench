import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
/*   actions   */
import homeActions from 'store/root/home/actions';
import Icon from 'components/icon';
import Header from 'containers/header';
import Navbar from 'components/scrollNav';
import { logoImg, header ,imgInner,all_btn,btn_disable} from './style.css';
import logoUrl from 'assets/image/wgt/yonyou_logo.svg';

const { changeUserInfoDisplay,hideUserInfoDisplay, getUserInfo } = homeActions;

const {
  requestStart,
  requestSuccess,
  requestError
} = rootActions;

@connect(
  mapStateToProps(
    'userInfoDisplay',
    'userInfo',
    {
      namespace: 'home',
    }
  ),
  {
    changeUserInfoDisplay,
    hideUserInfoDisplay,
    getUserInfo,
    requestStart,
    requestSuccess,
    requestError
  }
)
class HeaderPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      allBtn:false, //默认显示一行tab
      btnShow:false
    }
  }

  getLeftContent() {
    const {
      userInfo: {
        logo,
      }
    } = this.props;
    return (<img src={logo || logoUrl} className={logoImg}/>);
  }
  componentDidMount() {
    // this.getUserInfo();
 
      // let ul = document.getElementById("nav_ul");
      // debugger;
      // let b = ul.scrollWidth > ul.clientWidth?true:false;
      // debugger;
      // this.setState({
      //   btnShow:b
      // })

    // setTimeout(() => {
    //   window.scrollTo(0, 1);
    // },0); 
  }

  getUserInfo() {
    const { userInfo: { name }, getUserInfo ,requestStart, requestSuccess, requestError} = this.props;
    if (!name) {
      requestStart();
      getUserInfo().then(({ error, payload }) => {
        if (error) {
          requestError(payload);
        } else {
          requestSuccess();
        }
      });
    }
  }

  allBtnOnclick=()=>{
    console.log("allBtn",this.state.allBtn);
    this.setState({
      allBtn:this.state.allBtn?false:true
    })
  }

  btnShowFn = (btnShow)=>{
    this.setState({
      btnShow
    });
  }

  render() {
    const {
      changeUserInfoDisplay,
      hideUserInfoDisplay,
      userInfoDisplay,
      list,
      headerData
    } = this.props;

    let img = this.props.userInfo.userAvator;
    let imgIcon = null;
    //let class2 = headerData && headerData.className;
    let background = headerData && headerData.background && JSON.parse(headerData.background);
    let titleContent = headerData && headerData.title;
    let titleStyle = headerData && headerData.titleStyle && JSON.parse(headerData.titleStyle);
    let color = headerData && headerData.color;
    if(img){
      imgIcon = <img src={img} className={imgInner} />
    }else{
      imgIcon =  <Icon type="staff" />;
    }

    console.log("this.state.allBtn",this.state.allBtn);
    const _btnShow = this.state.btnShow?null:btn_disable;

    return (
      <div className={`${header}`} style={background}>
        <Header
          onLeftClick={ userInfoDisplay?hideUserInfoDisplay:changeUserInfoDisplay }
          leftContent={this.getLeftContent()}
          iconName={imgIcon}
          color={color}
        >
          <span style={titleStyle}>{titleContent ? titleContent: "首页"}</span>
        </Header>
        {
          list.length > 1 ? (
            <Navbar
              items={list}
              offset={-55}
              duration={500}
              delay={0}
              color={color}
              allBtn={this.state.allBtn}
              btnShowFn={this.btnShowFn}
            />
          ) : null
        }
        <div className={`${all_btn} ${_btnShow}`} onClick={this.allBtnOnclick}>
          {this.state.allBtn?"显示一行":"显示全部"}
          <Icon type={this.state.allBtn?"upward":"pull-down"} />
        </div>
      </div>
    );
  }
}


export default HeaderPage;
