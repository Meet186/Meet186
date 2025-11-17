const fs = require("fs");
const axios = require("axios");

const username = "Meet186";

// Fetch GitHub Followers
async function getGitHubFollowers() {
  const res = await axios.get(`https://api.github.com/users/${username}`);
  return res.data.followers;
}

async function updateReadme() {
  // Read main README
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

  // Write back the updated README
  fs.writeFileSync("README.md", updated);
}

updateReadme();

