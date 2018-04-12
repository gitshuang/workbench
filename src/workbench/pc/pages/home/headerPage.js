import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, GetQueryString } from '@u';
import rootActions from 'store/root/actions';
/*   actions   */
import homeActions from 'store/root/home/actions';
import Icon from 'pub-comp/icon';
import Header from 'containers/header';
import Navbar from 'components/scrollNav';
import { logoImg, header ,imgInner,all_btn,btn_disable,logo_title,title_drop} from './style.css';
import logoUrl from 'assets/image/wgt/yonyou_logo.svg';
import DropdownButton from 'components/dropdown';
const { changeUserInfoDisplay,hideUserInfoDisplay, getUserInfo, changeRequestDisplay ,getSearchEnterOrTeam} = homeActions;

const {
  requestStart,
  requestSuccess,
  requestError
} = rootActions;

@connect(
  mapStateToProps(
    'searchEnterOrTeamList',
    'userInfoDisplay',
    'userInfo',
    {
      namespace: 'home',
    }
  ),
  {
    getSearchEnterOrTeam,
    changeUserInfoDisplay,
    hideUserInfoDisplay,
    changeRequestDisplay,
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
      btnShow:false,
      allowTenants:[],
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.searchEnterOrTeamList != nextProps.searchEnterOrTeamList){
      this.setState({
        allowTenants:nextProps.searchEnterOrTeamList
      })
    }
  }

  changeTenant(tenantId){
    const {
      location: {
        origin,
        pathname,
        hash,
      },
    } = window;
    window.location.replace(
      `${origin?origin:''}${pathname?pathname:''}?tenantId=${tenantId}&switch=true${hash}`,
    );
  }

  closeFun = ()=>{
    const {
      changeUserInfoDisplay,
      hideUserInfoDisplay,
      userInfoDisplay
    } = this.props;
    if(userInfoDisplay){
      hideUserInfoDisplay();
    }
  }

  openMenu=()=>{
    const {getSearchEnterOrTeam} = this.props;
    getSearchEnterOrTeam();
  }

  getLeftContent() {
    const {
      userInfo: {
        logo,
        company,
      },
    } = this.props;
    const {allowTenants} = this.state;
    return (<DropdownButton
    getPopupContainer={() => document.getElementById("home_header")}
    openMenu={this.openMenu}
    closeFun={this.closeFun}
    label={company} type="home" dataItem={
      allowTenants.map(({
        tenantId: name,
        tenantName: value,
        team:type
      }) => {
        return {
          name,
          value,
          type,
          fun: this.changeTenant,
        };
      })
    } />);
  }
  componentDidMount() {
    this.getUserInfo();
    const { changeUserInfoDisplay,changeRequestDisplay } = this.props;
    //console.log(GetQueryString("create"));
    // 判断是否localstorage中包含这个值
    if(localStorage.getItem("create")) {
      changeUserInfoDisplay();
      changeRequestDisplay();
      localStorage.removeItem("create");
    }
      // let ul = document.getElementById("nav_ul");
      // let b = ul.scrollWidth > ul.clientWidth?true:false;
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

  onLeftTitleClick=(e)=>{

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
      <div className={`${header}`} style={background} id="home_header">
        <Header
          onLeftClick={ userInfoDisplay?hideUserInfoDisplay:changeUserInfoDisplay }
          onLeftTitleClick={this.onLeftTitleClick}
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
          {this.state.allBtn?"收起":"显示全部"}
          <Icon type={this.state.allBtn?"upward":"pull-down"} />
        </div>
      </div>
    );
  }
}


export default HeaderPage;
