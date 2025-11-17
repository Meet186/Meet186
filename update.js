const fs = require("fs");
const axios = require("axios");

const username = "Meet186";

// Fetch GitHub user data
async function getGitHubData() {
  const res = await axios.get(`https://api.github.com/users/${username}`);
  return {
    followers: res.data.followers,
    publicRepos: res.data.public_repos,
  };
}

async function updateReadme() {
  const readme = fs.readFileSync("README.md", "utf-8");

  const followers = await getGitHubFollowers();
  const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const dynamicContent = `
⏱️ **Last Updated:** ${time}  
👥 **GitHub Followers:** ${followers}  
🚀 Auto-updated using GitHub Actions!
  `;

  const updated = readme.replace(
    /<!--START_SECTION:dynamic-->[\s\S]*<!--END_SECTION:dynamic-->/,
    `<!--START_SECTION:dynamic-->\n${dynamicContent}\n<!--END_SECTION:dynamic-->`
  );

  fs.writeFileSync("README.md", updatedReadme);
}

updateReadme();

