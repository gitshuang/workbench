import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'bee-icon';
import ButtonGroup from 'bee-button-group';
import Button from 'bee-button';
import { Con, Row, Col } from 'bee-layout';
import WidgetItem from 'containers/manageWidgetList/widgetItem';
import FormControl from 'bee-form-control';

import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
const {getSelectWidgetList} = manageActions;
const {requestStart, requestSuccess, requestError, } = rootActions;

import { select_widget_list,searchPanel,panel,left,right,button_group,form_control,icon,search_icon} from './style.css'

@connect(
  mapStateToProps(
    'selectWidgetList',
    {
      namespace: 'manage',
    }
  ),
  {
    getSelectWidgetList,
    requestSuccess,
    requestError,
  }
)
class SelectWidgetList extends Component {

  constructor(props) {
    super(props);
    
    this.state = ({
        activeKey: "1",
        start: 0,
        value:"搜索内容..."
    })
  }

  componentDidMount() {
    
    this.getServices();
  }

  getServices(parme){
    const { requestError, requestSuccess, getSelectWidgetList } = this.props;
    getSelectWidgetList(parme).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
    });

  }

  onBtnOnclick =()=>{
    let parme = {};//设置参数
    // getServices(parme);
  }

  onChange = (activeKey) => {
      console.log(`onChange ${activeKey}o-^-o`);
      this.setState({
          activeKey,
      });
  }

  onTabClick = (key) => {
      console.log(`onTabClick ${key}o^o`);
      if (key === this.state.activeKey) {
          this.setState({
              activeKey: '',
          });
      }
  }

  //输入框修改data数据源
  inputOnChange = (e) => {
      this.setState({
          value:e
      });
  }

  render() {
    const { selectWidgetList } = this.props;

     
    let list = [];
    if(selectWidgetList){
      list = selectWidgetList.map((item, i) => {
          const {type, WidgetId: id, widgetName: name} = item;
          return (
              <WidgetItem
              key={`widget-${id}-${i}`}
              data={item}
              id={id}
              index={id}
              moveItemDrag={this.moveItemDrag}
              />
          );
      })
    }

    return (<div className={select_widget_list}>
       <div className={searchPanel}>
          <FormControl className={form_control} value={this.state.value} onChange={this.inputOnChange}/>
          <Icon type="uf-search" size="lg"  className={search_icon}/>
          <div className={icon} onClick={this.props.close} >
             X
          </div>
       </div>
       <div className={panel} >
          <Row>
            <Col md={3} xs={3} sm={3} >
              <ButtonGroup vertical className={button_group}>
                  <Button shape='border' onClick={()=>{this.this.onBtnOnclick("all")}}>全部</Button>
                  <Button shape='border' onClick={()=>{this.this.onBtnOnclick("1")}}>应用一</Button>
                  <Button shape='border' onClick={()=>{this.this.onBtnOnclick("2")}}>应用二</Button>
              </ButtonGroup>
            </Col>
            <Col md={9}  xs={9} sm={9}>
              <div className={right}>
                 {list}
              </div>
            </Col>
          </Row>
       </div>
    </div>);
  }
}

export default SelectWidgetList;
