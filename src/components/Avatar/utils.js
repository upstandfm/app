/**
 * Get the initials from a full name.
 *
 * @param {String} fullName
 *
 * @return {String} Initials
 */
export function getFullNameInitials(fullName = '') {
  const [firstName = '', lastName = ''] = fullName.split(' ');
  const firstLetter = firstName ? firstName[0] : '';
  const secondLetter = lastName ? lastName[0] : '';
  return firstLetter + secondLetter;
}
