import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import RouteWithSubRoutes from 'components/routeWithSubRoutes';
import Header from 'containers/header';
import BreadcrumbContainer from 'components/breadcrumb';
import SearchResult from 'containers/searchResult';
import routes from 'router';
import {header,um_content,appBreadcrumb} from './style.css';
const {requestStart, requestSuccess, requestError} = rootActions;
// const {changeUserInfoDisplay, getWorkList} = homeActions;

@withRouter


class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      brm: [{name:"搜索结果"}],
    }
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    if(this.props.location.pathname.indexOf('searchlist')>-1){
      this.props.history.push('/search');
    }else{
      this.props.history.replace('');
    }
    this.setState({
        brm:[{name:"搜索结果"}],
      });
  }
  shouldComponentUpdate() {
    if(this.props.location.pathname.indexOf('searchlist')>-1){
      this.setState({
        brm:[{name:"搜索结果"},{name:"全部结果"}],
      });
    }else{
      this.setState({
        brm:[{name:"搜索结果"}],
      });
    }
    return true; 
  }

  render() {
    return (
      <div className="um-win">
        <div className={header}>
          <div className="um-header">
            <Header onLeftClick={ this.goBack.bind(this) } iconName={"search"} >
              <div>
                <span>搜索结果</span>
                
              </div>
            </Header>
            <div className={appBreadcrumb}>
              <BreadcrumbContainer data={this.state.brm} goback={this.goBack}/>
            </div>
          </div>
        </div>
        <div className={um_content + " um-box um-content"}>
        {this.props.routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
          
        </div>
      </div>
    );
  }
}

export default Search;
