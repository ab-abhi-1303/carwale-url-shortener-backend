/**
 * Validates a URL string.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - Returns true if the URL is valid, otherwise false.
 */
function validateUrl(url) {
  try {
    // Add a default protocol if the URL starts with "www." or lacks a protocol
    if (!/^https?:\/\//i.test(url) && /^www\./i.test(url)) {
      url = `http://${url}`;
    }

    const parsedUrl = new URL(url); // Node.js URL constructor

    // Check for valid protocols
    return ["http:", "https:"].includes(parsedUrl.protocol);
  } catch (err) {
    return false; // Invalid URL
  }
}

module.exports = validateUrl;
