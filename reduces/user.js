export default (state = {}, action) => {
  if (action.type === 'LOG_IN' || action.type === 'LOG_OUT') {
    return action.user;
  } else {
    return state;
  }
};
