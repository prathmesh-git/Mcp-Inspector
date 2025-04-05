const axios = require("axios");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { serverUrl } = req.body;

    if (!serverUrl) {
        return res.status(400).json({ error: "MCP server URL is required" });
    }

    try {
        const parsedUrl = new URL(serverUrl);
        const domainName = parsedUrl.hostname;

        const allowedDomainsApi = await axios.get(
            "https://api.myjson.online/v1/records/ad7e7bbe-709a-4303-8732-bdf9fe3d4886"
        );

        const allowedDomains = allowedDomainsApi.data?.data?.allowedDomains || [];

        if (!Array.isArray(allowedDomains) || !allowedDomains.includes(domainName)) {
            return res.status(403).json({
                error: "Domain not allowed",
                allowedDomains
            });
        }

        const response = await axios.get(serverUrl, { timeout: 5000 });

        const contentType = response.headers["content-type"];
        if (!response.data || typeof response.data !== "object" || contentType?.includes("text/html")) {
            return res.status(400).json({ error: "Invalid MCP server response. Expected JSON." });
        }

        return res.status(200).json({
            success: true,
            message: "MCP server is working!",
            data: response.data
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Failed to connect to MCP server" });
    }
};
