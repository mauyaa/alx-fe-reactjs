import { useQuery, useQueryClient } from "@tanstack/react-query";


async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default function PostsComponent() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60, // 1 minute: enables quick back/forward cache hits
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p style={{ color: "crimson" }}>{error.message}</p>;

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto" }}>
      <h2>Posts (React Query)</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => refetch()}>{isFetching ? "Refreshing…" : "Refetch"}</button>
        <button onClick={() => queryClient.invalidateQueries(["posts"])}>Invalidate Cache</button>
      </div>
      <ul>
        {data.slice(0, 10).map(p => (
          <li key={p.id}>
            <strong>#{p.id}</strong> {p.title}
          </li>
        ))}
      </ul>
      <p style={{ opacity: 0.7 }}>Navigate away and back: data should render instantly from cache if still “fresh”.</p>
    </div>
  );
}
