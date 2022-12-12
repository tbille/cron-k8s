import type IUser from "../types/user";

export const getUserInfo = (record: any): IUser => {
  return {
    avatar: record.avatar,
    email: record.email,
    name: record.name,
    rows_count: record.rows_count,
    rows_limit: record.rows_limit,
    username: record.username,
    verified: record.verified,
  };
};
