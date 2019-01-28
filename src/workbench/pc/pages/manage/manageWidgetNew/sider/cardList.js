import React from 'react';
import Card from './card';
import classNames from 'classnames';
//import { check } from '../../../../../../../tw/workbench/pc/containers/createTeam/checkTenantStatus';
//import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';


export default class CardsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow:true
        }
    }
    handleClick=()=>{
        this.setState({
            isShow:!this.state.isShow
        })
    }
    componentDidMount(){
        
        const height = this.listDom.offsetHeight;
        this.setState({
            height:height
        })
    }
    render() {
        const {list,listName,onChangeChecked,checkedCardList} = this.props;
        const {isShow,height} = this.state;
        const display = isShow?'flex':'none';
        const showStyle = isShow?{
            height:height
        }:{
            height:0,
        }
        list.forEach(element => {
        const isContainInCheckCardList = checkedCardList.some(a=>{return a.serviceId==element.serviceId})

            element.checked = isContainInCheckCardList
        });
        return <div>
            <div className="serviceTitle"><span>{listName}</span><i className={classNames({ down: isShow })} onClick={this.handleClick}/></div>
            <div className="result_app_list_4" style={{...showStyle,transition:"height .5s"}} ref={ref=>this.listDom=ref}>
                {list.map((item, c) => {

                    return <Card data={item} key={item.menuItemId} index={c}
                        onChangeChecked={onChangeChecked}
                        checkedCardList={checkedCardList}
                        />//{item.menuItemName}
                        
                })}
            </div>
            <hr />
        </div>
    }
}