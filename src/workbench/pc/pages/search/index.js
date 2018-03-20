import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import searchActions from 'store/root/search/actions';
import RouteWithSubRoutes from 'pub-comp/routeWithSubRoutes';
import Header from 'containers/header';
import BreadcrumbContainer from 'components/breadcrumb';
import SearchResult from 'containers/searchResult';
import routes from 'router';
import {header,um_content,appBreadcrumb} from './style.css';

const {requestStart, requestSuccess, requestError} = rootActions;
const {setSearchHeadData} = searchActions;

@withRouter
@connect(
  mapStateToProps(
      'searchHeadData',
      {
          namespace: 'search',
      },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    setSearchHeadData,
  }
)
class Search extends Component {

  constructor(props) {
    super(props);
  }

  goBack =()=> {
    const {setSearchHeadData,searchHeadData:{brm},searchHeadData:{searchValue}} = this.props;
    const appName = brm[0].name;
    if(this.props.location.pathname.indexOf('searchlist')>-1){
      this.props.history.push(`/search/searchvalue/${!searchValue?'':searchValue}`);
    }else{
      this.props.history.replace('');
    }
    setSearchHeadData({appName,brm:[{name:appName}]});
  }

  goHome = () => {
    this.props.history.replace('');
  }

  render() {

    let {appName ,brm }= this.props.searchHeadData;

    return (
      <div className="um-win">
        <div className={header}>
          <div className="um-header">
            <Header onLeftClick={ this.goHome } iconName={"home"} >
              <div>
                <span>{appName}</span>
              </div>
            </Header>
            <div className={appBreadcrumb}>
              <BreadcrumbContainer data={brm} goback={this.goBack}/>
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
