/* notice */
import React, {Component} from 'react';
import store from 'store';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import Button from 'bee-button';
import { dispathMessageTypeHandler, parseType } from 'public/regMessageTypeHandler';
import {closeNotice} from "./index.css";

class Notice extends Component {
  static propTypes = {
    notice: PropTypes.string,
    data: PropTypes.object,
  }
  static defaultProps = {
    notice: 'notice',
    data: {},
  }
  constructor(props, context) {
    super(props, context);
  }

  handClick(i) {
    return (evt) => {
      // evt.stopPropagation();
      let { type } = this.props.data.btns[i];

      dispathMessageTypeHandler(parseType(type));
      // return false;
    }
  }

  render() {
    const {
      notice,
      data: {
        content,
        btns,
        icon
      },
    } = this.props;

    return (
      <div >
        <img src={icon}/>
        <Icon type="error3" className={closeNotice}></Icon>
        <p title={content}>{content}</p>
        {
          btns.map((btn, i) => (
            <Button key={i} className={`${notice}Btn  btn`+i} size="sm" style={{ color: `${btn.btnColor}` }} onClick={ this.handClick(i) } >{btn.typeBtn}</Button>
          ))
        }
        {/* <div className="hideAuto"><Icon type="xiaoxi" /></div> */}
      </div>
    );
  }
}

export default Notice;
