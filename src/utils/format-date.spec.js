import formatDate from './format-date';

describe('formatDate(epoch)', () => {
  it('throws without epoch', () => {
    expect(() => {
      formatDate();
    }).toThrow(/^Provide epoch to format date$/);
  });

  it('formats date with epoch', () => {
    const wed29Jan2020 = '2020-01-29';
    const want = 'Wed, Jan 29, 2020';

    const epoch = new Date(wed29Jan2020).getTime();
    const formatted = formatDate(epoch);
    expect(formatted).toEqual(want);
  });
});
