import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  findAuthRecord,
  initializeDatabase,
  type AuthRecord,
  type UserRole,
} from "../data/authDatabase";

const AUTH_STORAGE_KEY = "sukses-elektro-auth";

interface AuthSession {
  username: string;
  role: UserRole;
  name: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

interface AuthContextValue {
  user: AuthSession | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => { success: true } | { success: false; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function toSession(record: AuthRecord): AuthSession {
  return {
    username: record.username,
    role: record.role,
    name: record.name,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthSession | null>(null);

  useEffect(() => {
    initializeDatabase();
    const savedSession = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!savedSession) {
      return;
    }

    try {
      const parsedSession = JSON.parse(savedSession) as AuthSession;
      setUser(parsedSession);
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const login = useCallback(({ username, password }: LoginPayload) => {
    const record = findAuthRecord(username, password);

    if (!record) {
      return {
        success: false as const,
        message: "Username atau password tidak valid.",
      };
    }

    const session = toSession(record);
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    setUser(session);

    return { success: true as const };
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
