import React, { Component, Children, cloneElement } from 'react';
import { withRouter } from 'react-router-dom';
import Header from 'containers/header';
import Breadcrumbs from 'components/breadcrumb';

@withRouter
class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentWillMount() {

  }

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  goHome = () => {
    const { history } = this.props;
    history.replace('');
  }

  render() {
    const {
      name,
      children,
      brms,
      goBack,
    } = this.props;
    return (
      <div className="um-win">
        <div className="um-header header">
          <Header onLeftClick={this.goHome} >
            <div>
              <span>{name}</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <Breadcrumbs
              data={brms && brms.length ? [...brms, { name: name }] : [{ name: name }]}
              goback={goBack || this.goBack}
            />
          </div>
        </div>
        <div className={`content um-box um-content`}>
          {
            Children.map(children, (child) => cloneElement(child))
          }
        </div>
      </div>
    );
  }
}

export default Application;
