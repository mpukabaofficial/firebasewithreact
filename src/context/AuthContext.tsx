import { createContext, ReactNode, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
  Auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../api/firebase";
import { FirebaseError } from "firebase/app";
import Cookies from "js-cookie";

type User = FirebaseUser | null;

type CreateUserFunction = (
  name: string,
  email: string,
  password: string
) => Promise<void>;

interface AuthContextProps {
  user: User;
  createUser: CreateUserFunction;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<User | null>;
  ready: boolean;
  signInWithGoogle: () => Promise<FirebaseUser | undefined>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>(null);
  const [ready, setReady] = useState(false);

  const createUser: CreateUserFunction = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth as Auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile with the provided name
      await updateProfile(user, { displayName: name });
      setReady(true);
    } catch (error: unknown) {
      console.error("Error creating user:", (error as Error).message);
      throw new Error("Failed to create user");
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      if (userCredential) {
        // Set a secure, HTTP-only cookie with the user's UID
        Cookies.set("user", userCredential.user.uid, {
          expires: 1,
          secure: true,
          httpOnly: true,
        });
        return userCredential.user;
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert("Error signing in with Google");
        console.error("Error signing in with Google:", error.message);
        throw new Error("Failed to sign in with Google");
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth as Auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store the authenticated user in local storage
      localStorage.setItem("authenticatedUser", JSON.stringify(user));

      return user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert("Error logging in invalid email/password");
        console.error("Error logging in:", error.message);
        throw new Error("Failed to log in");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setReady(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);

      // Remove the authenticated user from local storage on logout
      localStorage.removeItem("authenticatedUser");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Error logging out:", error.message);
        throw new Error("Failed to log out");
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        createUser,
        logout,
        login: login as (email: string, password: string) => Promise<User>,
        ready,
        signInWithGoogle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
