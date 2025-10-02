const siweButton = document.getElementById('siweButton');
const statusDiv = document.getElementById('status');
const domain = window.location.host;
const origin = window.location.origin;

siweButton.addEventListener('click', async () => {
    try {
        if (typeof window.ethereum === "undefined") {
            throw new Error("Please install MetaMask!");
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        // 1. Fetch nonce from the server
        const nonceRes = await fetch('http://localhost:3000/nonce');
        const nonce = await nonceRes.text();

        // 2. Create the SIWE message
        const message = `
${domain} wants you to sign in with your Ethereum account:
${address}

URI: ${origin}
Version: 1
Chain ID: 1
Nonce: ${nonce}
Issued At: ${new Date().toISOString()}`;

        // 3. Ask user to sign the message
        const signature = await signer.signMessage(message);

        // 4. Send signature to server for verification
        const verifyRes = await fetch('http://localhost:3000/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, signature }),
        });
        const verifyData = await verifyRes.json();

        if (verifyData.success) {
            statusDiv.innerHTML = `✅ Successfully signed in as:<br>${verifyData.address}`;
        } else {
            throw new Error(verifyData.message);
        }

    } catch (error) {
        statusDiv.innerText = `❌ Error: ${error.message}`;
    }
});
