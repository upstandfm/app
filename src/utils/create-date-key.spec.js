import createDateKey from './create-date-key';

describe('createDateKey(date)', () => {
  it('throws without a date', () => {
    expect(() => {
      createDateKey();
    }).toThrow(/^Provided "date" is not a valid Date Object$/);
  });

  it('returns a date key with format "YYYY-MM-DD"', () => {
    // Wed Jan 29 2020 00:00:00 GMT+0100 (Central European Standard Time)
    const wed29Jan2020 = new Date(2020, 0, 29);
    const dateKey = createDateKey(wed29Jan2020);
    expect(dateKey).toEqual('2020-01-29');
  });
});
