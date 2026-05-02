/**
 * @deprecated Use @/lib/downloadRecords directly.
 * This file is kept as a shim so any stale imports continue to resolve.
 * @vercel/kv is NOT used anywhere in this project.
 */
export {
  MAX_DOWNLOADS,
  getDownloadRecord,
  createDownloadRecord,
  incrementDownloadCount,
} from "./downloadRecords";
export type { DownloadRecord } from "./downloadRecords";
