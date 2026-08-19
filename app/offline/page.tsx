"use client";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold">You are offline</h1>

        <p className="mt-3 text-gray-500">
          Check your internet connection and try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-full bg-primary px-6 py-3 text-white"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
