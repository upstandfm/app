import sortDateKeysDesc from './sort-date-keys-desc';

describe('sortDateKeysDesc(dateKeys)', () => {
  it('throws when no list is provided', () => {
    expect(() => {
      sortDateKeysDesc();
    }).toThrow(/^Provide a list of dates with format "YYYY-MM-DD"$/);
  });

  it('throws when list contains invalid date', () => {
    expect(() => {
      sortDateKeysDesc(['2020-01-29', '29-01-2020']);
    }).toThrow(/^Invalid date in list, valid format is "YYYY-MM-DD"$/);
  });

  it('sorts valid date keys and returns list of date + epoch', () => {
    const input = ['2020-01-01', '2019-12-30', '2019-04-15', '2020-01-29'];

    const want = [
      {
        dateKey: '2020-01-29',
        epoch: 1580256000000
      },
      {
        dateKey: '2020-01-01',
        epoch: 1577836800000
      },
      {
        dateKey: '2019-12-30',
        epoch: 1577664000000
      },
      {
        dateKey: '2019-04-15',
        epoch: 1555286400000
      }
    ];

    const sortedDateKeys = sortDateKeysDesc(input);
    expect(sortedDateKeys).toEqual(want);
  });
});
