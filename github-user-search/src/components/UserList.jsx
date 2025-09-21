export default function UserList({ users }) {
  if (!users?.length) return null;

  return (
    <ul className="mt-4 space-y-3">
      {users.map((u) => {
        const d = u.details || {};
        return (
          <li key={u.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={u.avatar_url}
                alt={`${u.login} avatar`}
                className="h-14 w-14 rounded-full border"
                loading="lazy"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <a
                    href={u.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-semibold hover:underline"
                  >
                    {d.name || u.login}
                  </a>
                  <span className="text-xs text-gray-500">@{u.login}</span>
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  {d.location && <span className="mr-3">📍 {d.location}</span>}
                  {typeof d.public_repos === 'number' && <span>📦 {d.public_repos} repos</span>}
                </div>
              </div>
              <a
                href={u.html_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
              >
                View
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
