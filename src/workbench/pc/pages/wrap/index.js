import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import RouteWithSubRoutes from 'pub-comp/routeWithSubRoutes';
import RootActions from 'store/root/actions';
import Homeheader from './homeheader';
import Homecontent from './homecontent';
import Pin from './pin';
import History from '../history';

const { getFolders } = RootActions;
@withRouter
@connect(
  mapStateToProps(
    'activeCarrier',
    'pinDisplay',
  ),
  {
    getFolders,
  },
)
class Wrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyShow:false,//
    };
  }

  componentDidMount() {
    const {getFolders} = this.props;
    getFolders();
  }

  openHistory = () =>{
    this.setState({historyShow:!this.state.historyShow})
  }
  render() {
    const { routes, activeCarrier, pinDisplay } = this.props;
    const vis = activeCarrier === 'home' ? 'block' : 'none';
    return (
      <div className='um-win'>
        <Homeheader openHistory={this.openHistory}/>
        <div className="content">
          <div style={{ display: vis }}>
            {
              routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
            }
          </div>
          <Homecontent routes={routes} />
        </div>
        {/* <Pin /> */}
        <History historyShow={this.state.historyShow} openHistory={this.openHistory}></History>
        {
          pinDisplay ?  <Pin /> : null
        }
      </div>
    );
  }
}
export default Wrap;

