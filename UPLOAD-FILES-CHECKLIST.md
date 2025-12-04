# Files Upload Checklist for cPanel

## Files to Upload (In Order)

### 1. Core Application Files (Required)

- [ ] `server.js` - Node.js server entry point
- [ ] `package.json` - Dependencies list
- [ ] `package-lock.json` - Lock file for dependencies
- [ ] `.env.local` - Environment variables (IMPORTANT!)

### 2. Build Output (Required - Upload AFTER local build)

- [ ] `.next/` folder - Compiled Next.js application
  - Contains: `BUILD_ID`, `static/`, `server/`, `cache/`
  - **Size should be several MB** (not 4KB!)

### 3. Source Code Folders

- [ ] `app/` folder - Next.js app directory
  - Contains all page components and API routes
- [ ] `components/` folder - React components
  - Contains UI components and providers
- [ ] `lib/` folder - Utility libraries
  - Contains database, email, currency services
- [ ] `styles/` folder - CSS files
  - Contains global styles

### 4. Static Assets

- [ ] `public/` folder - Static files
  - Contains: `gallery/`, images, favicon, etc.

---

## Files to EXCLUDE (Do NOT Upload)

- [ ] `node_modules/` - Will be installed on server
- [ ] `.git/` - Version control (not needed)
- [ ] `README.md` - Documentation
- [ ] `*.log` - Log files
- [ ] `.DS_Store` - Mac system files
- [ ] `Thumbs.db` - Windows thumbnails
- [ ] `*.md` - Markdown documentation files

---

## Upload Method Options

### Option 1: ZIP Upload (Recommended)

1. Create ZIP file with all folders and files
2. Upload ZIP to cPanel File Manager
3. Extract in target directory: `/home1/theworkn/worknest`
4. Delete ZIP file after extraction

### Option 2: Individual Folder Upload

1. Upload each folder separately as ZIP
2. Extract each ZIP in target directory
3. Upload individual files (`server.js`, `package.json`, etc.)

### Option 3: FTP Upload

1. Use FTP client (FileZilla, WinSCP)
2. Upload all files and folders
3. Maintain directory structure

---

## After Upload - Verify Files

Check these files exist in `/home1/theworkn/worknest/`:

```bash
# Core files
server.js
package.json
package-lock.json
.env.local

# Folders
.next/
public/
app/
components/
lib/
styles/
```

---

## File Permissions to Set

After upload, set these permissions:

- **Folders:** `755`
- **Files:** `644`
- **`.env.local`:** `600` (more secure)

---

## Quick Upload Command (if using SSH)

```bash
# From local machine (if you have SSH access)
scp -r .next public app components lib styles server.js package.json package-lock.json .env.local user@server:/home1/theworkn/worknest/
```

---

**Note:** Always build the application locally first before uploading!

