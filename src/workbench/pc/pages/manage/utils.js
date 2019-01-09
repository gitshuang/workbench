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
 * 判断所有分组内是否有某卡片
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