/**
 * Validates a URL string.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - Returns true if the URL is valid, otherwise false.
 */
function validateUrl(url) {
  try {
    const parsedUrl = new URL(url); // Node.js URL constructor
    return ["http:", "https:"].includes(parsedUrl.protocol); // Ensure valid protocols
  } catch (err) {
    return false;
  }
}

module.exports = validateUrl;
