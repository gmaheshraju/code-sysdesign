const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");

// Function to generate a random token
function generateToken() {
  return Math.random().toString(36).substr(2);
}

// Function to calculate checksum
function calculateChecksum(token) {
  // This is a simple checksum calculation, you may want to use a more sophisticated algorithm
  return token.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

// Function to store token and checksum
function storeToken(token) {
  const checksum = calculateChecksum(token);
  localStorage.setItem("token", token);
  localStorage.setItem("checksum", checksum);
}

// Function to retrieve token and verify checksum
function retrieveToken() {
  const storedToken = localStorage.getItem("token");
  const storedChecksum = localStorage.getItem("checksum");
  if (storedToken && storedChecksum) {
    const calculatedChecksum = calculateChecksum(storedToken);
    if (calculatedChecksum === parseInt(storedChecksum)) {
      return storedToken; // Token is valid
    } else {
      // Checksum mismatch, potential tampering
      console.error("Token checksum mismatch. Possible tampering.");
      return null;
    }
  } else {
    // Token or checksum not found
    console.error("Token or checksum not found.");
    return null;
  }
}

// Proof of concept usage
const token = generateToken();
console.log("Generated token:", token);

// Store the token and its checksum
storeToken(token);
console.log("Token stored.");

// Retrieve the token
const retrievedToken = retrieveToken();
if (retrievedToken) {
  console.log("Retrieved token:", retrievedToken);
} else {
  console.error("Failed to retrieve token.");
}
