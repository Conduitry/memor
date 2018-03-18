# v0.1.4

- Add function to clear all cached values for a memoized function
- Expose original function as `.original` on memoized function

# v0.1.3

- Normalize order of property symbol keys in POJOs
- Fix keying of sparse arrays

# v0.1.2

- Key POJOs according to symbolic properties as well, just without order normalization
- Don't crash on objects with null prototype

# v0.1.1

- When creating cache keys for POJOs, use non-enum keys as well, and normalize key order
- Add documentation

# v0.1.0

- Initial release
