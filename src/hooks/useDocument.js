// Prevent window issue when during build.

export default function useDocument() {
  const isBrowser = typeof document !== "undefined"

  if (!isBrowser) return

  return document
}
