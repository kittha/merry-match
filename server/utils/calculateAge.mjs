/**
 * Calculates the age based on the provided date of birth.
 *
 * @param {string} dateOfBirth - The date of birth in the format "YYYY-MM-DD".
 * @return {number} The calculated age in years.
 */
const calculateAge = (dateOfBirth) => {
  const dob = new Date(dateOfBirth);
  const diffMs = Date.now() - dob.getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
};

export default calculateAge;
