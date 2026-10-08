const { execSync } = require('child_process');

console.log("=> Agentia Guardrail: Analyzing staged files...");

try {
    // Run a git command to get the names of files that are staged for commit
    const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' }).trim();

    if (!stagedFiles) {
        console.log("No files to analyze. Proceeding...");
        process.exit(0); // 0 means success, let the commit happen
    }

    console.log("Found the following files to check:\n" + stagedFiles);
    
    // In the next step, we will pass 'stagedFiles' into the Copado Agentia CLI right here.
    
    console.log("=> Agentia Guardrail: Code looks good! (Mock check)");
    process.exit(0); // Let the commit pass for now

} catch (error) {
    console.error("=> Agentia Guardrail Error: Something went wrong.", error.message);
    process.exit(1); // 1 means failure, block the commit
}