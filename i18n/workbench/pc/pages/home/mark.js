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
  
    return(
      <div className={mark}>
        <p>
          <Icon type="notice" />
          <span>$i18n{mark.js0}$i18n-end</span>
          <b onClick={this.props.linkTo}>$i18n{mark.js1}$i18n-end>></b>
          <Icon type="error3" onClick={this.props.closeHomeMark}/>
        </p>
      </div>
    )
  }

}
export default HomeMark;

