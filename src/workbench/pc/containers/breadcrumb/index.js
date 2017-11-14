import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Breadcrumbs  from 'components/breadcrumb';
import Icon from 'components/icon';
import { mapStateToProps } from '@u';
import actions from 'store/root/work/actions';
import { breadcrumbClass} from './style.css';

const { setExpandedSidebar }
= actions;


class BreadcrumbContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
  };
  setExpended(){
    const { setExpandedSidebar,expanded } = this.props;
    setExpandedSidebar(!expanded);
  }
  render() {
    /*const leftContent = children2Array.filter(
      (v) => v.props.position === 'left'
    );*/

    return (
      <div className={`${breadcrumbClass}`}>
        <i className={`uf uf-navmenu`} onClick={this.setExpended.bind(this)} />
        <Breadcrumbs />
      </div>
    );
  }
}

export default connect(mapStateToProps(
  'expanded',
  {
    namespace: 'work',
  },
  ),
  {
  setExpandedSidebar,
  }
  )(BreadcrumbContainer);
