const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// The destination URL to redirect to.
// Make sure to replace this with your actual target URL.
const DESTINATION_URL = 'https://example-destination.com/path?query';

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.hostname}${req.url} -> IP: ${req.ip}`);
    next();
});

// Primary redirect logic
app.get('*', (req, res) => {
    // Construct the destination URL preserving the query parameters if needed
    // You can also append specific affiliate tags or tracker IDs here dynamically.
    const targetUrl = new URL(DESTINATION_URL);

    // Merge incoming query parameters with the destination query parameters
    Object.keys(req.query).forEach(key => {
        targetUrl.searchParams.set(key, req.query[key]);
    });

    console.log(`Redirecting to: ${targetUrl.toString()}`);

    // Return a temporary (302) redirect
    res.redirect(302, targetUrl.toString());
});

app.listen(PORT, () => {
    console.log(`Redirection server running on port ${PORT}`);
    console.log(`Redirecting all traffic to: ${DESTINATION_URL}`);
});
