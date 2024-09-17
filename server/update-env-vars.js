require("dotenv").config();
const { createClient } = require("@vercel/client");
const fetch = require("node-fetch");

const vercelToken = process.env.VERCEL_API_TOKEN;
const projectIds = [process.env.PROJECT_ID_1, process.env.PROJECT_ID_2];

const client = createClient({ token: vercelToken });

async function getLatestDeployment(projectId) {
  const url = `https://api.vercel.com/v6/deployments?projectId=${projectId}&limit=1&state=READY`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${vercelToken}` },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch deployments for project ${projectId}: ${response.statusText}`
    );
  }
  const data = await response.json();
  return data.deployments[0];
}

async function setEnvVariable(projectId, key, value) {
  const payload = {
    key,
    value,
    target: ["preview"], // Specify correct environment target
    type: "plain", // Ensure the type is correct (plain for standard env variables)
  };

  const response = await client.post(`/v8/projects/${projectId}/env`, payload);

  if (!response.ok) {
    throw new Error(
      `Failed to set env var for project ${projectId}: ${response.statusText}`
    );
  }

  return response.json(); // Optional: returning the response body if needed
}

async function main() {
  for (const projectId of projectIds) {
    try {
      const latestDeployment = await getLatestDeployment(projectId);
      const branchUrl = latestDeployment.url;
      console.log(
        `Latest deployment URL for project ${projectId}: ${branchUrl}`
      );

      // Set the environment variable
      await setEnvVariable(projectId, "VERCEL_BRANCH_URL", branchUrl);
      console.log(`Environment variable set for project ${projectId}`);
    } catch (error) {
      console.error(`Error processing project ${projectId}:`, error.message);
    }
  }
}

main().catch(console.error);
