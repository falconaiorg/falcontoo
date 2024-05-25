"use server";

import { parseUrl } from ".";

const testUrls = [
  "https://example.com",
  "http://example.com",
  "https://localhost",
  "https://",
  "https://www.google.com", // Good URL
  "http://www.google.com", // Good URL but not HTTPS
  "ftp://example.com", // Bad URL, not HTTP or HTTPS
  "https://192.168.1.1", // Bad URL, private IP address
  "https://10.0.0.1", // Bad URL, private IP address
  "https://172.16.0.1", // Bad URL, private IP address
  "https://127.0.0.1", // Bad URL, localhost IP address
  "https://example.com:8080", // Good URL, with port number
  "https://example.com/path?query=param", // Good URL, with path and query parameters
  "example.com", // Bad URL, no protocol
  "https://example", // Bad URL, no top-level domain
  "http://.com", // Bad URL, no domain name
];

export const testUrlParser = async () => {
  for (const url of testUrls) {
    try {
      await parseUrl({ url });
      console.log(`✅ Success: ${url}`);
    } catch (err) {
      console.log(`❌ Error: ${url}`);
    }
  }
};
