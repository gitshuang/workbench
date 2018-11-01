import React, { Component } from 'react';
import PropType from 'prop-types';
import Icon from 'pub-comp/icon';
import {
  mark,
} from './style.css'

class HomeMark extends Component {
  static propTypes = {
    linkTo: PropType.func,
  };
  static defaultProps = {
    linkTo: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }
  componentWillMount() {
    
  }
  componentDidMount() {
   
  }

  render() {
    let {newAppNum,willExpiredNum,expiredNum} = this.props;
    const newApp = newAppNum >0?`Your enterprise has ${newAppNum} new Apps.`:null,
    willExpired=willExpiredNum > 0?` ${willExpiredNum} Apps will expire soon. `:null,
    expired = expiredNum>0 ?`${expiredNum} Apps have expired. `:null;
    return(
      <div className={mark}>
        <p>
          <Icon type="notice" />
          {/* <span>Some of your Apps have expired or will expire soon.</span> */}
          <span>{newApp}{willExpired}{expired}Please check in <b onClick={this.props.linkTo}>App Mgmt</b>.</span>
          
          <Icon type="error3" onClick={this.props.closeHomeMark}/>
        </p>
      </div>
    )
  }

}
export default HomeMark;

