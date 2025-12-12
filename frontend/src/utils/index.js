// utils/checkApiSuccess.js

/**
 * Checks if API response is successful
 * @param {Object} response - Axios response object
 * @returns {Boolean} 
 */
export const isApiSuccess = (response) => {
  if (!response) return false;

  const res = response.data || response;

  // Check common API success patterns
  return (
    res.success === true ||
    res.status === true ||
    res.ok === true ||
    (response.status >= 200 && response.status < 300)
  );
};
