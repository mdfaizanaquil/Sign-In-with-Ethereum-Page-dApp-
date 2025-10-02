# Sign-In with Ethereum (SIWE) dApp

A simple but secure full-stack application that demonstrates how to authenticate a user with their Ethereum wallet instead of a traditional password, following the EIP-4361 standard.

## Features
- **Secure Authentication:** Uses a message-signing flow to verify wallet ownership.
- **Front-end:** A simple HTML/CSS/JS page to handle user interaction.
- **Back-end:** A lightweight Node.js/Express server to generate a nonce and verify the signature.

## Setup
1.  **Clone & Install:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    npm install express ethers siwe cors
    ```
2.  **Run the Server:**
    * In your terminal, start the backend server:
    ```bash
    node server.js
    ```
3.  **Open the dApp:**
    * Open the `index.html` file (located in the `public` folder) in your web browser.
