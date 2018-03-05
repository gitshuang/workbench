import React, { Component } from 'react';
import "./enhancedPagination.css";
import 'bee-pagination/build/Pagination.css';
import Pagination from './pagination';
// 函数接受一个组件参数……
const EnhancedPagination = WrappedComponent => {
    console.log('EnhancedPagination');
    return class extends Component {
      constructor(props){
        super(props);
        this.state = {
          activePage:this.props.activePage,//当前的页码
          dataNum:this.props.dataNumSelectActive,
        }
      }

      onKeyup = (e) =>{
        e.keyCode === 13 && this.setPageJump(e)
      }

      setPageJump = (e) =>{
        //console.log(e.target.value);
        let value = e.target.value;
        if(value > this.props.items || (value == 0 && value !== '')){
          alert('跳转的页数不合适');
        }else{
          this.setState({activePage:value},function(){
            if(value!== '')this.props.onSelect(value)
          })
        }
      }

      dataNumSelect = (e) =>{
        let value = e.target.value;
        let dataNumValue = this.props.dataNumSelect[value].name
        this.setState({dataNum:value})
        if(this.props.onDataNumSelect){
          this.props.onDataNumSelect(dataNumValue)
        }
      }

      render() {
        const newProps = {
          activePage:this.props.activePage*1
        }
        return (
            <div className="enhanced-pagination">
                <WrappedComponent {...this.props} {...newProps}/>
                <div className="data-select">
                    <select  name="data-select" id="" className="data-select"  defaultValue='' value={this.state.dataNum} onChange={e=>this.dataNumSelect(e)}>
                      {this.props.dataNumSelect.length > 0 && this.props.dataNumSelect.map((item, i) => {
                      return <option key={i} value={item.id}>{item.name}</option>
                      })}
                    </select>
                </div>
                <div className="page-jump">
                    跳至<input className="page-jump-value" type='number' value={this.state.activePage} onKeyDown={e=>this.onKeyup(e)} onChange={e=>this.setPageJump(e) }/>页
                </div>
            </div>
        )
      }
    }
  }

export default EnhancedPagination(Pagination);