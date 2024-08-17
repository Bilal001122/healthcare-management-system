"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-col flex-1 items-center justify-center text-center space-y-6">
      <div className="flex flex-col items-center gap-10">
        <h1 className="text-2xl font-semibold">Something went wrong!</h1>
        <p>{error.message}</p>
        <button
          onClick={() => reset()}
          className="inline-block w-fit bg-accent-500 text-primary-800 px-6 py-3 text-base border border-primary rounded-md hover:bg-primary/50"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
