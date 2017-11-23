import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'bee-icon';
import { widgetList, widgetItem, title, file_context, title_left, 
  file_icon, title_right, context, bottom ,footer,
title_cont,form_control,edit_cont,save_btn,close_btn,title_edit,pop_cont} from './style.css'
import WidgetItem from './widgetItem';
import Checkbox from 'bee-checkbox';
import FormControl from 'bee-form-control';
import Button from 'bee-button';
import PopDialog from 'components/pop';

import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
const {deleteFolder, renameFolder, } = manageActions;
const {requestStart, requestSuccess, requestError, } = rootActions;

const widgetStyle = {
    sm: {
        width: 176
    },
    lg: {
        width: 360
    },
    xg: {
        width: 360,
        height: 360
    }
}

@connect(()=>({}),
  {
    requestStart,
    requestSuccess,
    requestError,
    deleteFolder,
    renameFolder
    // addGroup
  }
)
class WidgeFileItem extends Component {

    //TUDO 数据中的 size ： sm 、lg、xg （小[标准]、中、大）

    // static propTypes = {
    //     widgeList: PropTypes.array.isRequired,
    // }
    constructor(props) {
        super(props);

        this.popSave = this.popSave.bind(this);
        this.popClose = this.popClose.bind(this);

        this.state = {
            value:props.data.title,
            editShow:false,
            showModal:false
        }
    }

    //点击文件夹编辑按钮
    fileEdit = () =>{

        this.setState({
            editShow:true
            // optionShow:false
        })
    }

    //输入框修改data数据源
    inputOnChange = (e) => {
        this.setState({
            value:e
        });

    }

    fileDele = () =>{

        this.setState({
          showModal:true
        })

      let data = {id:this.props.data.id,value:this.state.value};
      const { renameFolder } = this.props;
      renameFolder(data);
    }
 

    //
    save = (e) => {

      //TODO 此处最好只处理一次即可。setState
      this.setState({
            editShow:false
      });
      let data = {id:this.props.data.id,value:this.state.value};
      const { renameFolder } = this.props;
      renameFolder(data);
    }

    close = (e) => {
        this.setState({
            value:this.props.data.title,
            editShow:false
        });
    }
    
     popSave = (data)=>{

        // this.state.data
        const { deleteFolder } = this.props;
        deleteFolder(data);

    }

    popClose = ()=>{
        this.setState({
          showModal:false
        })
    }

    render() {

        const  da = this.props.data;

        const pop_btn = [
            {label:"确认",fun:this.popSave,className:""},
            {label:"取消",fun:this.popClose,className:""}
        ]   //设置操作按钮

        const edit = <div className={edit_cont}>
            <FormControl className={form_control} value={this.state.value} onChange={this.inputOnChange}/>

            <Button className={save_btn} onClick={this.save} >完成</Button>
            <Button className={close_btn} onClick={this.close} >取消</Button>
        </div>;

        const btns = <div className={footer}>
          <div><Checkbox disabled className="test" /></div>
          <div onClick={this.fileEdit}><Icon type="uf-pencil" /></div>
          <div onClick={this.fileDele}><Icon type="uf-del" /></div>
        </div>

        // let _width = (self.state.width * da.width) + (self.state.marginRight*(da.width-1));
        // lis.push(<li key={'widgetList' + da.id + i }  style={{width:_width,marginRight:10,}} >

        return (<li className={widgetItem} style={widgetStyle[da.size]} >
            <div className={title}>
              <div className={title_left,file_icon}></div>
              <div className={title_right}>
                {da.title}
              </div>
            </div>

            <div className={context,file_context} onClick={()=>{this.props.change(this.props.data)}}>
                 <div></div>
                 <div></div>
                 <div></div>
                 <div></div>
                 <div></div>
                 <div></div>
                 <div></div>
            </div>

            {this.state.editShow ? edit : null }

            {this.state.editShow ? null : btns }

            <PopDialog show = { this.state.showModal } data={da}   btns={pop_btn} >
                <div className={pop_cont}>
                  <Icon type="uf-exc-t" />
                  <span>您确认要删除服务[{this.props.data.title}]?</span>
                </div>
            </PopDialog>

        </li>)
    }
}

export default WidgeFileItem;
