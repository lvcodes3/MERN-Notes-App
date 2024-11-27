import {
  UserInterface,
  RegisterUserInterface,
  LoginUserInterface,
} from "../models/user";

const BASE_URL = "/api/users";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error || "An error occurred.";
    throw new Error(errorMessage);
  }
};

export const registerUser = async (
  registerUserData: RegisterUserInterface
): Promise<UserInterface> => {
  const response = await fetchData(`${BASE_URL}/register`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(registerUserData),
  });
  return await response.json();
};

export const loginUser = async (
  loginUserData: LoginUserInterface
): Promise<UserInterface> => {
  const response = await fetchData(`${BASE_URL}/login`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(loginUserData),
  });
  return await response.json();
};

export const authenticateUser = async (): Promise<UserInterface> => {
  const response = await fetchData(`${BASE_URL}/auth`, {
    method: "GET",
  });
  return await response.json();
};

export const logoutUser = async (): Promise<void> => {
  await fetchData(`${BASE_URL}/logout`, {
    method: "POST",
  });
};
