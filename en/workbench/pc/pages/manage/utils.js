import _ from 'lodash';

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
 * 
 * @param {Array} cards
 * @param {Number} rowHeight
 * @param {Number} margin
 * @returns {Number} 
 */
export const getContainerMaxHeight = (cards, rowHeight, margin) => {
    const resultRow = layoutBottom(cards);
    return resultRow * rowHeight + (resultRow - 1) * margin[1] + 2 * margin[1];
};

/**
 * layoutY
 * @param {Array} layout
 * @returns {Number} Y
 */
export const layoutBottom = layout => {
    let max = 0,
        bottomY;
    for (let i = 0, len = layout.length; i < len; i++) {
        bottomY = layout[i].gridy + layout[i].height;
        if (bottomY > max) max = bottomY;
    }
    return max;
};

/**
 * GroupIDCardID
 * @param {Array} manageList
 * @param {String} groupID
 * @param {String} cardID
 * @return {Object} 
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
 * xy
 * @param {Number} x
 * @param {Number} y
 * @param {Number} cardWidth
 * @param {Number} margin
 * @param {Number} containerWidth
 * @param {Number} col
 * @param {Number} rowHeight
 * @returns {Object} gridxgridy
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
 * gridpx
 * @param {Number} gridx
 * @param {Number} gridy
 * @param {Number} margin
 * @param {Number} rowHeight
 * @param {Number} calWidth
 * @returns {Object} xy
 */
export const calGridItemPosition = (
    gridx,
    gridy,
    margin,
    rowHeight,
    calWidth
) => {
    const x = Math.round(gridx * calWidth + margin[0] * (gridx + 1));
    const y = Math.round(gridy * rowHeight + margin[1] * (gridy + 1));
    return {
        x: x,
        y: y
    };
};

/**
 * px
 * @param {Number} w
 * @param {Number} h
 * @param {Number} margin
 * @param {Number} rowHeight
 * @param {Number} cardWidth
 * @returns {Object} wPx, hPx
 */
export const calWHtoPx = (w, h, margin, rowHeight, calWidth) => {
    const wPx = Math.round(w * calWidth + (w - 1) * margin[0]);
    const hPx = Math.round(h * rowHeight + (h - 1) * margin[1]);
    return { wPx, hPx };
};

/**
 * 
 * @param {Array} groups
 * @param {String} property
 * @param {*} value
 */
export const setPropertyValueForCards = (groups, property, value) => {
    _.forEach(groups, (g, index) => {
        _.forEach(g.children, a => {
            a[property] = value;
        });
    });
};


/**
 * 
 * @param {Int} gridX
 * @param {Int} gridY
 * @param {Int} col
 * @param {Int} w 
 * @returns {Object} gridXgridY
 */
export const checkInContainer = (gridX, gridY, col, w) => {
    if (gridX + w > col - 1) gridX = col - w; //右边界
    if (gridX < 0) gridX = 0; //左边界
    if (gridY < 0) gridY = 0; //上边界
    return { gridX, gridY };
};

/**
 * 
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


/**
 * 
 * @param {Number} defaultCalWidth
 * @param {Number} containerWidth
 * @param {Number} containerPadding
 * @param {Number} margin
 * @returns {Number} 
 */
export const calColCount = (
    defaultCalWidth,
    containerWidth,
    containerPadding,
    margin
) => {
    if (margin) {
        return Math.floor(
            (containerWidth - containerPadding[0] * 2 - margin[0]) /
                (defaultCalWidth + margin[0])
        );
    }
};

/**
 *  
 * @param {Number} containerWidth
 * @param {Number} col
 * @param {Number} containerPadding
 * @param {Number} margin
 * @returns {Number} 
 */
export const calColWidth = (containerWidth, col, containerPadding, margin) => {
    if (margin) {
        return (
            (containerWidth - containerPadding[0] * 2 - margin[0] * (col + 1)) /
            col
        );
    }
    return (containerWidth - containerPadding[0] * 2 - 0 * (col + 1)) / col;
};

/**
 * ajax
 * @param {Function} fn 
 **/
let deferFnInterval;
export function DeferFn(fn) {
    deferFnInterval = new Date().getTime();
    setTimeout(() => {
        //停止输入0.5s后执行
        if (new Date().getTime() - deferFnInterval >= 500) {
            fn();
        }
    }, 500);
}

/**
 * 
 * @param {Array} groups
 * @param {Int} groupIndex
 * @param {String} cardID
 * @return {Object} 
 */
export const removeCardByGroupIndexAndCardID = (groups, groupIndex, cardID) => {
    let tmpGroupIndex = groupIndex;
    let resultCardArr = [];
    resultCardArr = _.remove(groups[tmpGroupIndex].children, a => {
        return a.widgetId === cardID;
    });
    return resultCardArr[0];
};
