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

/**
 * 
 * @param {Array} groups
 * @param {String} cardID
 * @returns {Boolean}
 */
export const hasCardContainInGroups = (groups, cardID) => {
  let flag = false;
  groups.forEach(g => {
    g.children.forEach(a => {
          if (a.widgetId === cardID) {
              flag = true;
              return false;
          }
      });
      if (flag) {
          return false;
      }
  });
  return flag;
};

Array.prototype.distinct = function (){
  var arr = this,
    i,obj = {},
    result = [],
    len = arr.length;
  for(i = 0; i< arr.length; i++){
    if(!obj[arr[i]]){
      obj[arr[i]] = 1;
      result.push(arr[i]);
    }
  }
  return result;
};
