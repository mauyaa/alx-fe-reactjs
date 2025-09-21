import axios from 'axios';

const token = import.meta.env.VITE_APP_GITHUB_API_KEY?.trim();

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'X-GitHub-Api-Version': '2022-11-28'
  },
  timeout: 10000
});

/**
 * Basic user fetch by username
 * GET /users/{username}
 */
export async function fetchUserData(username) {
  if (!username) throw new Error('USERNAME_REQUIRED');
  try {
    const res = await api.get(`/users/${encodeURIComponent(username)}`);
    return res.data;
  } catch (err) {
    const status = err?.response?.status;
    if (status === 404) {
      const e = new Error('NOT_FOUND');
      e.code = 404;
      throw e;
    }
    if (status === 403) {
      const reset = err.response.headers?.['x-ratelimit-reset'];
      const e = new Error('RATE_LIMITED');
      e.code = 403;
      e.reset = reset ? Number(reset) : undefined;
      throw e;
    }
    const e = new Error('GENERIC_ERROR');
    e.code = status || 0;
    throw e;
  }
}

/**
 * Advanced user search
 * GET /search/users?q=...&page=&per_page=
 * Optionally augments each item with details (location, public_repos).
 */
export async function searchUsers({ keyword = '', location = '', minRepos = '', page = 1, perPage = 10, augment = true }) {
  const qTokens = [];
  if (keyword) qTokens.push(keyword);
  if (location) qTokens.push(`location:"${location}"`);
  if (minRepos) qTokens.push(`repos:>=${minRepos}`);
  const query = qTokens.join(' ').trim() || 'type:user';

  try {
    const res = await api.get('/search/users', {
      params: { q: query, page, per_page: perPage }
    });

    let items = res.data?.items ?? [];
    const totalCount = res.data?.total_count ?? 0;

    if (augment && items.length) {
      const details = await Promise.all(
        items.map(u =>
          api.get(`/users/${u.login}`)
            .then(r => r.data)
            .catch(() => null)
        )
      );
      items = items.map((u, i) => ({ ...u, details: details[i] }));
    }

    return { items, totalCount, query };
  } catch (err) {
    const status = err?.response?.status;
    if (status === 403) {
      const reset = err.response.headers?.['x-ratelimit-reset'];
      const e = new Error('RATE_LIMITED');
      e.code = 403;
      e.reset = reset ? Number(reset) : undefined;
      throw e;
    }
    const e = new Error('GENERIC_ERROR');
    e.code = status || 0;
    throw e;
  }
}
