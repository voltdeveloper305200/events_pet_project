export const validateForm = (email = '', numberPhone = '') => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
  if (typeof email != 'string' && typeof numberPhone != 'string') return false;
  return emailPattern.test(email) && phonePattern.test(numberPhone)
};
