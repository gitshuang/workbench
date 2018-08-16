import { createActions } from '@u';
import types from './types';
import {
  applyService,
 
} from './api';

const {
  APPLY_SERVICE,
  
} = types;

const actions = createActions(
  {
    namespace: 'loginpage',
  },
  {
    [APPLY_SERVICE]: applyService,
   
  }
);
export default actions;
