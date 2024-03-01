export type Name = {
  first: string,
  last: string,
}

export type Company = {
  _id: string,
  isActive: boolean,
  balance: string,
  picture: string,
  age: number,
  name: Name,
  company: string,
  email: string,
  address: string,
  tags: string[],
  favoriteFruit: string,
};
