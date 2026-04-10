const DB_NAME = "csv_viewer_db";
const DB_VERSION = 1;
const STORE_NAME = "csv_data";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function idbSet(key: string, value: any): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(value, key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function idbGet<T>(key: string): Promise<T | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => reject(req.error);
  });
}

async function idbDelete(key: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export interface CsvSession {
  searchTerm?: string;
  sortConfig?: { key: string; direction: "asc" | "desc" } | null;
  isEditing?: boolean;
  highlightEnabled?: boolean;
  scrollTop?: number;
}

export interface SavedCsvEntry {
  id: string;
  name: string;
  savedAt: number;
  rowCount: number;
  data: any[];
  headers: string[];
}

export const csvStorage = {
  async saveCurrentFile(data: any[], headers: string[], fileName: string): Promise<void> {
    await Promise.all([
      idbSet("csv_viewer_data", data),
      idbSet("csv_viewer_headers", headers),
      idbSet("csv_viewer_filename", fileName),
    ]);
  },

  async loadCurrentFile(): Promise<{ data: any[]; headers: string[]; fileName: string } | null> {
    const [data, headers, fileName] = await Promise.all([
      idbGet<any[]>("csv_viewer_data"),
      idbGet<string[]>("csv_viewer_headers"),
      idbGet<string>("csv_viewer_filename"),
    ]);
    if (!data || !headers || !fileName) return null;
    return { data, headers, fileName };
  },

  async clearCurrentFile(): Promise<void> {
    await Promise.all([
      idbDelete("csv_viewer_data"),
      idbDelete("csv_viewer_headers"),
      idbDelete("csv_viewer_filename"),
    ]);
    localStorage.removeItem("csv_viewer_data");
    localStorage.removeItem("csv_viewer_headers");
    localStorage.removeItem("csv_viewer_filename");
  },

  saveSession(session: CsvSession): void {
    try {
      localStorage.setItem("csv_viewer_session", JSON.stringify(session));
    } catch {}
  },

  loadSession(): CsvSession | null {
    try {
      const raw = localStorage.getItem("csv_viewer_session");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  clearSession(): void {
    localStorage.removeItem("csv_viewer_session");
  },

  async saveSavedFiles(entries: SavedCsvEntry[]): Promise<void> {
    const metadata = entries.map(({ id, name, savedAt, rowCount }) => ({ id, name, savedAt, rowCount }));
    localStorage.setItem("csv_viewer_saved_meta", JSON.stringify(metadata));
    await Promise.all(
      entries.map(e => idbSet(`csv_saved_${e.id}`, { data: e.data, headers: e.headers }))
    );
  },

  async loadSavedFiles(): Promise<SavedCsvEntry[]> {
    try {
      const metaRaw = localStorage.getItem("csv_viewer_saved_meta");
      if (!metaRaw) {
        const legacyRaw = localStorage.getItem("csv_viewer_saved_files");
        if (legacyRaw) {
          const legacy: SavedCsvEntry[] = JSON.parse(legacyRaw);
          await csvStorage.saveSavedFiles(legacy);
          localStorage.removeItem("csv_viewer_saved_files");
          return legacy;
        }
        return [];
      }
      const metadata: Array<{ id: string; name: string; savedAt: number; rowCount: number }> = JSON.parse(metaRaw);
      const entries = await Promise.all(
        metadata.map(async (m) => {
          const payload = await idbGet<{ data: any[]; headers: string[] }>(`csv_saved_${m.id}`);
          if (!payload) return null;
          return { ...m, data: payload.data, headers: payload.headers } as SavedCsvEntry;
        })
      );
      return entries.filter(Boolean) as SavedCsvEntry[];
    } catch {
      return [];
    }
  },

  async deleteSavedFile(id: string, remaining: SavedCsvEntry[]): Promise<void> {
    await idbDelete(`csv_saved_${id}`);
    const metadata = remaining.map(({ id: eid, name, savedAt, rowCount }) => ({ id: eid, name, savedAt, rowCount }));
    if (metadata.length === 0) {
      localStorage.removeItem("csv_viewer_saved_meta");
    } else {
      localStorage.setItem("csv_viewer_saved_meta", JSON.stringify(metadata));
    }
  },
};
