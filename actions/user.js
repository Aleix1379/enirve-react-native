export function login(user) {
  return {
    type: 'LOG_IN',
    user,
  };
}

export function logout() {
  console.log('action logout...');
  return {
    type: 'LOG_OUT',
    user: null,
  };
}
