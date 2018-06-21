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
 // removeBrm,
  popBrm,
} = actions;

@withRouter
@connect(
    mapStateToProps(
        'brm',
        {
            namespace: 'work',
        },
    ),
    {
        setExpandedSidebar,
       // removeBrm,
       popBrm
    }
)
class BreadcrumbContainer extends Component {

    static propTypes = {
        withSidebar: PropTypes.bool,
    }

    constructor(props) {
        super(props);
        this.state = {
            breadcrumbMenu:"",
            breadcrumbTab:""
        }
        this.setExpended = this.setExpended.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.back = false;
        this.backVal = 0;
    }
    componentWillReceiveProps(nextProps) {
      const { withSidebar } = this.props;
      if (!withSidebar) {
        this.setExpended();
      }
      console.log(nextProps.brm)
    }
    componentDidUpdate = () =>{
      if(this.back){
        this.back = false;
        //this.props.history.go(-this.backVal);
        alert('gozhiqian'+this.props.history.length)
        this.props.history.back();
        lert('gozhihou'+this.props.history.length)
      }
    }
   
    setExpended() {
        this.setExpandedSidebar(true);
        this.setState({
          breadcrumbMenu:breadcrumb_menu,
          breadcrumbTab:breadcrumb_tab
        })
    }
    setExpandedSidebar(state) {
      const {setExpandedSidebar} = this.props;
      setExpandedSidebar(state);
      const evt = new CustomEvent('resize');
      window.dispatchEvent(evt);
    }
    closeMenu(){
        this.setExpandedSidebar(false);
        this.setState({
          breadcrumbMenu:"",
          breadcrumbTab:""
        })
    }
    goback = (index,backVal) => {
      const { brm,popBrm } = this.props;
      const customBrmUrl = index>=0 && brm && brm.length>0 && brm[brm.length-1][index].url;
      popBrm({index:index,url:window.location.href});
      this.back = true;
      this.backVal = backVal; 
      //  this.props.history.go(-backVal)
      // window.history.go(-backVal);
      // const customBrm = brm.filter(({url})=>{
      //   return url;
      // })
      // if (index < 0) {
      //   window.history.back();
      //   if (customBrm) {
      //     removeBrm(1);
      //   }
      // } else {
      //   const length = brm.length - index - 1;
      //   removeBrm(length);
      //   window.history.go(-length);
      // }
    }
    render() {
      const { withSidebar ,brm} = this.props;

      return (
        <div className={`${breadcrumbClass} menu_work`}>
          {
            withSidebar ? (
              <section
                className={this.state.breadcrumbMenu} >
                菜单
                <Icon
                  title="隐藏菜单"
                  type="error3"
                  className={closeMenu}
                  onClick={this.closeMenu} />
              </section>
            ) : null
          }
          {
            withSidebar ? (
              <Icon
                title="显示菜单"
                type="tabulation"
                className={this.state.breadcrumbTab}
                onClick={this.setExpended} />
            ) : null
          }
          <div className={breadcrumbArea}>
            <Breadcrumbs data={brm && brm.length ? brm[brm.length-1] : [{ name: '' }] } goback={this.goback}/>
          </div>
        </div>
      );
    }
}

export default BreadcrumbContainer;
