import {createStore} from 'redux';
import rootReduce from './reduces';

export default createStore(rootReduce, {user: null});
