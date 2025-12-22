import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const releasePlan = readFileSync('.release-plan.json', 'utf8');
const releasePlanJson = JSON.parse(releasePlan);

const packageDirectory = 'packages';
const packages = readdirSync(packageDirectory)
  .map((file) => join(packageDirectory, file))
  .filter((path) => statSync(path).isDirectory());

const updatedVersions = [];
for (const pkg of packages) {
  let packageJson;
  try {
    const json = readFileSync(join(pkg, 'package.json'), 'utf8');
    packageJson = JSON.parse(json);
  } catch {
    continue;
  }

  if (packageJson.private) {
    continue;
  }

  const name = packageJson.name;
  const newVersion = releasePlanJson.solution[name]?.newVersion;
  if (newVersion) {
    updatedVersions.push(`${name}@${newVersion}`);
  }
}

const commitMessage = `COMMIT_MESSAGE=release: ${updatedVersions.join(', ')}`;
console.log(commitMessage);
