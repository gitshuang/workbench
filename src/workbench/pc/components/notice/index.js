/* notice */
import React, {Component} from 'react';
import { connect, Provider } from 'react-redux';
import {
  HashRouter as Router,
  withRouter,
} from 'react-router-dom';
import { mapStateToProps } from '@u';
import store from 'store';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import Button from 'bee-button';
import rootActions from 'store/root/actions';
import { dispathMessageTypeHandler } from 'public/regMessageTypeHandler';
import "./index.css"

const defaultProps = {
  notice: 'notice',
  mode: 'dark',
  iconName: ''
};

const propTypes = {
  notice: PropTypes.string,
  iconName: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ])
}

const {
  getMessage,
  pushMessageQueue
} = rootActions;



class Notice extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handClick(param) {
    const type = this.props.data.btns;
    dispathMessageTypeHandler(type[param].type);
  }
  hideClick(){
    window.remainingNum++;
    //执行pushMessageQueue消息推送
    store.dispatch(pushMessageQueue())
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
        <p title={content}>{content}</p>
        {
          btns.map((btn, i) => (
            <Button  className={`${notice}Btn  btn`+i} size="sm" style={{ color: `${btn.btnColor}` }} onClick={ this.handClick.bind(this,i) } >{btn.typeBtn}</Button>
          ))
        }
        <div className="hideAuto" onClick={ this.hideClick.bind(this) }><Icon type="xiaoxi" /></div>
      </div>
    );
  }
}

Notice.propTypes = propTypes;
Notice.defaultProps = defaultProps;


export default Notice;
