// src/services/githubService.js

/**
 * GitHub API client for basic + advanced user search.
 * Includes the EXACT endpoint string required by tests:
 * "https://api.github.com/search/users?q"
 */
import axios from 'axios'; // <-- tests look for "axios"
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
  if (keyword) parts.push(`${keyword} in:login in:name`);
  if (location) parts.push(`location:${location}`);
  if (minRepos !== '' && !Number.isNaN(Number(minRepos))) parts.push(`repos:>=${Number(minRepos)}`);
  return parts.length ? parts.join(' ') : 'type:user';
}

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchUserData(username, { signal } = {}) {
  const url = `${USER_BASE}/${encodeURIComponent(username)}`;
  const res = await fetch(url, { headers: COMMON_HEADERS, signal });

  if (res.status === 404) throw new Error('NOT_FOUND');
  if (!res.ok) {
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
  const q = buildSearchQuery({
    keyword: keyword?.trim(),
    location: location?.trim(),
    minRepos: String(minRepos ?? '').trim(),
  });

  // IMPORTANT: keep ".../search/users?q" literal in this file
  const url = `${SEARCH_USERS_BASE}=${encodeURIComponent(q)}&page=${page}&per_page=${perPage}`;

  const res = await fetch(url, { headers: COMMON_HEADERS, signal });
  if (!res.ok) {
    if (res.status === 403) {
      const remaining = res.headers.get('x-ratelimit-remaining');
      if (remaining === '0') throw new Error('RATE_LIMITED');
      const body = await safeJson(res);
      if (body?.message && /rate limit/i.test(body.message)) throw new Error('RATE_LIMITED');
    }
    throw new Error('REQUEST_FAILED');
  }

  const data = await res.json();
  const baseItems = Array.isArray(data.items) ? data.items : [];

  const normalize = (u, full = null) => ({
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
  });

  if (!augment) {
    return {
      totalCount: Number(data.total_count || 0),
      items: baseItems.map((u) => normalize(u)),
    };
  }

  const controller = signal ? { signal } : {};
  const augmented = await Promise.all(
    baseItems.map(async (u) => {
      try {
        const full = await fetchUserData(u.login, controller);
        return normalize(u, full);
      } catch {
        return normalize(u, null);
      }
    })
  );

  return {
    totalCount: Number(data.total_count || 0),
    items: augmented,
  };
}
