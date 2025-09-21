export default function UserCard({ user }) {
  if (!user) return null;

  return (
    <article className="mt-4 rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <img
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          className="h-20 w-20 rounded-full border"
          loading="lazy"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{user.name || user.login}</h3>
          <p className="text-sm text-gray-600">@{user.login}</p>

          <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {user.location && (
              <>
                <dt className="text-gray-500">Location</dt>
                <dd>{user.location}</dd>
              </>
            )}
            <dt className="text-gray-500">Public Repos</dt>
            <dd>{user.public_repos}</dd>
            {user.followers !== undefined && (
              <>
                <dt className="text-gray-500">Followers</dt>
                <dd>{user.followers}</dd>
              </>
            )}
          </dl>

          <div className="mt-3 flex items-center gap-3">
            <a
              className="inline-flex items-center rounded-md border bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-black"
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
            >
              View Profile
            </a>
            {user.blog && (
              <a
                className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noreferrer"
              >
                Website
              </a>
            )}
          </div>
        </div>
      </div>
      {user.bio && <p className="mt-4 text-sm text-gray-700">{user.bio}</p>}
    </article>
  );
}
