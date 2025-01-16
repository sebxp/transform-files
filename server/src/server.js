/**
 * This module starts the server and listens on a specified port.
 *
 * @module server
 */

import app from "./app.js";

const PORT = 3000;

/**
 * Starts the server and listens on the specified port.
 * Logs a message to the console when the server is running.
 *
 * @param {number} PORT - The port number on which the server listens.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
