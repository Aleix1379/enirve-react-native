export default (state = {}, action) => {
  if (action.type === 'LOG_IN') {
    return action.user;
  } else {
    return state;
  }
};
