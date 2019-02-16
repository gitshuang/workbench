export function findTreeById(data, curId) {
    let result;
    for (let i = 0, l = data.length; i < l; i += 1) {
        const menu = data[i];
        const { id, children } = menu;
        if (children && children.length) {
            result = findTreeById(children, curId);
        }
        if (result) {
            break;
        }
        if (id === curId) {
            result = menu;
            break;
        }
    }
    return result;
};


// 定义上下移动数组
export function swapItems(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}

export function findById(manageList, id) {
    let data;
    for (let i = 0; i < manageList.length; i++) {
        if (manageList[i].widgetId && manageList[i].widgetId === id) {
            data = manageList[i];
            break;
        } else {
            manageList[i].children && findById(manageList[i].children, id);
        }
    }
    return data;
}

export function setDefaultSelected(manageList, applicationsMap) {
    manageList.forEach((da) => {
        if (da && da.type === 3) { // 表示服务和应用
            if (applicationsMap[da.serviceId]) {
                applicationsMap[da.serviceId].selected = '1';
            }
        } else if (da.children && da.children != 0) {
            setDefaultSelected(da.children, applicationsMap);
        }
    });
}

function isSameParent(preParentId, parentId) {
    return preParentId == parentId;
}
function compareIndex(manageAllList, id, afterId, preParentId, parentId) {
    let parentData = {},
        curIndex = 0,
        afterIndex = 0;
    if (preParentId == parentId) {
        parentData = findById(manageAllList, preParentId);
    }
    parentData.children.forEach((v, k) => {
        if (v.widgetId == id) {
            curIndex = k;
        }
        if (v.widgetId == afterId) {
            afterIndex = k;
        }
    });
    return curIndex < afterIndex;
}
