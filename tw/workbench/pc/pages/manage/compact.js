import { getFirstCollision } from "./collision";
import { layoutBottom } from "./utils";
/**
 * itemgridxgridy
 * @param {Array} layout 
 * @returns {Array} layout
 */
const sortLayout = layout => {
    return [].concat(layout).sort((a, b) => {
        if (a.gridy > b.gridy || (a.gridy === b.gridy && a.gridx > b.gridx)) {
            return 1;
        } else if (a.gridy === b.gridy && a.gridx === b.gridx) {
            return 0;
        }
        return -1;
    });
};
/**
 * 
 * @param {Array} finishedLayout 
 * @param {Object} item
 * @returns {Object} item item
 */
const compactItem = (finishedLayout, item) => {
    const newItem = { ...item };
    if (finishedLayout.length === 0) {
        return { ...newItem, gridy: 0 };
    }

    while (true) {
        let FirstCollison = getFirstCollision(finishedLayout, newItem);
        if (FirstCollison) {
            newItem.gridy = FirstCollison.gridy + FirstCollison.height;
            return newItem;
        }
        newItem.gridy--;
        if (newItem.gridy < 0) return { ...newItem, gridy: 0 }; //碰到边界，gridy设为0
    }
};
/**
 * vertical
 * @param {Array} layout
 * @param {Object} movingItem
 * @returns {Array} layout layout
 */
export const compactLayout = function(layout, movingItem) {
    let sorted = sortLayout(layout);
    const compareList = [];
    const needCompact = Array(layout.length);

    for (let i = 0, length = sorted.length; i < length; i++) {
        let finished = compactItem(compareList, sorted[i]);
        compareList.push(finished);
        needCompact[i] = finished;
    }
    return needCompact;
};
/**
 * 
 * @param {Array} finishedLayout
 * @param {Object} item
 * @param {Int} cols
 * @returns {Object} 
 */
const getSpaceArea = (finishedLayout, item, cols) => {
    const newItem = { ...item };
    if (finishedLayout.length === 0) {
        return newItem;
    }

    let FirstCollison = getFirstCollision(finishedLayout, newItem);
    if (FirstCollison) {
        newItem.gridx++;
        if (newItem.gridx + item.width > cols) {
            newItem.gridx = 0;
            newItem.gridy++;
        }
        return getSpaceArea(finishedLayout, newItem, cols);
    } else {
        return newItem;
    }
};
/**
 * horizontal compact Layout Version2.0
 *  2.0
 * xy
 * grix=0y+1
 * 
 * @param {Array} layout
 * @param {Int} cols
 * @param {String} movingCardID 
 * @returns {layout} layout
 */
export const compactLayoutHorizontal = function(layout, cols, movingCardID) {
    let sorted = sortLayout(layout);
    const compareList = [];
    const needCompact = Array(layout.length);
    let arr = [];
    let moveCard;
    //进行坐标重置，移动中的卡片除外
    for (let i = 0; i < sorted.length; i++) {
        if (movingCardID === sorted[i].widgetId) {
            moveCard = sorted[i];
            continue;
        }
        arr.push(sorted[i]);
	}
	//获得当前组内的最大的y值，并赋值给移动卡片，防止分组Y值无限变大
    if (moveCard) {
        moveCard.gridy = Math.min(layoutBottom(arr), moveCard.gridy);
	}
	//将非移动的卡片进行坐标重置
    for (let i = 0; i < sorted.length; i++) {
        if (movingCardID !== sorted[i].widgetId) {
            sorted[i].gridy = 0;
            sorted[i].gridx = 0;
        }
    }
    let rowCount = 0;
    //进行重新放置，移动中卡片除外
    for (let i = 0, length = sorted.length; i < length; i++) {
        let finished;
        if (movingCardID === sorted[i].widgetId) {
            finished = sorted[i];
        } else {
            finished = getSpaceArea(compareList, sorted[i], cols);
        }
        compareList.push(finished);
        needCompact[i] = finished;
    }

    return needCompact;
};
