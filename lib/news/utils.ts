export function safeIso(dt?: string | null) {
  if (!dt) return null;
  const t = Date.parse(dt);
  return Number.isNaN(t) ? null : new Date(t).toISOString();
}

export function dedupeByUrl<T extends { url: string }>(items: T[]) {
  const seen = new Set<string>();
  return items.filter(({ url }) => {
    const key = (url || "").trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function fetchWithTimeout(
  url: string,
  init?: RequestInit,
  timeoutMs = 8000
) {
  const ctrl = new AbortController();
  const tm = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...init,
      signal: ctrl.signal,
      cache: init?.cache ?? "no-store"
    });
    return res;
  } finally {
    clearTimeout(tm);
  }
}
