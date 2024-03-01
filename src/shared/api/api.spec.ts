import { API } from './api';

describe('When sort data', () => {
  const srcData = [
    {
      name: 'timon',
      age: 5,
      budget: '$ 12,233.22',
    },
    {
      name: 'art',
      age: 10,
      budget: '$ 16,000.12',
    },
    {
      name: 'dart',
      age: 2,
      budget: '$ 22,102.75',
    },
  ];

  let instance: API<{ name: string; age: number; budget: string }>;

  beforeEach(() => {
    instance = new API<{ name: string; age: number; budget: string }>([
      ...srcData,
    ]);
    instance.setItemPerPage(2);
  });

  it('Should return data sorted by number', () => {
    const dataASC = instance.getSortedData(srcData, { age: 'asc' });
    const dataDESC = instance.getSortedData(srcData, { age: 'desc' });

    expect(dataASC).toEqual([srcData[2], srcData[0], srcData[1]]);
    expect(dataDESC).toEqual([srcData[1], srcData[0], srcData[2]]);
  });

  it('Should return data sorted by currency', () => {
    const dataASC = instance.getSortedData(srcData, { budget: 'asc' });
    const dataDESC = instance.getSortedData(srcData, { budget: 'desc' });

    expect(dataASC).toEqual([srcData[0], srcData[1], srcData[2]]);
    expect(dataDESC).toEqual([srcData[2], srcData[1], srcData[0]]);
  });

  it('Should return data sorted by string', () => {
    const dataASC = instance.getSortedData(srcData, { name: 'asc' });
    const dataDESC = instance.getSortedData(srcData, { name: 'desc' });

    expect(dataASC).toEqual([srcData[1], srcData[2], srcData[0]]);
    expect(dataDESC).toEqual([srcData[0], srcData[2], srcData[1]]);
  });
});

describe('When filter data', () => {
  const srcData = [
    {
      name: {
        first: 'timon',
        last: 'asd',
      },
      age: 5,
      budget: '$ 12,233.22',
    },
    {
      name: {
        first: 'art',
        last: 'paint',
      },
      age: 10,
      budget: '$ 16,000.12',
    },
    {
      name: {
        first: 'dark',
        last: 'light',
      },
      age: 2,
      budget: '$ 22,102.75',
    },
  ];

  let instance: API<{
    name: { first: string; last: string };
    age: number;
    budget: string;
  }>;

  beforeEach(() => {
    instance = new API<{
      name: { first: string; last: string };
      age: number;
      budget: string;
    }>([...srcData]);
    instance.setItemPerPage(2);
  });

  it('Should return filtered data', () => {
    const filteredData = instance.filter([...srcData], {name: { first: 'timon' }});

    expect(filteredData).toEqual([srcData[0]]);
  });
});
