# Agentia Shift-Left Guardrail 🚀

**A Pre-Commit Hook powered by Copado Agentia AI**  
*Developed for the Copado Agentia™ Headless Virtual Hackathon (Oct 2026).*

## 📌 The Problem
In standard Salesforce DevOps workflows, developers often don't discover code conflicts, missing metadata dependencies, or governance violations until they push their code to the CI/CD pipeline. Waiting for pipeline validation is time-consuming and creates a bottleneck. If a developer hallucinates an object name or forgets a dependency, it should be caught locally, not 15 minutes later in the cloud.

## 💡 The Solution
This project achieves true **"Shift-Left" DevOps** by bringing Copado's pipeline governance and AI Context directly into the developer's local terminal. 

It is a local Git pre-commit hook powered by Node.js and the Agentia Headless CLI. Whenever a developer attempts to commit LWC or Apex code locally, this hook intercepts the commit. It uses the Agentia CLI to instantly review the staged files against the target Salesforce org's schema. 
* ✅ **If the code is safe:** The commit proceeds normally.
* ❌ **If the AI detects a risk:** It blocks the commit and provides instant terminal feedback.

## 🛠️ How It Works
1. Developer runs `git commit`.
2. The local `.git/hooks/pre-commit` shell script intercepts the command.
3. It triggers `validate-commit.js` (Node.js).
4. The script extracts staged files using `git diff --cached`.
5. It passes these files to the Copado Agentia CLI for AI validation.
6. The commit is either allowed or blocked based on the AI's response.

## 🚀 Setup & Configuration
To run this guardrail locally, you need to configure your Copado credentials. Create a `.env` file in the root directory and add the following variables:
```env
AGENTIA_AI_PAK=your_personal_access_key
AGENTIA_AI_DOMAIN=your_copado_domain (e.g., robotic.copado.com)
AGENTIA_AI_ORG=your_organization_id
```
The script will automatically parse this `.env` file and authenticate the Agentia CLI behind the scenes!


## 💻 Technologies Used
* **Copado Agentia™ Headless CLI** (for AI contextual validation)
* **Node.js** (Child Process execution)
* **Git** (Native Pre-commit Hooks)
* **Salesforce Metadata**

## 🚦 Status
✅ **Completed:** The core Git interception architecture and Copado Agentia CLI integration are fully implemented and functional for the hackathon!