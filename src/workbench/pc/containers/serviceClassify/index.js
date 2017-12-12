import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

import Button from 'bee-button';
import Icon from 'components/icon';
import InputGroup from 'bee-input-group';
import AutoComplete from 'bee-autocomplete';
import Menu from 'bee-menus';
import ButtonGroup from 'bee-button-group';
import GoTo from './goto';

import {
  bg,
  bg_wrap,
  wrap,
  clearfix,
  serviceSearch,
  ufSearch,
  appContent,
  menuBtnGroup,
  link,
  icon,
} from './style.css';

import applicationActions from 'store/root/application/actions';
// import manageActions from 'store/root/manage/actions';
import rootActions from 'store/root/actions';
// const {getSelectWidgetList} = manageActions;
const {getAllApplicationList} = applicationActions;
const {requestStart, requestSuccess, requestError} = rootActions;

@connect(
  mapStateToProps(
    'allApplicationList',
    {
      namespace: 'application',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getAllApplicationList,
  }
)

class serviceClassify extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      options: ['友空间', '友人才', '友报账', '友报账','友报账'],
      current: undefined,
      list2 : [],
      listAll : [],
    }
  }

  componentWillMount() {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getAllApplicationList,
      allApplicationList,
    } = this.props;
    if(allApplicationList.length == 0){
      requestStart();
      getAllApplicationList().then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        requestSuccess();
      });
    }
  }

  handleClick = (labelId) => () => {
    this.setState({
      current: labelId,
    })
  }

  onFormChange = (value) => {
    this.setState({
      value
    })
  }

  renderList() {
    let listAll = [];
    const { current } = this.state;
    const {
      allApplicationList
    } = this.props;
    if (current) {
      const label = allApplicationList.find(({
        labelId,
      }) => {
        return labelId === current;
      });
      listAll = label.children;
    } else {
      allApplicationList.forEach(({children}) => {
        listAll = listAll.concat(children);
      })
    }
    return listAll.map((app) => {
      const {
        applicationIcon,
        applicationName,
        applicationCode,
        service,
      } = app;
      return (
        <div key={applicationCode}>
          <header>
            <div>
              <img src={applicationIcon}/>
              <span>{ applicationName }</span>
            </div>
          </header>
          <hgroup className="um-box">
            {
              service.map(({
                serveName,
                serveCode,
                serveIcon,
              }) => {
                return (
                  <GoTo
                    key={serveCode}
                    name={serveName}
                    icon={serveIcon}
                    to={`/serve/${serveCode}`} />
                );
              })
            }
          </hgroup>
        </div>
      )
    })
;
  }
  renderBtns() {
    const btns = [];
    const {
      current,
    } = this.state;
    const {
      allApplicationList
    } = this.props;

    btns.push(
      <Button className={ current ? '' : 'active' }
        onClick={this.handleClick()}
        key="all">
        全部
      </Button>
    );

    allApplicationList.forEach(({ labelId, labelName }) =>{
      btns.push(
        <Button className={ current === labelId ? 'active' : '' }
          onClick={this.handleClick(labelId)}
          key={labelId}>
          {labelName}
        </Button>
      );
    });
    return btns;
  }

  render() {
    const { value, options, current } = this.state;
    const btns = this.renderBtns();
    const list = this.renderList();

    return (
      <div className={bg+" um-content um-vbox"}>
        <div className={bg_wrap+" um-content um-vbox"}>
          <div className={`${wrap} ${clearfix} um-content um-vbox`}>
            <InputGroup className={serviceSearch}>
              <AutoComplete
                value={value}
                disabled={false}
                options={options}
                placeholder="搜索应用"
                onValueChange={value => this.onFormChange(value)}
              />
              <InputGroup.Button>
                <Button>
                  <Icon title="搜索" type="search" className={ufSearch}></Icon>
                </Button>
              </InputGroup.Button>
            </InputGroup>
            <div className="um-box um-content">
              <div className={menuBtnGroup}>
                <ButtonGroup vertical>
                  {btns}
                </ButtonGroup>
              </div>
              <div className={appContent+" um-bf1 um-content"}>
                {list}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default serviceClassify;
