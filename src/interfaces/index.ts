import express from "express";

export interface User {
  _id: string;
  email: string;
  fullname: string;
  password: string;
}

export interface Register {
  email: string;
  fullname: string;
  password: string;
  isSuperAdmin?: boolean;
}

export interface Login {
  email: string;
  password: string;
}

export interface CustomRequest extends express.Request {
  user?: {
    id: string;
    email: string;
    fullname: string;
    iat: number;
    exp: number;
  };
}

// export interface Product {
//   name: string;
//   price: number;
//   description: string;
//   imgUrl: string;
//   category: Types.ObjectId;
// }

// export interface Category {
//   _id: string;
//   name: string;
//   imgUrl: string;
//   products: Types.ObjectId[];
// }
