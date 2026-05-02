#!/usr/bin/env node
/**
 * Upload the final e-book PDF to Vercel Blob private storage.
 *
 * Run this ONCE before deploying, or again whenever you replace the PDF.
 *
 * Usage (Node 20+):
 *   node --env-file=.env.local scripts/upload-ebook-to-blob.mjs ./path/to/ebook.pdf
 *
 * Required env vars (in .env.local):
 *   BLOB_READ_WRITE_TOKEN  -- from Vercel Dashboard or: vercel env pull .env.local
 *   BLOB_EBOOK_PATH        -- e.g. ebooks/The_First_Resident_of_Briar_Glen_Ebook_Larry_Lowe.pdf
 */

import { put } from "@vercel/blob";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// ---------------------------------------------------------------------------
// Read CLI argument
// ---------------------------------------------------------------------------
const localPath = process.argv[2];
if (!localPath) {
  console.error("Usage: node --env-file=.env.local scripts/upload-ebook-to-blob.mjs <path-to-pdf>");
  process.exit(1);
}

const absolutePath = resolve(localPath);
if (!existsSync(absolutePath)) {
  console.error("  File not found: " + absolutePath);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Read required env vars
// ---------------------------------------------------------------------------
const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token || token.startsWith("vercel_blob_rw_replace")) {
  console.error("  BLOB_READ_WRITE_TOKEN is missing or still a placeholder.");
  console.error("  Run: vercel env pull .env.local  to fetch the real token.");
  process.exit(1);
}

const blobPath = process.env.BLOB_EBOOK_PATH;
if (!blobPath) {
  console.error("  BLOB_EBOOK_PATH is not set.");
  console.error("  Example: ebooks/The_First_Resident_of_Briar_Glen_Ebook_Larry_Lowe.pdf");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------
console.log("Reading:  " + absolutePath);
const fileBuffer = readFileSync(absolutePath);
const fileSizeMB = (fileBuffer.byteLength / 1024 / 1024).toFixed(2);
console.log("Size:     " + fileSizeMB + " MB");
console.log("Uploading to Vercel Blob: " + blobPath + " (private)");

const blob = await put(blobPath, fileBuffer, {
  access: "private",
  contentType: "application/pdf",
  allowOverwrite: true,
  token,
});

// ---------------------------------------------------------------------------
// Done
// ---------------------------------------------------------------------------
console.log("\n  Upload complete.\n");
console.log("Blob URL:     " + blob.url);
console.log("Pathname:     " + blob.pathname);
console.log("Content-Type: " + blob.contentType);
console.log("\nNext: run  vercel --prod  to deploy.");
