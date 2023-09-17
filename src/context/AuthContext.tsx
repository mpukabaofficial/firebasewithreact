import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";

type User = FirebaseUser | null;

type CreateUserFunction = (email: string, password: string) => Promise<void>;

interface AuthContextProps {
  user: User;
  createUser: CreateUserFunction;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<User | null>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>(null);

  const createUser: CreateUserFunction = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error("Failed to create user: " + error.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error: any) {
      throw new Error("Failed to log in: " + error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error("Failed to log out: " + error.message);
    }
  };

  return (
    <UserContext.Provider value={{ user, createUser, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserAuth must be used within an AuthContextProvider");
  }
  return context;
};
