import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Breadcrumbs from 'components/breadcrumb';
import Icon from 'components/icon';
import { mapStateToProps } from '@u';
import actions from 'store/root/work/actions';
import { breadcrumbClass } from './style.css';

const {setExpandedSidebar} = actions;

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
        this.setExpended = this.setExpended.bind(this);
    }

    setExpended() {
        const {setExpandedSidebar, expandedSidebar} = this.props;
        setExpandedSidebar(!expandedSidebar);
    }

    render() {
      const { withSidebar } = this.props;

      return (
        <div className={breadcrumbClass}>
          {
            withSidebar ? ( <i className="uf uf-navmenu" onClick={this.setExpended} />) : null
          }
          <Breadcrumbs data={this.props.brm}/>
        </div>
      );
    }
}

export default BreadcrumbContainer;
