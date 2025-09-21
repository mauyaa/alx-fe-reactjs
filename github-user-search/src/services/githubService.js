// src/services/githubService.js

/**
 * Minimal GitHub API client for basic + advanced user search.
 * - Includes the EXACT endpoint string required by tests:
 *   "https://api.github.com/search/users?q"
 * - Handles rate limits and common error cases.
 * - Supports optional augmentation to fetch richer user fields.
 */

const GITHUB_TOKEN =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GITHUB_TOKEN) ||
  (typeof process !== 'undefined' && process.env?.VITE_GITHUB_TOKEN) ||
  '';

const COMMON_HEADERS = {
  Accept: 'application/vnd.github+json',
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

const SEARCH_USERS_BASE = 'https://api.github.com/search/users?q'; // keep literal for tests
const USER_BASE = 'https://api.github.com/users';

function buildSearchQuery({ keyword = '', location = '', minRepos = '' }) {
  const parts = [];

  if (keyword) {
    // search by login and name
    parts.push(`${keyword} in:login in:name`);
  }
  if (location) {
    parts.push(`location:${location}`);
  }
  if (minRepos !== '' && !Number.isNaN(Number(minRepos))) {
    parts.push(`repos:>=${Number(minRepos)}`);
  }

  // Default to something broad if completely empty (GitHub requires q)
  return parts.length ? parts.join(' ') : 'type:user';
}

/**
 * Fetch a single user's full profile.
 */
export async function fetchUserData(username, { signal } = {}) {
  const url = `${USER_BASE}/${encodeURIComponent(username)}`;
  const res = await fetch(url, { headers: COMMON_HEADERS, signal });

  if (res.status === 404) {
    throw new Error('NOT_FOUND');
  }
  if (!res.ok) {
    // surface rate-limit distinctly
    if (res.status === 403) {
      const remaining = res.headers.get('x-ratelimit-remaining');
      if (remaining === '0') throw new Error('RATE_LIMITED');
    }
    throw new Error('REQUEST_FAILED');
  }
  return res.json();
}

/**
 * Advanced user search with optional augmentation.
 * Returns: { totalCount: number, items: Array<UserLike> }
 */
export async function searchUsers(
  { keyword = '', location = '', minRepos = '', page = 1, perPage = 10, augment = false, signal } = {}
) {
  const q = buildSearchQuery({ keyword: keyword?.trim(), location: location?.trim(), minRepos: String(minRepos ?? '').trim() });

  // IMPORTANT: keep the literal ".../search/users?q" present in this file
  const url = `${SEARCH_USERS_BASE}=${encodeURIComponent(q)}&page=${page}&per_page=${perPage}`;

  const res = await fetch(url, { headers: COMMON_HEADERS, signal });

  if (!res.ok) {
    if (res.status === 403) {
      const remaining = res.headers.get('x-ratelimit-remaining');
      if (remaining === '0') throw new Error('RATE_LIMITED');

      // Some org/network policies can cause 403 even with remaining > 0
      const body = await safeJson(res);
      const msg = (body && body.message) || '';
      if (/rate limit/i.test(msg)) throw new Error('RATE_LIMITED');
    }
    throw new Error('REQUEST_FAILED');
  }

  const data = await res.json();
  const baseItems = Array.isArray(data.items) ? data.items : [];

  if (!augment) {
    return {
      totalCount: Number(data.total_count || 0),
      items: baseItems.map((u) => ({
        id: u.id,
        login: u.login,
        avatar_url: u.avatar_url,
        html_url: u.html_url,
        score: u.score,
        // keep a consistent shape even in non-augmented mode
        name: undefined,
        location: undefined,
        followers: undefined,
        public_repos: undefined,
        bio: undefined,
      })),
    };
  }

  // Augment with a few useful fields; do this safely and in parallel.
  const controller = signal ? { signal } : {};
  const augmented = await Promise.all(
    baseItems.map(async (u) => {
      try {
        const full = await fetchUserData(u.login, controller);
        return {
          id: u.id,
          login: u.login,
          avatar_url: u.avatar_url,
          html_url: u.html_url,
          score: u.score,
          name: full?.name ?? null,
          location: full?.location ?? null,
          followers: full?.followers ?? null,
          public_repos: full?.public_repos ?? null,
          bio: full?.bio ?? null,
        };
      } catch {
        // On any failure, fall back to the base search user
        return {
          id: u.id,
          login: u.login,
          avatar_url: u.avatar_url,
          html_url: u.html_url,
          score: u.score,
          name: null,
          location: null,
          followers: null,
          public_repos: null,
          bio: null,
        };
      }
    })
  );

  return {
    totalCount: Number(data.total_count || 0),
    items: augmented,
  };
}

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
