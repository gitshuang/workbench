/* notice */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import Button from 'bee/button';
import { dispatchMessageTypeHandler, parseType } from 'public/regMessageTypeHandler';
import { closeNotice } from './index.css';

class Notice extends Component {
  static propTypes = {
    notice: PropTypes.string,
    data: PropTypes.shape({
      content: PropTypes.string,
      btns: PropTypes.array,
      icon: PropTypes.string,
    }),
  }
  static defaultProps = {
    notice: 'notice',
    data: {},
  }

  handClick(i) {
    return () => {
      const { type } = this.props.data.btns[i];
      dispatchMessageTypeHandler(parseType(type));
    };
  }

  render() {
    const {
      notice,
      data: {
        content,
        btns,
        icon,
      },
    } = this.props;

    return (
      <div >
        <img alt="" src={icon} />
        <Icon type="error3" className={closeNotice} />
        <p title={content}>{content}</p>
        {
          btns.map((btn, i) => (
            <Button
              key={i}
              className={`${notice}Btn  btn${i}`}
              size="sm"
              style={{ color: `${btn.btnColor}` }}
              onClick={this.handClick(i)}
            >
              {btn.typeBtn}
            </Button>
          ))
        }
      </div>
    );
  }
}

export default Notice;
