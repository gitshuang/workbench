import React,{ Component} from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import '../../../static/style/iuapmobile.um.css'
import './PageNode.css'

class PageNode extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {}
  }

  openComponent = (id) => {
    console.log(id);
  }

  render() {
    return (
      <div className="um-content">
        <div className="um-container">
          <div className="um-row">
            <div className="um-lg-12 um-md-12 um-sm-12 um-xs-12">
              <div className="um-list-item-inner">
                <div className="um-wgt-group-title">代办</div>
              </div>
            </div>
          </div>

          <div className="um-row">
            <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
              <div className="um-list-item-inner" onClick={()=>{_this.openComponent(1)}}>
                <div className="image-background gmail"></div>
              </div>
            </div>
            <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
              <div className="um-list-item-inner" onClick={()=>{_this.openComponent(2)}}>
                <div className="image-background dimission"></div>
              </div>
            </div>
            <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
              <div className="um-list-item-inner" onClick={()=>{_this.openComponent(3)}}>
                <div className="image-background task"></div>
              </div>
            </div>
            <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
              <div className="um-list-item-inner" onClick={()=>{_this.openComponent(4)}}>
                <div className="image-background stock"></div>
              </div>
            </div>
            <div className="um-lg-2 um-md-2 um-sm-3 um-xs-6">
              <div className="um-list-item-inner" onClick={()=>{_this.openComponent(5)}}>
                <div className="image-background bangongcaigou"></div>
              </div>
            </div>
            <div className="um-lg-2 um-md-2 um-sm-3 um-xs-6">
              <div className="um-list-item-inner" onClick={()=>{_this.openComponent(6)}}>
                <div className="image-background zhijipingding"></div>
              </div>
            </div>
            <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
              <div className="um-list-item-inner" onClick={()=>{_this.openComponent(7)}}>
                <div className="image-background dimission"></div>
              </div>
            </div>
          </div>

          <div className="um-row">
            <div className="um-lg-12 um-md-12 um-sm-12 um-xs-12">
              <div className="um-list-item-inner">
                <div className="um-wgt-group-title">我的工作</div>
              </div>
            </div>
          </div>

          <div className="um-row">
            <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
              <div className="um-list-item-inner">
                <div className="image-background task"></div>
              </div>
            </div>
            <div className="um-lg-2 um-md-2 um-sm-3 um-xs-6">
              <div className="um-list-item-inner">
                <div className="image-background bangongcaigou"></div>
              </div>
            </div>
            <div className="um-lg-2 um-md-2 um-sm-3 um-xs-6">
              <div className="um-list-item-inner">
                <div className="image-background zhijipingding"></div>
              </div>
            </div>
          </div>

          <div className="um-row">
            <div className="um-lg-12 um-md-12 um-sm-12 um-xs-12">
              <div className="um-list-item-inner">
                <div className="um-wgt-group-title">我的日常</div>
              </div>
            </div>
          </div>

          <div className="um-row">
            <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
              <div className="um-list-item-inner">
                <div className="image-background gmail"></div>
              </div>
            </div>
            <div className="um-lg-2 um-md-2 um-sm-3 um-xs-6">
              <div className="um-list-item-inner">
                <div className="image-background zhijipingding"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default PageNode;
