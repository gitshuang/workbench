import React, { Component } from 'react';
import "./enhancedPagination.css";
import 'bee-pagination/build/Pagination.css';
import Pagination from './pagination';
//新增的三个
//onDataNumSelect func 下拉选择每页展示的数据数的时候
//dataNumSelect  array ，下拉的数据选择有哪些
//dataNumSelectActive number，默认选中的每页展示的数据数
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
      
      componentWillReceiveProps(nextProps){
        // //console.log('jiude',this.state.activePage,'xinde',nextProps.activePage);
        if(this.state.activePage !== this.props.activePage){
          this.setState({
            activePage :nextProps.activePage,
            dataNum:this.state.dataNumSelectActive,
          })
        }
      }

      onKeyup = (e) =>{
        e.keyCode === 13 && this.setPageJump(e)
      }

      setPageJump = (e) =>{
        let value = e.target.value;
        if(value > this.props.items || (value == 0 && value !== '')){
          alert('跳转的页数不合适');
        }else{
          //注意这里要将下拉的数据还原
          this.setState({activePage:value},function(){
            if(value!== '')this.props.onSelect(value*1)
          })
        }
      }

      dataNumSelect = (e) =>{
        let value = e.target.value;
        let dataNumValue = this.props.dataNumSelect[value].name
        this.setState({
          dataNum:value
        })
        if(this.props.onDataNumSelect){
          this.props.onDataNumSelect(e.target.value,dataNumValue)
        }
      }

      render() {
        
        return (
            <div className="enhanced-pagination">
                <WrappedComponent {...this.props} />
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