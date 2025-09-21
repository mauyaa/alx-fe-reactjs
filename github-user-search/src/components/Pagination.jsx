export default function Pagination({ page, perPage, totalCount, onPageChange }) {
  const maxItems = Math.min(totalCount || 0, 1000);
  const totalPages = Math.max(1, Math.ceil(maxItems / perPage));

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="text-sm text-gray-600">
        Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50 hover:bg-gray-50"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50 hover:bg-gray-50"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
