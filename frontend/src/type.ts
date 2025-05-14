// Girl data type
export type Girl = {
  id: string;
  name: string;
  age: number;
  height: number;
  nationality: string;
  price: number;
  avatar: string;
  self_introduction: string;
  available_time: string; // weekend , both
  price_id: string;
};

export type Order = {
  id: string;
  girlName: string;
  totalPrice: number;
  paidDate: string;
};

export type UserProfile = {
  account: string;
  password: string;
  selfIntroduction: string;
  orders: Order[];
};
