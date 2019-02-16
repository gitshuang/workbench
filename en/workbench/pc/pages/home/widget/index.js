import React from 'react';
import FolderWidget from './folder';
import defaultWidget from './default';
import normalWidget from './normal';
import default_n from './default_n';

function WidgetMaker({
  type,
  jsurl,
}) {
	if(type===2){
		return FolderWidget;
	}
	if(jsurl){
		return normalWidget;
	}
  switch (type) {
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
			return default_n;
    default:
      return defaultWidget;
  }
}

export default WidgetMaker;
