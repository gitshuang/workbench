import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import teamActions from 'store/root/team/actions';

import Button from 'bee/button';
import Progress from 'pub-comp/progress';

import Upload from 'containers/upload';
import { check } from './checkTenantStatus'

const { requestStart, requestSuccess, requestError } = rootActions;
const { createTeam } = teamActions;
import {
  wrap,
  create_team_cont,
  item,
  name_error,
  upload,
  footer,
  footer_hr,
  process_loading_content,
  submit_class,
} from './index.css';

@withRouter
@connect(
  mapStateToProps(),
  {
    requestStart,
    requestSuccess,
    requestError,
    createTeam,
  }
)

class CreateTeamContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      logo: "",
      error: false,
      startFlag: false,//0表示未开始，1表示开始progress
      tenantId: '',//tenantId
    }
    //progressbar
    this.loadingFunc = null;
    this.successFunc = null;
    this.timer = null;
  }

  componentWillMount() {

  }

  onChange = (e) => {
    const value = e.target.value;
    if (value.length > 60 || value == "") {
      this.setState({
        value,
        error: true
      });
      return false;
    }
    this.setState({
      value,
      error: false
    })
  }

  setUrl(name, url) {
    this.state[name] = url;
    this.setState({
      ...this.state
    })
  }

  create = () => {
    const { createTeam, requestStart, requestSuccess, requestError } = this.props;
    const { value, logo } = this.state;
    if (!value || value === "") {
      this.setState({
        error: true
      });
      return false;
    }
    let data = {
      tenantName: value
    };
    if (logo) {
      data.logo = logo;
    }
    requestStart();
    createTeam(data).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return;
      }
      this.setState({
        startFlag: true,//开始progressbar
      });
      requestSuccess();
      const tenantId = payload.tenantId;
      localStorage.setItem('create', "1");

      this.setState({ tenantId: tenantId }, () => {
        clearInterval(this.timer);
        check(tenantId, this.loadingFunc, this.successFunc);
      });//把startFlag变成1.那么就开是走progress
    });
  }
  successLoading = () => {
    const { tenantId } = this.state;
    window.location.href = `/?tenantId=${tenantId}&switch=true`;
  }

  loadingCallBack = (loadingFunc, successFunc) => {
    this.timer = setInterval(loadingFunc, 500);
    this.loadingFunc = loadingFunc;
    this.successFunc = successFunc;
  }

  render() {
    const { logo, value, disabled, error, startFlag } = this.state;
    const nameBH = error ? 'block' : 'none';
    return (
      <div className={wrap}>
        <h5>Create Team</h5>
        <hr />
        <div className={create_team_cont}>
          <div className={item + " um-box "}>
            <label>Team Name<span>&nbsp;*&nbsp;</span></label>
            <input
              className="u-form-control"
              placeholder="No more than 60 chars"
              maxLength="60"
              value={value}
              onChange={(e) => { this.onChange(e) }}
            />
          </div>
          <div className={`${name_error}`} style={{ display: nameBH }}>
            Please enter the team name.
          </div>

          <div className={`${item} um-box ${upload}`}>
            <label>Photo&nbsp; &nbsp; </label>
            <div>
              <Upload
                name='logo'
                logo={logo ? logo : ""}
                onChange={(e) => { this.setUrl("logo", e) }}
                tip=''
              />
            </div>
          </div>
        </div>
        <hr className={footer_hr} />
        <div className={footer}>
          <div>
            {
              startFlag ?
                <div className={process_loading_content}>
                  <Progress loadingCallBack={this.loadingCallBack} startFlag={startFlag} successFunc={this.successLoading} loadingDesc={'Configuring team information…'} />
                </div> :
                <Button className={submit_class} onClick={this.create} >Create</Button>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default CreateTeamContent;
