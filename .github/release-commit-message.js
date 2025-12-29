import { readFileSync } from 'fs';

const releasePlan = readFileSync('.release-plan.json', 'utf8');
const releasePlanJson = JSON.parse(releasePlan);

let updatedVersion;
const json = readFileSync('package.json', 'utf8');
const packageJson = JSON.parse(json);

const name = packageJson.name;
const newVersion = releasePlanJson.solution[name]?.newVersion;
if (newVersion) {
  updatedVersion = `${name}@${newVersion}`;
}

const commitMessage = `COMMIT_MESSAGE=release: ${updatedVersion}`;
console.log(commitMessage);
