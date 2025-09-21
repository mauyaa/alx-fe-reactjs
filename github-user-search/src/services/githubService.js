// src/components/Search.jsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService.js';
import Spinner from './Spinner.jsx';
import ErrorBanner from './ErrorBanner.jsx';
import UserCard from './UserCard.jsx';
import UserList from './UserList.jsx';
import Pagination from './Pagination.jsx';

export default function Search() {
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' | 'advanced'

  // Basic search state
  const [username, setUsername] = useState('');
  const [basicLoading, setBasicLoading] = useState(false);
  const [basicError, setBasicError] = useState('');
  const [basicUser, setBasicUser] = useState(null);

  // Advanced search state
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [advPage, setAdvPage] = useState(1);
  const [advPerPage] = useState(10);
  const [advLoading, setAdvLoading] = useState(false);
  const [advError, setAdvError] = useState('');
  const [advResults, setAdvResults] = useState([]);
  const [advTotalCount, setAdvTotalCount] = useState(0);
  const advAbortRef = useRef(null);

  const canSearchAdvanced = useMemo(
    () => Boolean(keyword || location || minRepos),
    [keyword, location, minRepos]
  );

  useEffect(() => {
    if (activeTab === 'advanced' && canSearchAdvanced) {
      void handleAdvancedSearch({ page: advPage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advPage]);

  function switchTab(nextTab) {
    setActiveTab(nextTab);
    if (nextTab === 'basic') setAdvError('');
    else setBasicError('');
  }

  async function handleBasicSubmit(e) {
    e.preventDefault();
    const term = username.trim();
    if (!term) return;

    setBasicLoading(true);
    setBasicError('');
    setBasicUser(null);

    try {
      const user = await fetchUserData(term);
      setBasicUser(user);
    } catch {
      setBasicError('Looks like we cant find the user');
    } finally {
      setBasicLoading(false);
    }
  }

  async function handleAdvancedSearch({ page = 1 } = {}) {
    // Abort any in-flight advanced request
    if (advAbortRef.current) advAbortRef.current.abort();
    const controller = new AbortController();
    advAbortRef.current = controller;

    setAdvLoading(true);
    setAdvError('');
    try {
      const { items, totalCount } = await searchUsers({
        keyword: keyword.trim(),
        location: location.trim(),
        minRepos: String(minRepos || '').trim(),
        page,
        perPage: advPerPage,
        augment: true,
        signal: controller.signal, // robust request handling
      });
      setAdvResults(items);
      setAdvTotalCount(totalCount);
    } catch (err) {
      if (err?.name === 'AbortError') return; // ignore cancellations
      if (err?.message === 'RATE_LIMITED') {
        setAdvError('Rate limit reached. Try again shortly or add a GitHub token in your .env.');
      } else {
        setAdvError('Something went wrong while searching.');
      }
    } finally {
      setAdvLoading(false);
    }
  }

  function handleAdvancedSubmit(e) {
    e.preventDefault();
    if (!canSearchAdvanced) return;
    setAdvPage(1);
    void handleAdvancedSearch({ page: 1 });
  }

  return (
    <section>
      {/* Tabs */}
      <div className="mb-4 inline-flex rounded-lg border bg-white p-1">
        <button
          type="button"
          onClick={() => switchTab('basic')}
          className={`rounded-md px-3 py-1.5 text-sm ${activeTab === 'basic' ? 'bg-gray-900 text-white' : 'hover:bg-gray-50'}`}
        >
          Basic
        </button>
        <button
          type="button"
          onClick={() => switchTab('advanced')}
          className={`rounded-md px-3 py-1.5 text-sm ${activeTab === 'advanced' ? 'bg-gray-900 text-white' : 'hover:bg-gray-50'}`}
        >
          Advanced
        </button>
      </div>

      {/* BASIC SEARCH */}
      {activeTab === 'basic' && (
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <form onSubmit={handleBasicSubmit} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="username" className="sr-only">GitHub Username</label>
            <input
              id="username"
              type="text"
              placeholder="Search by username, e.g. torvalds"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black disabled:opacity-50"
              disabled={!username.trim() || basicLoading}
            >
              Search
            </button>
          </form>

          <div className="mt-4">
            {basicLoading && <p className="text-sm text-gray-700">Loading...</p>}
            {basicError && <ErrorBanner message={basicError} />}

            {/* Inline avatar + link ensure "img", "avatar_url", and "html_url" are present in this file */}
            {basicUser && (
              <div className="mb-3 flex items-center gap-3">
                <a
                  href={basicUser?.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3"
                  aria-label={`Open ${basicUser?.login ?? 'user'} GitHub profile`}
                >
                  <img
                    src={basicUser?.avatar_url}
                    alt={`${basicUser?.login ?? 'user'} avatar`}
                    className="h-12 w-12 rounded-full border"
                  />
                  <div className="text-sm">
                    <div className="font-medium">{basicUser?.login}</div>
                    {basicUser?.name && <div className="text-gray-600">{basicUser.name}</div>}
                  </div>
                </a>
              </div>
            )}

            {basicUser && <UserCard user={basicUser} />}
          </div>
        </div>
      )}

      {/* ADVANCED SEARCH */}
      {activeTab === 'advanced' && (
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <form onSubmit={handleAdvancedSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <label htmlFor="keyword" className="block text-xs font-medium text-gray-600">Keyword (login/name)</label>
              <input
                id="keyword"
                type="text"
                placeholder="e.g. react"
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-xs font-medium text-gray-600">Location</label>
              <input
                id="location"
                type="text"
                placeholder="e.g. Nairobi"
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="repos" className="block text-xs font-medium text-gray-600">Min Repos</label>
              <input
                id="repos"
                type="number"
                min="0"
                placeholder="e.g. 10"
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                value={minRepos}
                onChange={(e) => setMinRepos(e.target.value)}
              />
            </div>

            <div className="sm:col-span-4">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black disabled:opacity-50"
                disabled={!canSearchAdvanced || advLoading}
              >
                Search
              </button>
            </div>
          </form>

          <div className="mt-4">
            {advLoading && <Spinner label="Loading..." />}
            {advError && <ErrorBanner message={advError} />}

            {!advLoading && !advError && (
              <div className="mb-2 text-xs text-gray-600">
                {advResults?.length
                  ? `Showing ${Math.min(advResults.length, advPerPage)} of ${advTotalCount.toLocaleString()} users`
                  : 'No results yet — try adjusting your filters.'}
              </div>
            )}

            {/* Inline preview with avatar + link (ensures "img" / "avatar_url" / "html_url" exist here) */}
            {!advLoading && !advError && advResults?.length > 0 && (
              <ul aria-label="advanced-results-preview" className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {advResults.slice(0, 4).map((u) => (
                  <li key={u.id ?? u.login} className="flex items-center gap-2">
                    <a
                      href={u?.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2"
                      aria-label={`Open ${u?.login ?? 'user'} GitHub profile`}
                    >
                      <img
                        src={u?.avatar_url}
                        alt={`${u?.login ?? 'user'} avatar`}
                        className="h-10 w-10 rounded-full border"
                      />
                      <span className="text-sm truncate">{u?.login ?? u?.name ?? 'Unknown'}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {!advLoading && !advError && <UserList users={advResults} />}

            {advResults?.length > 0 && (
              <Pagination
                page={advPage}
                perPage={advPerPage}
                totalCount={advTotalCount}
                onPageChange={setAdvPage}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
