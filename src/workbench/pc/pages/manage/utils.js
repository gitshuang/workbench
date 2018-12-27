export function findItemById(manageList,id) {
    let dataItem;
    for(let i = 0;i<manageList.length;i++){
      if(manageList[i].children){
        dataItem = findItemById(manageList[i].children,id)
      }
      if(dataItem){
        break;
      }
      if(manageList[i].widgetId && manageList[i].widgetId === id){
        dataItem = manageList[i];
        break;
      }
    }
    return dataItem;
  }