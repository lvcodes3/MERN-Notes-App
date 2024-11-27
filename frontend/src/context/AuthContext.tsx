import {
  useState,
  useEffect,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

import { UserInterface } from "../models/user";

import * as UsersApi from "../network/users_api";

interface AuthContextInterface {
  authUser: UserInterface | null;
  setAuthUser: Dispatch<SetStateAction<UserInterface | null>>;
  isLoading: boolean;
}

// create the auth context //
const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

// custom hook to consume auth context //
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider."
    );
  }

  return context;
};

// auth context provider //
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authUser, setAuthUser] = useState<UserInterface | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const authResponse = await UsersApi.authenticateUser();
        setAuthUser(authResponse);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error message:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
