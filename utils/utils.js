/**
 * Validates a URL string.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - Returns true if the URL is valid, otherwise false.
 */
function validateUrl(url) {
  try {
    const parsedUrl = new URL(url);

    const isValidProtocol = ["http:", "https:"].includes(parsedUrl.protocol);

    const hasWWW = parsedUrl.hostname.startsWith("www.");

    return isValidProtocol && (hasWWW || true); // 'hasWWW || true' allows non-www URLs
  } catch (err) {
    return false; // Invalid URL
  }
}

module.exports = validateUrl;
