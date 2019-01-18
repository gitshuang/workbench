import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import RouteWithSubRoutes from 'pub-comp/routeWithSubRoutes';
import wrapActions from 'store/root/wrap/actions';
import Homeheader from './homeheader';
import Homecontent from './homecontent';
import Pin from './pin';
import History from '../history';
import Menu from './homeheader/menu';

const { getFolders } = wrapActions;
@withRouter
@connect(
  mapStateToProps(
    'activeCarrier',
    'pinDisplay',
    'retract',
    {
      namespace: 'wrap',
    }
  ),
  {
    getFolders,
  },
)
class Wrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyShow: false,//历史记录
      menuShow:false,//菜单栏
    };
  }

  componentDidMount() {
    const { getFolders } = this.props;
    getFolders();
  }

  openHistory = () => {
    this.setState({ 
      historyShow: !this.state.historyShow,
      menuShow:false,
    })
  }
  openMenu = () =>{
    this.setState({ 
      menuShow: !this.state.menuShow,
      historyShow:false,
    })
  }
  render() {
    const { routes, activeCarrier, pinDisplay, retract } = this.props;
    const vis = activeCarrier === 'home' ? 'block' : 'none';
    return (
      <div className='um-win'>
        <Homeheader openHistory={this.openHistory} openMenu={this.openMenu} style={{ top: retract ? 0 : -48 }} />
        <div className="content" style={{top: retract ? 88 : 40}}>
          <div style={{ display: vis }}>
            {
              routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
            }
          </div>
          <Homecontent routes={routes} />
        </div>
        {/* <Pin /> */}
        <Menu  menuShow={this.state.menuShow} openMenu={this.openMenu}style={{top: retract ? 88 : 40}}/>
        <History 
            historyShow={this.state.historyShow} 
            openHistory={this.openHistory}
            style={{top: retract ? 88 : 40}} >
        </History>

        {
          pinDisplay ? <Pin /> : null
        }
      </div>
    );
  }
}
export default Wrap;

