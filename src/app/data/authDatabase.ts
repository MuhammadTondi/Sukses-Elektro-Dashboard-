export type UserRole = "admin" | "user";

export interface AuthRecord {
  username: string;
  password: string;
  role: UserRole;
  name: string;
}

interface ProductRecord {
  id: string;
  name: string;
  category: string;
  stock: number;
  buyPrice: number;
  sellPrice: number;
}

interface SupplierRecord {
  id: string;
  name: string;
  contact: string;
  address: string;
}

interface AppDatabase {
  users: AuthRecord[];
  products: ProductRecord[];
  suppliers: SupplierRecord[];
}

const DB_STORAGE_KEY = "sukses-elektro-db";

const defaultUsers: AuthRecord[] = [
  {
    username: "Admin123",
    password: "Admin123",
    role: "admin",
    name: "Admin",
  },
  {
    username: "User123",
    password: "User123",
    role: "user",
    name: "User",
  },
];

const defaultDatabase: AppDatabase = {
  users: defaultUsers,
  products: [],
  suppliers: [],
};

function saveDatabase(database: AppDatabase) {
  window.localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(database));
}

function normalizeDatabase(raw: unknown): AppDatabase {
  const parsed = raw as Partial<AppDatabase> | null;

  return {
    users: Array.isArray(parsed?.users) ? parsed.users : [...defaultUsers],
    products: Array.isArray(parsed?.products) ? parsed.products : [],
    suppliers: Array.isArray(parsed?.suppliers) ? parsed.suppliers : [],
  };
}

export function initializeDatabase() {
  const stored = window.localStorage.getItem(DB_STORAGE_KEY);
  if (!stored) {
    saveDatabase(defaultDatabase);
    return;
  }

  try {
    const parsed = JSON.parse(stored);
    const normalized = normalizeDatabase(parsed);
    saveDatabase(normalized);
  } catch {
    saveDatabase(defaultDatabase);
  }
}

export function getAuthRecords(): AuthRecord[] {
  initializeDatabase();
  const stored = window.localStorage.getItem(DB_STORAGE_KEY);
  if (!stored) {
    return [...defaultUsers];
  }

  try {
    const parsed = JSON.parse(stored);
    return normalizeDatabase(parsed).users;
  } catch {
    return [...defaultUsers];
  }
}

export function findAuthRecord(username: string, password: string): AuthRecord | undefined {
  const normalizedUsername = username.trim();
  return getAuthRecords().find(
    (item) => item.username === normalizedUsername && item.password === password
  );
}
