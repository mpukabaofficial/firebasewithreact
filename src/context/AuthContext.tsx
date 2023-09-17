import {
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
  updateProfile,
  User as FirebaseUser,
  Auth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

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
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>(null);

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
    } catch (error: any) {
      console.error("Error creating user:", error.message);
      throw new Error("Failed to create user");
    }
  };

  const updateUserInfo: CreateUserFunction = async (user: any) => {};

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
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      throw new Error("Failed to log in");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Check if there's an authenticated user in local storage
    const storedUser = localStorage.getItem("authenticatedUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);

      // Remove the authenticated user from local storage on logout
      localStorage.removeItem("authenticatedUser");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
      throw new Error("Failed to log out");
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
