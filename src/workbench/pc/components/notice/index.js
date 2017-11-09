/* notice */
import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import "./index.css"

const defaultProps = {
  notice: 'notice',
  mode: 'dark',
  iconName: '',
  handClick() {
  },
};

const propTypes = {
  notice: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  mode: PropTypes.string,
  iconName: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  leftContent: PropTypes.any,
  rightContent: PropTypes.any,
  handClick: PropTypes.func
}

class NavBar extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      notice,content, handClick, iconName, leftContent, rightContent
    } = this.props;


    return (
      <div className={notice}>
        <p>{content}</p>
        <Button  className="noticeBtn" onClick={ handClick } size="sm" style={{ position: 'absolute',fontSize: 10,minWidth: 50, right: 15, bottom: 5}}>{m.typeBtn}</Button>
      </div>
    );
  }
}

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default Notice;
