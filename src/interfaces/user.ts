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
}

export interface Login {
  email: string;
  password: string;
}

export interface CustomRequest extends express.Request {
  user?: {
    _id: string;
    email: string;
    fullname: string;
    iat: number;
    exp: number;
  };
}
