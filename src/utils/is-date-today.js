/**
 * Determines if epoch is "today".
 *
 * @param {Number} epoch
 *
 * @return {Bool} If epoch is today or not
 */
export default function isDateToday(epoch) {
  if (!epoch) {
    throw new Error('Provide epoch to check date');
  }

  const epochDate = new Date(epoch);
  const now = new Date();

  return (
    epochDate.getDate() === now.getDate() &&
    epochDate.getMonth() === now.getMonth() &&
    epochDate.getFullYear() === now.getFullYear()
  );
}
