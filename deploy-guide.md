# Deploy: Share Your App with the World

Once your `index.html` works locally, use one of these options to share it with a URL anyone can open — no download required.

---

## Option A: Google Sites (Easiest — 5 minutes, no new accounts)

Google Sites lets you embed your HTML app directly in a webpage. Good for: sharing with a class, embedding in a course page, or just getting a quick live URL.

**Limitation**: Some advanced features (like saving data between sessions) may not work inside Google Sites. If your app uses `localStorage`, test it after embedding.

### Steps

1. Go to **[sites.google.com](https://sites.google.com)**
2. Click **"Blank site"** (top left, the `+` button)
3. Give your site a name (top left, click "Untitled Site")
4. In the main editing area, click **Insert** in the right sidebar > **Embed**
5. Click the **"Embed code"** tab
6. Paste your entire `index.html` code into the box
7. Click **Next**, then **Insert**
8. You'll see a preview of your app embedded in the page
9. Click **Publish** (top right) > choose a URL slug (e.g., `sites.google.com/view/my-habit-tracker`) > Publish

**Your app is now live.** Copy the URL and share it.

### Updating

1. Come back to your site at sites.google.com
2. Click the pencil icon to edit
3. Click on the embedded app > click the pencil/edit icon on the embed block
4. Replace the code > Next > Insert
5. Publish again

---

## Option B: GitHub Pages (More Robust — 10–15 minutes, requires GitHub account)

GitHub Pages gives you a permanent URL that's faster and works with all app features including localStorage. Good for: apps you'll keep updating, sharing publicly, or putting on a resume.

**You need**: A free GitHub account — sign up at [github.com](https://github.com)

### Steps (No Terminal Required)

**1. Create a GitHub account** (if you don't have one)
   - Go to [github.com/signup](https://github.com/signup)
   - Use a personal email (not school/work)
   - Choose a username you'll keep — it becomes part of your URL

**2. Create a new repository**
   - Click the **`+`** in the top-right > **"New repository"**
   - Repository name: something short and lowercase, no spaces (e.g., `habit-tracker` or `my-app`)
   - Set to **Public**
   - Check **"Add a README file"**
   - Click **"Create repository"**

**3. Upload your HTML file**
   - In your new repository, click **"Add file"** > **"Upload files"**
   - Drag your `index.html` file into the upload area (or click "choose your files")
   - Scroll down to "Commit changes"
   - Leave the message as-is or type something like "Add app"
   - Click **"Commit changes"**

**4. Enable GitHub Pages**
   - Click the **"Settings"** tab (top of the repo page)
   - In the left sidebar, scroll down and click **"Pages"**
   - Under "Source", click the dropdown that says "None" and select **"Deploy from a branch"**
   - Under "Branch", select **"main"** and leave the folder as **"/ (root)"**
   - Click **"Save"**

**5. Wait, then visit your site**
   - Wait about **2 minutes** for the first deployment
   - Refresh the Settings > Pages page — you'll see a green banner: "Your site is live at..."
   - Your URL is: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`
   - Click it to open your live app

### Updating Your App on GitHub Pages

When you have a new version of your `index.html`:
1. Go to your repository on github.com
2. Click on `index.html` in the file list
3. Click the **pencil icon** (Edit this file) in the top right
4. Select all the text and delete it
5. Paste your new code
6. Click **"Commit changes"** > "Commit changes" again
7. Wait 1–2 minutes, then hard-refresh the page: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)

---

## Option C: Send the File Directly (Simplest of All)

If you just want to share with specific people and don't need a URL:

1. Email them your `index.html` as an attachment
2. They download it, double-click it, and it works in their browser
3. No account, no hosting — it's just a file

Works great for: classroom demos, sharing with a teacher, testing with a friend.

---

## After Deploying: Paste Your URL in Your Google Doc

Go back to your Google Doc and paste your live URL in the "My App Link" section. Also fill in your reflection:
- What did you build?
- What surprised you?
- What would you add next time?

---

## Troubleshooting

### Google Sites: "The app looks blank"
- Make sure you pasted the FULL code including `<!DOCTYPE html>` at the start and `</html>` at the end
- Try a hard refresh: Ctrl+Shift+R / Cmd+Shift+R
- Some apps won't work inside Sites — try GitHub Pages instead

### GitHub Pages: "404 Not Found"
- Make sure the file is named exactly `index.html` (lowercase, no spaces)
- Wait 3 minutes — Pages takes time on the first deploy
- Check Settings > Pages — is it showing the green banner yet?

### GitHub Pages: "Page loads but the app doesn't work"
- Your code may be referencing external files — with this super prompt, everything should be in one file
- Open the browser console (F12 > Console tab) and look for red errors

### Either: "I updated the code but nothing changed"
- Do a hard refresh: **Ctrl+Shift+R** (Windows) / **Cmd+Shift+R** (Mac)
- GitHub Pages takes 1–3 minutes to redeploy after a commit

---

## Your Deployed URL

Write this down and save it in your Google Doc:

```
Google Sites:  https://sites.google.com/view/YOUR-SITE-NAME
GitHub Pages:  https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

This URL is yours to keep. Share it with anyone, put it on your bio, show it to your class.
