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
    const newApp = newAppNum >0?`${newAppNum}`:null,
    willExpired=willExpiredNum > 0?`${willExpiredNum}`:null,
    expired = expiredNum>0 ?`${expiredNum}`:null;
    return(
      <div className={mark}>
        <p>
          <Icon type="notice" />
          {/* <span></span> */}
          <span>{newApp}{willExpired}{expired}<b onClick={this.props.linkTo}></b></span>
          
          <Icon type="error3" onClick={this.props.closeHomeMark}/>
        </p>
      </div>
    )
  }

}
export default HomeMark;

