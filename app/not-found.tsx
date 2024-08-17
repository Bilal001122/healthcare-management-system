import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center text-center space-y-6">
      <div className="flex flex-col items-center gap-20">
        <h1 className="text-2xl font-semibold">
          This page could not be found :(
        </h1>
        <Link
          href="/"
          className="inline-block w-fit bg-accent-500 text-primary-800 px-6 py-3 text-base border border-primary rounded-md hover:bg-primary/50"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
