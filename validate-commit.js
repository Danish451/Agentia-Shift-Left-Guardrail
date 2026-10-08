const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match && match[2] && match[2].trim() !== '') {
            process.env[match[1]] = match[2].trim();
        }
    });
}

try {
    const files = execSync('git diff --cached --name-only').toString().trim().split('\n');
    const stagedFiles = files.filter(file => file.trim() !== '');

    if (stagedFiles.length === 0) {
        process.exit(0);
    }

    console.log('\n🚀 Agentia Shift-Left Guardrail: Analyzing staged files...');

    for (const file of stagedFiles) {
        console.log(`\n🔍 Checking: ${file}...`);
        
        // Reading the actual file content to send to AI
        const fileContent = fs.readFileSync(file, 'utf8');
        // Remove newlines from the prompt so Windows cmd.exe doesn't truncate the argument
        const safeContent = fileContent.replace(/\r?\n/g, ' ');
        const prompt = `Review this Apex code for security issues and hardcoded IDs. If there is a hardcoded ID, respond with FAIL. Otherwise respond with PASS. Code: ${safeContent}`;
        
        // Use .cmd wrapper on Windows so spawnSync works without shell:true
        const cmd = process.platform === 'win32' ? 'agentia.cmd' : 'agentia';
        const result = spawnSync(cmd, ['ai', 'agent', 'ask', '-p', prompt], { 
            encoding: 'utf8'
        });

        if (result.error) {
            console.error(`\n❌ Failed to execute Agentia CLI:`, result.error.message);
            process.exit(1);
        }

        const aiResponse = (result.stdout || '') + (result.stderr || '');
        console.log(`🤖 Agentia Output:\n${aiResponse.trim()}`);

        if (aiResponse.includes('FAIL')) {
            console.error(`\n❌ COMMIT BLOCKED: Agentia AI found vulnerabilities in ${file}.`);
            process.exit(1);
        }
    }

    console.log('\n✅ All files passed Agentia AI validation. Commit successful!');
    process.exit(0);

} catch (error) {
    console.error('\n❌ Execution Error:', error.message);
    process.exit(1); 
}