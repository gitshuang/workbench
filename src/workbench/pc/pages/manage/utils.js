export function findItemById(manageList, id) {
	let dataItem;
	for (let i = 0; i < manageList.length; i++) {
		if (manageList[i].children) {
			dataItem = findItemById(manageList[i].children, id)
		}
		if (dataItem) {
			break;
		}
		if (manageList[i].widgetId && manageList[i].widgetId === id) {
			dataItem = manageList[i];
			break;
		}
	}
	return dataItem;
}

/**
 * 通过GroupID找到某个组，通过CardID找到该组内的卡片对象
 * @param {Array} manageList
 * @param {String} groupID
 * @param {String} cardID
 * @return {Object} 目标卡片对象
 */
export const getCardByGroupIDAndCardID = (manageList, groupID, cardID) => {
	let tmpGroup = {};
	let resultCard = {};
	manageList.forEach(g => {
		if (g.widgetId === groupID) {
			tmpGroup = g;
			return false;
		}
	});
	tmpGroup.children.forEach(a => {
		if (a.widgetId === cardID) {
			resultCard = a;
			return false;
		}
	});
	return resultCard;
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

  /**
 * 通过坐标x，y像素值计算所在的单元格坐标
 * @param {Number} x
 * @param {Number} y
 * @param {Number} cardWidth
 * @param {Number} margin
 * @param {Number} containerWidth
 * @param {Number} col
 * @param {Number} rowHeight
 * @returns {Object} 包含gridx和gridy的单元格坐标的对象
 */
export const calGridXY = (
    x,
    y,
    cardWidth,
    margin,
    containerWidth,
    col,
    rowHeight
) => {
    //坐标转换成格子的时候，向下取整，无须计算margin
    let gridX = Math.floor((x / containerWidth) * col);
    let gridY = Math.floor(y / (rowHeight + (margin ? margin[1] : 0)));
    //防止卡片溢出容器
    return checkInContainer(gridX, gridY, col, cardWidth);
};

/**
 * 防止元素溢出容器
 * @param {Int} gridX
 * @param {Int} gridY
 * @param {Int} col
 * @param {Int} w 卡片宽度
 * @returns {Object} gridX，gridY的单元格坐标对象
 */
export const checkInContainer = (gridX, gridY, col, w) => {
    if (gridX + w > col - 1) gridX = col - w; //右边界
    if (gridX < 0) gridX = 0; //左边界
    if (gridY < 0) gridY = 0; //上边界
    return { gridX, gridY };
};

/**
 * 检查卡片是否在组内包含
 * @param {Array} groups
 * @param {String} cardID
 * @returns {Boolean}
 */
export const checkCardContainInGroup = (groups, widgetId) => {
    let tmpFlag = false;
    groups.children.forEach(a => {
        if (a.widgetId === widgetId && a.isShadow === false) {
            tmpFlag = true;
        }
    });
    return tmpFlag;
};

export const isContained = (a, b) => {
	if (!(a instanceof Array) || !(b instanceof Array)) return false;
	if (a.length < b.length) return false;
	var aStr = a.toString();
	for (var i = 0, len = b.length; i < len; i++) {
		if (aStr.indexOf(b[i]) == -1) return false;
	}
	return true;
}