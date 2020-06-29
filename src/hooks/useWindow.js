// Prevent window issue when during build.

export default function useWindow() {
  const isBrowser = typeof window !== "undefined"

  if (!isBrowser) return

  return window
}
