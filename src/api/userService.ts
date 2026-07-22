import axiosInstance from "./axiosInstance";

// ── Types ────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
}

// ── Endpoints ────────────────────────────────────────────────────────────────

/** Fetch all users */
export const getUsers = async (): Promise<User[]> => {
  const { data } = await axiosInstance.get<User[]>("/users");
  return data;
};

/** Fetch a single user by id */
export const getUserById = async (id: string): Promise<User> => {
  const { data } = await axiosInstance.get<User>(`/users/${id}`);
  return data;
};

/** Create a new user */
export const createUser = async (
  payload: Omit<User, "id">
): Promise<User> => {
  const { data } = await axiosInstance.post<User>("/users", payload);
  return data;
};

/** Update an existing user */
export const updateUser = async (
  id: string,
  payload: Partial<Omit<User, "id">>
): Promise<User> => {
  const { data } = await axiosInstance.put<User>(`/users/${id}`, payload);
  return data;
};

/** Delete a user */
export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};
