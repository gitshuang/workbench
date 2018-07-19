import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import searchActions from 'store/root/search/actions';
import RouteWithSubRoutes from 'pub-comp/routeWithSubRoutes';
import Header from 'containers/header';
import BreadcrumbContainer from 'components/breadcrumb';
import { umContent } from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const { setSearchHeadData } = searchActions;

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
  },
)
class Search extends Component {
  static propTypes = {
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    setSearchHeadData: PropTypes.func,
    history: PropTypes.shape({
      go: PropTypes.func,
      push: PropTypes.func,
      replace: PropTypes.func,
    }),
    searchHeadData: PropTypes.shape({
      brm: PropTypes.array,
      appName: PropTypes.string,
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    routes: PropTypes.arrayOf(PropTypes.object),
  };
  static defaultProps = {
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    setSearchHeadData: () => { },
    history: {},
    searchHeadData: {},
    location: {},
    routes: [],
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    const {
      setSearchHeadData, searchHeadData: { brm }, searchHeadData: { searchValue },
    } = this.props;
    const appName = brm[0].name;
    if (this.props.location.pathname.indexOf('searchlist') > -1) {
      this.props.history.push(`/search/searchvalue/${!searchValue ? '' : searchValue}`);
    } else {
      this.props.history.replace('');
    }
    setSearchHeadData({ appName, brm: [{ name: appName }] });
  }

  goHome = () => {
    this.props.history.replace('');
  }

  render() {
    const { appName, brm } = this.props.searchHeadData;

    return (
      <div className="um-win">
        <div className="um-header header">
          <Header onLeftClick={this.goHome} iconName="computer" >
            <div>
              <span>{appName}</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <BreadcrumbContainer data={brm} goback={this.goBack} />
          </div>
        </div>
        <div className={`${umContent} content um-box um-content`}>
          {this.props.routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
