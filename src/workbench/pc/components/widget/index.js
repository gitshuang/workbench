import FolderWidget from './folder';
import defaultWidget from './default';

function WidgetMaker(type) {
  switch (type) {
    case 2:
      return FolderWidget;
    default:
      return defaultWidget;
  }
}

export default WidgetMaker;
