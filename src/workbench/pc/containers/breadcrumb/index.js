import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import Breadcrumbs from 'components/breadcrumb';
import Icon from 'components/icon';
import { mapStateToProps } from '@u';
import actions from 'store/root/work/actions';
import { breadcrumbClass ,breadcrumb_menu,closeMenu,breadcrumb_tab} from './style.css';

const {setExpandedSidebar} = actions;

@withRouter
@connect(
    mapStateToProps(
        'expandedSidebar',
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

    setExpended() {
        const {setExpandedSidebar, expandedSidebar} = this.props;
        setExpandedSidebar(!expandedSidebar);
        this.setState({
          breadcrumbMenu:breadcrumb_menu,
          breadcrumbTab:breadcrumb_tab
        })
    }

    closeMenu(){
        const {setExpandedSidebar, expandedSidebar} = this.props;
        setExpandedSidebar(!expandedSidebar);
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
            <section className={this.state.breadcrumbMenu?breadcrumb_menu:""}>菜单<Icon type="error3" className={closeMenu} onClick={this.closeMenu}></Icon></section>
          {
            withSidebar ? (<Icon type="tabulation" className={this.state.breadcrumbTab?breadcrumb_tab:""} onClick={this.setExpended} />) : null
          }
          <Breadcrumbs data={this.props.brm} goback={this.goback}/>
        </div>
      );
    }
}

export default BreadcrumbContainer;
