// retrieves cached user id, email and auth token
export const getSessionData = () => {
  return { session: JSON.parse(localStorage.getItem('Session')) };
};

// caches user id, email and auth token
export const setSessionData = (data) => {
  localStorage.setItem('Session', JSON.stringify(data));
};

export const clearSessionData = () => {
  localStorage.clear();
};

export const checkDateIsToday = (date) => {
  const dateToCheck = new Date(date);
  const today = new Date();
  return (
    dateToCheck?.getFullYear() === today.getFullYear() &&
    dateToCheck?.getMonth() === today.getMonth() &&
    dateToCheck?.getDate() === today.getDate()
  );
};
