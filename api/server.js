const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/test-mcp", async (req, res) => {
    const { serverUrl } = req.body;

    if (!serverUrl) {
        return res.status(400).json({ error: "MCP server URL is required" });
    }

    try {
        
        const parsedUrl = new URL(serverUrl);
        const domainName = parsedUrl.hostname; 

        console.log("Extracted Domain:", domainName);

       
        const allowedDomainsApi = await axios.get(
            "https://api.myjson.online/v1/records/ad7e7bbe-709a-4303-8732-bdf9fe3d4886"
        );

        const allowedDomains = allowedDomainsApi.data?.data?.allowedDomains || [];

        console.log("Allowed Domains:", allowedDomains);

        
        if (!Array.isArray(allowedDomains) || !allowedDomains.includes(domainName)) {
            return res.status(403).json({ 
                error: "Domain not allowed", 
                allowedDomains 
            });
        }

       
        const response = await axios.get(serverUrl, { timeout: 5000 });

        if (!response.data || typeof response.data !== "object") {
            return res.status(400).json({ error: "Invalid MCP server response" });
        }

        console.log("Success: MCP server is working!");

        return res.json({ 
            success: true, 
            message: "MCP server is working!", 
            data: response.data 
        });

    } catch (error) {
        console.error("Error processing request:", error.message);
        return res.status(500).json({ success: false, error: "Failed to connect to MCP server" });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port: ${PORT}`);
});
