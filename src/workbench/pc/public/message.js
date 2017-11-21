import { dispathMessageTypeHandler } from 'public/regMessageTypeHandler';

//注册事件
const eventKey = [
	"TEST_IFRAME_EVENT"  //测试数据的api注册
];

function getEventKey(id){
	for(let i=0;i < eventKey.length ; i++){
		if(eventKey[i] == id){
			return eventKey[i];
		}
	}
	return "";
}

function messageHandler(e) {
	let _data = e.data;
	if(!_data)return;
	if(!_data.messType){
		return;
	};
	if(_data.messType == getEventKey(_data.messType)){
        dispathMessageTypeHandler(_data.msg.data);
	}
}

export function initMessage(){

	window.addEventListener('message', messageHandler);
}