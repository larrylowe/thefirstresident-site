#!/usr/bin/env node
/**
 * Verify what's currently stored in your Vercel Blob private store.
 *
 * Usage (Node 20+):
 *   node --env-file=.env.local scripts/verify-blob.mjs
 *
 * Required env vars:
 *   BLOB_READ_WRITE_TOKEN
 *   BLOB_EBOOK_PATH
 */

import { list } from "@vercel/blob";

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token || token.startsWith("vercel_blob_rw_replace")) {
  console.error("\n  BLOB_READ_WRITE_TOKEN is missing or still set to the placeholder.");
  console.error("  Run: vercel env pull .env.local  then retry.\n");
  process.exit(1);
}

const ebookPath = process.env.BLOB_EBOOK_PATH || "ebooks/";

console.log("\n--- Vercel Blob store check ---");
console.log("Prefix: " + ebookPath);

const { blobs } = await list({ prefix: ebookPath, token });

if (blobs.length === 0) {
  console.log("\n  No blobs found at prefix: " + ebookPath);
  console.log("  The e-book PDF has NOT been uploaded yet.\n");
  console.log("  Upload it with:");
  console.log("  node --env-file=.env.local scripts/upload-ebook-to-blob.mjs ./The_First_Resident_of_Briar_Glen_Ebook_Larry_Lowe.pdf\n");
} else {
  console.log("\nFound " + blobs.length + " blob(s):\n");
  for (const b of blobs) {
    const sizeMB = b.size ? (b.size / 1024 / 1024).toFixed(2) + " MB" : "unknown size";
    console.log("  Pathname: " + b.pathname);
    console.log("  URL:      " + b.url);
    console.log("  Size:     " + sizeMB);
    console.log("  Uploaded: " + (b.uploadedAt || "unknown"));
    console.log("");
  }
  const { blobs: records } = await list({ prefix: "download-records/", token });
  console.log("Download records: " + records.length + " session(s) stored.\n");
}
