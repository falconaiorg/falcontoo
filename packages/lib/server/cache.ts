import { unstable_cache } from "next/cache";
import { cache as react_cache } from "react";
/**
 *
 * `cache.react` memoizes thre request.
 * Invalidates after the request is complete.
 * ---
 * `cache.next` memoizes the request and stores results in Next.js data cache.
 *  Needs to be invalidated manually.
 * ---
 * usage:
 * `const data = unstable_cache(fetchData, keyParts, options)()`
 * ---
 *  The Data Cache is persistent across incoming requests and deployments unless you revalidate or opt-out.
 *  - fetchData: This is an asynchronous function that fetches the data you want to cache. It must be a function that returns a Promise.
 * - keyParts: This is an array that identifies the cached key. It must contain globally unique values that together identify the key of the data being cached. The cache key also includes the arguments passed to the function.
 * - options: This is an object that controls how the cache behaves. It can contain the following properties:
 *   - tags: An array of tags that can be used to control cache invalidation.
 *   - revalidate: The number of seconds after which the cache should be revalidated. Omit or pass false to cache indefinitely or until matching revalidateTag() or revalidatePath() methods are called.
 */
export const cache = {
  react: react_cache,
  next: unstable_cache,
};
