const fs = require("fs");
const axios = require("axios");

const username = "Meet186";

async function getGitHubData() {
  const res = await axios.get(`https://api.github.com/users/${username}`);
  return {
    followers: res.data.followers,
    publicRepos: res.data.public_repos,
  };
}

async function updateReadme() {
  const template = fs.readFileSync("README_TEMPLATE.md", "utf-8");

  const data = await getGitHubData();
  const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const dynamicContent = `
⏱️ **Last Updated:** ${time}  
👥 **GitHub Followers:** ${data.followers}  
📦 **Public Repos:** ${data.publicRepos}  
🚀 Auto-updated using GitHub Actions!
  `;

  const finalReadme = template.replace("<!--DYNAMIC_DATA-->", dynamicContent);

  fs.writeFileSync("README.md", finalReadme);
}

updateReadme();
