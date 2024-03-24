export interface Product {
  id: number;
  description: string;
  price: number;
  image: string;
}

export enum RoutePath {
  SingIn = "/sign-in",
  SingUp = "/sign-up",
  Cart = "/cart",
  Main = "/main",
}

export enum ELocalStorageKey {
  UserData = "UserData",
}

export interface UserAuthCredentials {
  email: string;
  password: string;
}
