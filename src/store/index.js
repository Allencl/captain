import { createStore } from 'redux';


// 初始值
let defaultState={
    "global_spin_active":false
};

function counterReducer(state=defaultState,action) {
    switch (action.type){
      case 'update_global_spin':
        state["global_spin_active"]=action.value;
        return state; 
      default:
        return state
    }
}
  
// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counterReducer);


// function listenerHandle(){
//     // console.log("aaa");
// }
// store.subscribe(listenerHandle)


export default store;