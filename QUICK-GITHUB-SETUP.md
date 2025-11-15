# Quick GitHub Setup Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com (sign in or create account)
2. Click the **"+"** button (top-right) > **"New repository"**
3. Fill in:
   - **Name:** `WorkNest` (or `worknest-website`)
   - **Description:** `Premium Coworking Space Website - Eldoret, Kenya`
   - **Visibility:** Choose **Private** (recommended) or Public
   - **DO NOT** check any boxes (README, .gitignore, license)
4. Click **"Create repository"**
5. **COPY the repository URL** (it will look like this):
   ```
   https://github.com/YOUR-USERNAME/WorkNest.git
   ```

---

## Step 2: Open Terminal in Your Project

1. Open **Command Prompt** or **PowerShell**
2. Navigate to your project:
   ```bash
   cd "C:\Users\Eldohub Academy\Documents\PROJECT\W\WorkNest"
   ```

---

## Step 3: Run These Commands One by One

### A. Check if Git is initialized
```bash
git status
```

**If you see:** "fatal: not a git repository"
**Then run:**
```bash
git init
```

### B. Add all files
```bash
git add .
```

### C. Create first commit
```bash
git commit -m "Initial commit: WorkNest coworking space website"
```

### D. Link to GitHub (REPLACE with YOUR repository URL)
```bash
git remote add origin https://github.com/YOUR-USERNAME/WorkNest.git
```

**Example:** If your username is "eldohubacademy":
```bash
git remote add origin https://github.com/eldohubacademy/WorkNest.git
```

### E. Push to GitHub
```bash
git branch -M main
git push -u origin main
```

---

## Step 4: If Asked for Credentials

**Username:** Your GitHub username

**Password:** DON'T use your GitHub password!
Instead, use a **Personal Access Token**:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it: "WorkNest"
4. Check: `repo` (all options)
5. Click "Generate token"
6. **COPY the token** (save it somewhere - you won't see it again!)
7. Use this token as your "password" when pushing

---

## Step 5: Verify Success

1. Go to your GitHub repository:
   ```
   https://github.com/YOUR-USERNAME/WorkNest
   ```
2. You should see all your files!
3. README.md should display at the bottom

---

## Your Repository URL (Share This)

After pushing, share this URL with the owner:
```
https://github.com/YOUR-USERNAME/WorkNest
```

---

## Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/WorkNest.git
```

### Error: "failed to push"
```bash
git pull origin main --rebase
git push origin main
```

### Can't push - authentication failed
- Make sure you're using a Personal Access Token, not your password
- Generate a new token at: https://github.com/settings/tokens

---

## Future Updates

When you make changes:
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

---

**Need help? Send me the error message!**

