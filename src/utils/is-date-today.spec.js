import isDateToday from './is-date-today';

describe('isDateToday(epoch)', () => {
  it('throws without epoch', () => {
    expect(() => {
      isDateToday();
    }).toThrow(/^Provide epoch to check date$/);
  });

  it('returns true for today', () => {
    const isToday = isDateToday(new Date().getTime());
    expect(isToday).toEqual(true);
  });

  it('returns false for other date', () => {
    const isToday = isDateToday(new Date('2010-01-01').getTime());
    expect(isToday).toEqual(false);
  });
});
