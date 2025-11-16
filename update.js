const fs = require("fs");
const axios = require("axios");

// GitHub username
const username = "Meet186";

// Fetch GitHub Followers
async function getGitHubFollowers() {
  const res = await axios.get(`https://api.github.com/users/${username}`);
  return res.data.followers;
}

// Replace content inside markers
async function updateReadme() {
  const readme = fs.readFileSync("README.md", "utf-8");

  const followers = await getGitHubFollowers();
  const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const newContent = `
⏱️ **Last Updated:** ${time}  
👥 **GitHub Followers:** ${followers}  
🚀 Auto-updated using GitHub Actions!
  `;

  const updated = readme.replace(
    /<!--START_SECTION:dynamic-->[\s\S]*<!--END_SECTION:dynamic-->/,
    `<!--START_SECTION:dynamic-->\n${newContent}\n<!--END_SECTION:dynamic-->`
  );

  fs.writeFileSync("README.md", updated);
}

updateReadme();
