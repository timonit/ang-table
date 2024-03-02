export type SortType = 'asc' | 'desc';

export type Sort<T> = {
  [p in keyof T]?: SortType;
};

export type FilterOptions<T> = {
  [p in keyof T]?: T[p];
};
