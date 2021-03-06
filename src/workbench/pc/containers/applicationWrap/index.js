import React, { Component, Children, cloneElement } from 'react';
import { withRouter } from 'react-router-dom';
import Header from 'containers/header';
import Breadcrumbs from 'components/breadcrumb';
import {header,um_content,appBreadcrumb} from './style.css';


@withRouter
class Application extends Component {
  goBack = () => {
    this.props.history.replace('');
  }
  render() {
    const {
      name,
      children,
    } = this.props;
    return (
      <div className="um-win">
        <div className={header}>
          <div className="um-header">
            <Header onLeftClick={ this.goBack } iconName={"home"} >
              <div>
                <span>{ name }</span>
              </div>
            </Header>
            <div className={appBreadcrumb}>
              <Breadcrumbs data={[{ name:name }]} goback={this.goBack}/>
            </div>
          </div>
        </div>
        <div className={`${um_content} um-box um-content`}>
          {
            Children.map(children, (child) => cloneElement(child))
          }
        </div>
      </div>
    );
  }
}

export default Application;
