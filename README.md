# 🌐 MCP Server Tester

A web app that allows you to test and verify MCP (Model Context Protocol) servers by entering their URLs. It checks domain validity and displays information such as the server's display name, qualified name, deployment URL, and required configuration keys.



## 🚀 Features

- Validate MCP server URLs against an allowed domain list
- Fetch and display server metadata:
  - Display name
  - Qualified name
  - Deployment URL
  - Required configuration keys
- Error handling for invalid domains or broken URLs
- Clean UI with a reset button

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **APIs**: Axios for HTTP requests
- **Deployment**: [Vercel](https://vercel.com) or [Netlify](https://netlify.com)

---

## 📁 Folder Structure

```
mcp-server-tester/
├── api/
│   └── test-mcp.js         # Express server endpoint (for Vercel)
├── public/
│   └── index.html          # UI
│   └── style.css           # Styling (optional)
│   └── script.js           # Frontend logic
├── server.js               # Local server for development
├── package.json
└── README.md
```

---

## 🔧 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mcp-server-tester.git
cd mcp-server-tester
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
node server.js
```

Visit `http://localhost:5000` to test.

---

## 🌍 Deployment

### 📦 Backend on Vercel
1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com), import your repo.
3. Make sure the `api/test-mcp.js` file is inside the `api/` folder.
4. Vercel will auto-detect the Express API.

### 💻 Frontend on Netlify
1. Point Netlify to your `/public` folder (or root if using frontend framework).
2. In `script.js`, set:
```js
fetch("/api/test-mcp")  // For relative path support on Vercel/Netlify
```

---

## 🔒 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Author

Made with ❤️ by [Prathmesh](https://github.com/prathmesh-git)
