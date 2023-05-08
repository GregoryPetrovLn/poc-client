type User = {
  name?: string;
  email: string;
  token?: string;
  role?: string;
  password?: string;
  _id?: string;
};
type Product = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  _id?: string;
};

type TableRenderer = {
  id: string;
  label: string;
};