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
          pageJump:this.props.activePage,
          activePage:this.props.activePage,
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
          this.setState({pageJump:value,activePage:value},function(){
            if(value!== '')this.props.onSelect(value)
          })
        }
      }

      dataNumSelect = (e) =>{
        let value = e.target.value;
        if(this.props.onDataNumSelect){
          this.props.onDataNumSelect(value)
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
                    <select name="data-num-select" id="" className="data-select" onChange={e=>this.dataNumSelect(e)}>
                        <option>10条/页</option>
                        <option>15条/页</option>
                        <option>20条/页</option>
                        <option>30条/页</option>
                    </select>
                </div>
                <div className="page-jump">
                    跳至<input className="page-jump-value" type='number' value={this.state.pageJump} onKeyDown={e=>this.onKeyup(e)} onChange={e=>this.setPageJump(e) }/>页
                </div>
            </div>
        )
      }
    }
  }

export default EnhancedPagination(Pagination);