import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { title } from './style.css';
import workActions from 'store/root/work/actions';
import onClickOutside from 'react-onclickoutside';

const { titleServiceHidden, } = workActions;

@connect(mapStateToProps(
  'titleServiceType',
  {
    "namespace":"work"
  }
  ),

  {
    titleServiceHidden
  }
)
@onClickOutside
class QuickServiceContainer extends Component {
  handleClickOutside(evt) {
    const {titleServiceHidden, titleServiceType } = this.props;
    if(titleServiceType){
      titleServiceHidden();
    }
  }
  render() {
    const { titleServiceType } = this.props;
    return (
      <div className={title + ' um-css3-hc'} style={{ display: titleServiceType ? 'block' : 'none' }} >
        <div>
          <h4>相关服务</h4>
          <ul className="clearfix">
            <li>
              <button className="btn btn-gray">简历</button>
            </li>
            <li>
              <button className="btn btn-gray">邮件</button>
            </li>
            <li>
              <button className="btn btn-gray">登记表</button>
            </li>
            <li>
              <button className="btn btn-gray">Offer</button>
            </li>
            <li>
              <button className="btn btn-gray">审批</button>
            </li>
            <li>
              <button className="btn btn-gray">转正</button>
            </li>
            <li>
              <button className="btn btn-gray">合同</button>
            </li>
            <li>
              <button className="btn btn-gray">组织架构</button>
            </li>
          </ul>
        </div>

      </div>
    );
  }
}

export default QuickServiceContainer;
