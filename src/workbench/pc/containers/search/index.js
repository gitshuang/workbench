import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { search } from './style.css';
import onClickOutside from 'react-onclickoutside';
import actions from 'store/root/actions';
import { withRouter } from 'react-router-dom';

const {changeSearchHidden} = actions;

@withRouter
@connect(mapStateToProps(
  'searchDisplay',
  'searchAnimate'
  ),
  {
    changeSearchHidden,
  }
)
@onClickOutside
class SearchContainer extends Component {

  handleClickOutside(evt) {
    const {changeSearchHidden,searchDisplay,searchAnimate } = this.props;
    if(searchDisplay){
      changeSearchHidden();
    }
  }

  openApplication = () => {
    console.log(this.props)
    const {changeSearchHidden } = this.props;
    changeSearchHidden();
    this.props.history.push('/application');;
  }

  render() {
    const { searchDisplay,searchAnimate } = this.props;
    return (
      <div className={`${search} ${searchAnimate}` } >
        <input className="searchText" type="text"/>
      </div>
    );
  }
}

export default SearchContainer;
