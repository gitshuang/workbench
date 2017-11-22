import React, { Component } from 'react';
import {pop_cont} from "./style.css";
import PropTypes from "prop-types";
// import WidgetArea from 'components/widgetArea';
//TODO 此处代码不应该调用containers中的容器，后续修改
import WidgetArea from 'containers/widgetArea';
import WidgeOption from 'components/widge_option';
import PopDialog from 'components/pop';
import { WidgetCont, WidgetTitle,item ,form_control,
edit_cont,save_btn,close_btn,} from './style.css';
import Button from 'bee-button';
import FormControl from 'bee-form-control';

class WidgeList extends Component{

    constructor(props) {
        super(props);

        this.popSave = this.popSave.bind(this);
        this.popClose = this.popClose.bind(this);

        let _data = {};
        Object.assign(_data,this.props.data);
        this.state = {
            editShow:false, //编辑框是否显示
            optionShow:true,
            data:_data,
            showModal: false,
        }
    }

    update = () => {

    }

    inputOnChange = (e) => {
        this.state.data.name = e;
        this.setState({
            ...this.state
        });
    }


    save = () => { 

        this.props.save(this.state.data);
        this.closePop();
    }

    close = () => {

        this.state.data.name = this.props.data.name;
        this.closePop();
    }

    closePop(){
        this.state.editShow = false;
        this.state.optionShow = true;

        this.setState({
            ...this.state
        })
    }

    
    widgeEdit = () => {

        this.setState({
            editShow:true,
            optionShow:false
        })
    }

    widgeDelete = (data) => {

        this.setState({
            showModal:true,
            data:data
        })

        this.props.save(this.state.data);
    }

    widgeAdd = () => {

        
    }

    popSave = ()=>{

        // this.state.data
        debugger;

    }

    popClose = ()=>{
        
        debugger;

    }

	render(){

		let da = this.props.data;

        let pop_btn = [
            {label:"确认",fun:this.popSave,className:""},
            {label:"取消",fun:this.popClose,className:""}
        ]   //设置操作按钮

        let edit = <div className={edit_cont}>
            <FormControl className={form_control} value={this.state.data.name} onChange={this.inputOnChange}/>
              
            <Button className={save_btn} onClick={this.save} >完成</Button>
            <Button className={close_btn} onClick={this.close} >取消</Button>
        </div>;

		return(
		<div name={"nav"+da.id} className={item} >
            {
            	this.props.index == 0 ? null : <div className={WidgetTitle} >
                    <div> {this.state.editShow ? edit : da.name  }</div>
                    <div>{this.state.optionShow ? <WidgeOption data={da} edit={this.widgeEdit} delete={this.widgeDelete} add={this.widgeAdd} /> : null  }</div>
                </div>
            }
            <div className={WidgetCont} name={da.id} >
                <WidgetArea data={da.widgeList} change={this.props.change} > </WidgetArea>
            </div>


            <PopDialog show = { this.state.showModal } close = { this.close }   btns={pop_btn} >
                <div >确认要删除分组xx ? </div>
            </PopDialog>

        </div>)
	}

}

// PopDialog.PropTypes = propTypes;
export default WidgeList;