import React, { Component } from 'react';
import {pop_cont} from "./style.css";
import PropTypes from "prop-types";
import WidgetArea from 'components/widgetArea';
import WidgeOption from 'components/widge_option';
import { WidgetCont, WidgetTitle,item ,form_control,
edit_cont,save_btn,close_btn,} from './style.css';
import Button from 'bee-button';
import FormControl from 'bee-form-control';

class WidgeList extends Component{

    constructor(props) {
        super(props);

        let _data = {};
        Object.assign(_data,this.props.data);
        this.state = {
            editShow:false, //编辑框是否显示
            optionShow:true,
            data:_data
            // value: props.data.name
        }
    }

    update = () => {



    }

    onChange = (e) => {
        this.state.data.name = e;
        this.setState({
            ...this.state
        });
    }


    save = () => { 
        this.props.save(this.state.data);
        this.closePop();
    }

    closePop(){

        this.setState({
            editShow:false,
            optionShow:true
        })
    }

    close = () => {
        this.closePop();
    }


    widgeEdit = () => {

        this.setState({
            editShow:true,
            optionShow:false
        })
    }

    widgeDelete = () => {

        
    }

    widgeAdd = () => {

        
    }


	render(){

		let da = this.props.data;

        let edit = <div className={edit_cont}>
            <FormControl className={form_control} value={this.state.data.name} onChange={this.onChange}/>
              
            <Button className={save_btn} onClick={this.save} >完成</Button>
            <Button className={close_btn} onClick={this.close} >取消</Button>
        </div>;

		return(
		<div name={"nav"+da.id} className={item} >
            {
            	this.props.index == 0 ? null : <div className={WidgetTitle} >
                    <div> {this.state.editShow ? edit : da.name  }</div>
                    <div>{this.state.optionShow ? <WidgeOption edit={this.widgeEdit} delete={this.widgeDelete} add={this.widgeAdd} /> : null  }</div>
                </div>
            }
            <div className={WidgetCont} name={da.id} >
                <WidgetArea data={da.widgeList} change={this.props.change} > </WidgetArea>
            </div>
        </div>)
	}

}

// PopDialog.PropTypes = propTypes;
export default WidgeList;