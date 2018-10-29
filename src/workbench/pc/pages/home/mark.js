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
    const newApp = newAppNum >0?`您的企业新增了${newAppNum}个应用，`:null,
    willExpired=willExpiredNum > 0?`有${willExpiredNum}个应用即将到期，`:null,
    expired = expiredNum>0 ?`${expiredNum}个应用已到期，`:null;
    return(
      <div className={mark}>
        <p>
          <Icon type="notice" />
          {/* <span>您有应用已到期或快到期，无法继续使用。</span> */}
          <span>{newApp}{willExpired}{expired}请到<b onClick={this.props.linkTo}>应用管理</b>中查看。</span>
          
          <Icon type="error3" onClick={this.props.closeHomeMark}/>
        </p>
      </div>
    )
  }

}
export default HomeMark;

