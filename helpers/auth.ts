import type IUser from "../types/user";
import Pocketbase from "pocketbase";

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

export const getAdminToken = async (): string => {
  const pocketbase = new Pocketbase(process.env.POCKETBASE_URL);

  const admin = await pocketbase.admins.authWithPassword(
    process.env.POCKETBASE_ADMIN_USER,
    process.env.POCKETBASE_ADMIN_PASSWORD
  );
  return admin.token;
};
