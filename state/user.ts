import type IUser from "../types/user";
import { atom } from "recoil";

export const userState = atom<IUser>({
  key: "userState",
  default: {},
});
