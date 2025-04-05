document.addEventListener("DOMContentLoaded", function () {
    const testButton = document.getElementById("testButton");
    const resetButton = document.getElementById("resetButton");
    const serverUrlInput = document.getElementById("serverUrl"); 
    const resultDiv = document.getElementById("result");        

    testButton.addEventListener("click", async () => {
        const serverUrl = serverUrlInput.value;
        resultDiv.innerHTML = "";

        try {
            const response = await fetch("api/test-mcp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ serverUrl })
            });

            const result = await response.json();

            if (!response.ok) {
                const errorMessage = result.allowedDomains 
                    ? `${result.error} Allowed domains: ${result.allowedDomains.join(", ")}` 
                    : result.error;
                throw new Error(errorMessage || "Unknown error occurred");
            }

            const data = result.data;
            const configSchema = data.connections?.[0]?.configSchema;
            const deploymentUrl = data.connections?.[0]?.deploymentUrl;

            resultDiv.innerHTML = `
                <strong>✅ MCP server is working!</strong><br><br>
                <b>Display Name:</b> ${data.displayName || "N/A"}<br>
                <b>Qualified Name:</b> ${data.qualifiedName || "N/A"}<br>
                <b>Deployment URL:</b> <a href="${deploymentUrl}" target="_blank">${deploymentUrl || "N/A"}</a><br><br>
                <b>Required Config Keys:</b><br>
                <ul>
                    ${
                        configSchema?.required?.map(
                            key => `<li><b>${key}</b>: ${configSchema.properties?.[key]?.description || "No description"}</li>`
                        ).join("") || "<li>None</li>"
                    }
                </ul>
            `;
        } catch (error) {
            resultDiv.innerHTML = `<strong style="color:red;">❌ Failed:</strong> ${error.message}`;
        }
    });

   
    resetButton.addEventListener("click", () => {
        serverUrlInput.value = "";
        resultDiv.innerHTML = "";
    });
});
