# GitHub Repository Setup Guide

## Prerequisites

Before starting, ensure you have:
- Git installed on your computer
- A GitHub account (create one at https://github.com)
- Terminal/Command Prompt access

---

## Step 1: Create GitHub Repository

### Option A: Using GitHub Website

1. Go to https://github.com
2. Click the "+" button in the top-right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name:** `WorkNest` or `worknest-website`
   - **Description:** "Premium Coworking Space Website - Eldoret, Kenya"
   - **Visibility:** Choose "Private" (for now) or "Public"
   - **DO NOT** initialize with README (we already have one)
   - **DO NOT** add .gitignore (we have one)
   - **DO NOT** choose a license yet
5. Click "Create repository"

### Option B: Using GitHub CLI (if installed)

```bash
gh repo create WorkNest --private --description "Premium Coworking Space Website"
```

---

## Step 2: Initialize Local Git Repository

Open your terminal in the WorkNest project folder and run:

```bash
# Initialize git (if not already done)
git init

# Check current status
git status
```

---

## Step 3: Create .gitignore File

Make sure your `.gitignore` file includes:

```
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Next.js
.next/
out/
build/
dist/

# Environment Variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Testing
coverage/
.nyc_output/

# Misc
.DS_Store
*.pem
.vscode/
.idea/

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local Vercel
.vercel

# Supabase
.supabase/
```

---

## Step 4: Stage and Commit Files

```bash
# Add all files to staging
git add .

# Check what will be committed
git status

# Create initial commit
git commit -m "Initial commit: WorkNest coworking space website"
```

---

## Step 5: Link to GitHub Remote

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/WorkNest.git

# Verify remote was added
git remote -v
```

### Example:
If your GitHub username is "eldohubacademy":
```bash
git remote add origin https://github.com/eldohubacademy/WorkNest.git
```

---

## Step 6: Push to GitHub

```bash
# Rename branch to 'main' (if it's 'master')
git branch -M main

# Push to GitHub
git push -u origin main
```

**If prompted for credentials:**
- **Username:** Your GitHub username
- **Password:** Use a Personal Access Token (not your password)

---

## Step 7: Create Personal Access Token (if needed)

If GitHub asks for a password and rejects it:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" > "Generate new token (classic)"
3. Give it a name: "WorkNest Deploy"
4. Select scopes:
   - `repo` (all)
   - `workflow`
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this token as your password when pushing

---

## Step 8: Verify Upload

1. Go to your GitHub repository URL:
   ```
   https://github.com/YOUR_USERNAME/WorkNest
   ```

2. You should see:
   - All your files
   - README.md displayed at the bottom
   - Commit history

---

## Step 9: Add Collaborators (Optional)

If you want to share with the owner or team:

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Click "Collaborators" in the left sidebar
4. Click "Add people"
5. Enter their GitHub username or email
6. Select permission level:
   - **Read**: View only
   - **Write**: Can push changes
   - **Admin**: Full control

---

## Step 10: Protect Main Branch (Recommended)

To prevent accidental force pushes:

1. Go to repository "Settings"
2. Click "Branches" in left sidebar
3. Click "Add branch protection rule"
4. Branch name pattern: `main`
5. Enable:
   - "Require a pull request before merging"
   - "Require status checks to pass before merging"
6. Click "Create"

---

## Future Updates: How to Push Changes

After making changes to your code:

```bash
# Check what changed
git status

# Stage all changes
git add .

# Or stage specific files
git add path/to/file.tsx

# Commit with descriptive message
git commit -m "feat: add translation system"

# Push to GitHub
git push origin main
```

---

## Common Git Commands

### Check Status
```bash
git status
```

### View Commit History
```bash
git log --oneline
```

### Create New Branch
```bash
git checkout -b feature/new-feature
```

### Switch Branch
```bash
git checkout main
```

### Pull Latest Changes
```bash
git pull origin main
```

### Undo Last Commit (keep changes)
```bash
git reset --soft HEAD~1
```

### Undo Changes to File
```bash
git checkout -- path/to/file.tsx
```

---

## Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/WorkNest.git
```

### Error: "failed to push some refs"
```bash
# Pull first, then push
git pull origin main --rebase
git push origin main
```

### Error: "Permission denied"
- Make sure you're using a Personal Access Token, not your password
- Check token has correct permissions

### Large Files Warning
If Git warns about large files:
```bash
# Remove from staging
git rm --cached path/to/large/file

# Add to .gitignore
echo "path/to/large/file" >> .gitignore

# Commit
git commit -m "Remove large file"
```

---

## Repository URL Format

After setup, you can share:

### HTTPS Clone URL:
```
https://github.com/YOUR_USERNAME/WorkNest.git
```

### SSH Clone URL:
```
git@github.com:YOUR_USERNAME/WorkNest.git
```

### Web URL:
```
https://github.com/YOUR_USERNAME/WorkNest
```

---

## Next Steps After GitHub Setup

1. **Deploy to Vercel:**
   - Connect GitHub repo to Vercel
   - Auto-deploy on every push
   
2. **Set up CI/CD:**
   - GitHub Actions for automated testing
   - Auto-deployment to production

3. **Enable GitHub Pages** (optional):
   - For documentation hosting
   - Settings > Pages

4. **Add Status Badges** to README:
   - Build status
   - Deployment status
   - Coverage reports

---

## Important Notes

### Files to NEVER Commit:
- `.env.local` (contains secrets!)
- `node_modules/` (too large)
- `.next/` (build output)
- API keys or passwords
- Database credentials

### Files to ALWAYS Commit:
- `package.json` (dependencies)
- `package-lock.json` (version lock)
- Source code (`.tsx`, `.ts`, `.css`)
- Configuration files
- README.md
- .gitignore

---

## Security Best Practices

1. **Never commit sensitive data:**
   - API keys
   - Database passwords
   - Email credentials
   - M-Pesa secrets

2. **Use environment variables:**
   - Keep secrets in `.env.local`
   - Add `.env.local` to `.gitignore`
   - Document required variables in README

3. **Review before committing:**
   ```bash
   git diff
   git status
   ```

4. **Use .gitignore properly:**
   - Check it's working: `git status` should not show ignored files

---

## GitHub Repository Checklist

Before sharing your repository URL:

- [ ] README.md is clear and professional
- [ ] No emojis in documentation
- [ ] .gitignore is properly configured
- [ ] No `.env` files committed
- [ ] All dependencies in package.json
- [ ] Build passes (`npm run build`)
- [ ] No sensitive data in code
- [ ] Repository description is set
- [ ] License file added (optional)
- [ ] Collaborators invited (if needed)

---

## Share Your Repository

Once everything is pushed, share this URL with the owner:

```
https://github.com/YOUR_USERNAME/WorkNest
```

They can:
- View all code
- See commit history
- Clone the repository
- Create issues
- Suggest changes via pull requests

---

## Support

If you encounter issues:
1. Check GitHub's official documentation: https://docs.github.com
2. Search Stack Overflow: https://stackoverflow.com/questions/tagged/git
3. GitHub Community: https://github.community

---

**Your code is now safely backed up and shareable on GitHub!**

