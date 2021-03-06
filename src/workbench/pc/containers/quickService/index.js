import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { serviceContainer,service,serviceGroup,serviceBtn,contentDiv,content ,link_cont} from './style.css';
import onClickOutside from 'react-onclickoutside';
import actions from 'store/root/actions';
import { withRouter } from 'react-router-dom';

const { changeQuickServiceHidden } = actions;

@withRouter
@connect(
  mapStateToProps(
    'serviceList',
    'quickServiceDisplay',
  ),
  {
    changeQuickServiceHidden,
  }
)
@onClickOutside
class QuickServiceContainer extends Component {

   constructor(props) {
      super(props);
      this.interval;
      this.state = {
        openAllstate:false
      }
  }

  componentDidMount(){
    const { serviceList } = this.props;
    let b = true;
    b = serviceList.length < 12 ? true : false;
    this.setState({
      openAllstate:b
    })
  }

  handleClickOutside() {
    const { changeQuickServiceHidden, quickServiceDisplay } = this.props;
    if(quickServiceDisplay){
      changeQuickServiceHidden();
    }
  }

  openAllAppList = () => {
    this.handleClickOutside();
    this.props.history.push('/application');
  }

  onClickScroll = (e) => {
    let div = this.refs.list;
    const { serviceList } = this.props;
    let bottom = div.offsetHeight;
    let _top = 0;
    if(this.interval){
      clearInterval(this.interval);
    }else{
      this.interval = setInterval(()=>{
          if(_top>=bottom){
            clearInterval(this.interval);
            this.interval = null;
            _top = 0;
          }else{
           if(div.pageYOffset){
              div.pageYOffset = (div.pageYOffset+3);
           }else if(div.scrollTo){
              div.scrollTo(0, (div.scrollTop + 3));
           }else{
            div.scrollTop = (div.scrollTop+ 3);
           }
            _top += 3;
          }
      })
    }
  }

  onscrollFun =() =>{
     let div = this.refs.list;
     let scrollTop = Math.floor(div.scrollTop || div.pageYOffset || div.scrollTop);
     if(div.scrollHeight == div.clientHeight + scrollTop ) {
          this.setState({
            openAllstate:true
          })
      }else{ 
        if(scrollTop <= 10){
          this.setState({
            openAllstate:false
          })
        }
      }
  }

  openApp(applicationCode) {
    this.handleClickOutside();
    this.props.history.push(`/app/${applicationCode}`);
  }
  render() {
    const { serviceList } = this.props;
    return (
      <div className={serviceContainer}>
        <div className={service} ref="list" onScroll={this.onscrollFun}>
          <ul className="clearfix">
          {
            serviceList.map(({
              applicationCode,
              applicationIcon,
              applicationId,
              applicationName,
            }) => (
              <div key={applicationCode} className={contentDiv} onClick={this.openApp.bind(this, applicationCode)}>
                <li><img src={applicationIcon}/></li>
                <div className={content} title={applicationName}>{applicationName}</div>
              </div>
            ))
          }
          </ul>
        </div>
        {
          this.state.openAllstate ?(
            <div className={link_cont}>
              <a className="link" onClick={this.openAllAppList}>全部应用</a>
            </div>
          ) : (
            <div className={serviceBtn}>
              <button className="btn" onClick={this.onClickScroll}>更多应用</button>
            </div>
          )
        }

      </div>
    );
  }
}

export default QuickServiceContainer;
