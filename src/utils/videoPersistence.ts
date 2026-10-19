/**
 * Persistent Video Storage Utility for GrowDigital
 * Uses IndexedDB to persist local video files (Blob/File) across browser tabs,
 * page navigations, and reloads, and localStorage for video URLs.
 */

const DB_NAME = 'growdigital_media_db';
const STORE_NAME = 'media_files';
const DB_VERSION = 1;
const STORAGE_META_KEY = 'growdigital_custom_video_meta';

interface VideoMeta {
  type: 'file' | 'url';
  name?: string;
  url?: string;
  timestamp: number;
}

// Open or initialize IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

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

/**
 * Save an uploaded video file (Blob or File) into IndexedDB
 */
export async function saveCustomVideoFile(file: Blob | File, fileName?: string): Promise<{ url: string; name: string }> {
  try {
    const db = await openDB();
    const name = fileName || (file instanceof File ? file.name : 'custom-background.mp4');

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(file, 'background_video');
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });

    const meta: VideoMeta = {
      type: 'file',
      name,
      timestamp: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_META_KEY, JSON.stringify(meta));
    } catch {
      // Ignore localStorage errors
    }

    const blobUrl = URL.createObjectURL(file);
    return { url: blobUrl, name };
  } catch (err) {
    console.error('Failed to save video to IndexedDB:', err);
    // Fallback to in-memory blob url
    const name = fileName || (file instanceof File ? file.name : 'custom-video.mp4');
    const blobUrl = URL.createObjectURL(file);
    return { url: blobUrl, name };
  }
}

/**
 * Save a custom external/internal video URL into localStorage
 */
export async function saveCustomVideoUrl(url: string): Promise<{ url: string; name: string }> {
  // Clear any existing blob from IndexedDB to save space
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete('background_video');
  } catch {
    // Ignore
  }

  const name = url.split('/').pop() || 'Custom Stream';
  const meta: VideoMeta = {
    type: 'url',
    url,
    name,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(STORAGE_META_KEY, JSON.stringify(meta));
  } catch {
    // Ignore
  }

  return { url, name };
}

/**
 * Load any persisted custom video on app startup or tab switch
 */
export async function loadPersistedVideo(): Promise<{ url: string | null; name: string | null; type: 'file' | 'url' | null }> {
  try {
    const rawMeta = localStorage.getItem(STORAGE_META_KEY);
    if (!rawMeta) {
      return { url: null, name: null, type: null };
    }

    const meta: VideoMeta = JSON.parse(rawMeta);

    if (meta.type === 'url' && meta.url) {
      return { url: meta.url, name: meta.name || 'Custom URL', type: 'url' };
    }

    if (meta.type === 'file') {
      const db = await openDB();
      const blob = await new Promise<Blob | null>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get('background_video');
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });

      if (blob) {
        const blobUrl = URL.createObjectURL(blob);
        return { url: blobUrl, name: meta.name || 'Uploaded Video', type: 'file' };
      }
    }

    return { url: null, name: null, type: null };
  } catch (err) {
    console.error('Failed to load persisted video:', err);
    return { url: null, name: null, type: null };
  }
}

/**
 * Remove any persisted video and reset back to the default video
 */
export async function clearPersistedVideo(): Promise<void> {
  try {
    localStorage.removeItem(STORAGE_META_KEY);
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete('background_video');
  } catch {
    // Ignore
  }
}
