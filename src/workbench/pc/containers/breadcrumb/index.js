import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import Breadcrumbs from 'components/breadcrumb';
import Icon from 'components/icon';
import { mapStateToProps } from '@u';
import actions from 'store/root/work/actions';
import {
  breadcrumbClass,
  breadcrumb_menu,
  closeMenu,
  breadcrumb_tab,
  breadcrumbArea,
} from './style.css';

const {setExpandedSidebar} = actions;

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
    }
    componentWillReceiveProps() {
      const { withSidebar } = this.props;
      if (!withSidebar) {
        this.closeMenu()
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
    goback = () => {
      window.history.back();
    }
    render() {
      const { withSidebar } = this.props;

      return (
        <div className={breadcrumbClass}>
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
            <Breadcrumbs data={this.props.brm} goback={this.goback}/>
          </div>
        </div>
      );
    }
}

export default BreadcrumbContainer;
