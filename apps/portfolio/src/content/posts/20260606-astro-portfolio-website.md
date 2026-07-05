---
author: rmexdev
pubDatetime: 2026-06-06T23:30:51.000+05:30
modDatetime: 
title: 'Deploy a static Portfolio + Blog website using Astro and Github Pages'
featured: false
draft: true
tags:
  - portfolio
description: ''
---

 Introductory Sentence

## Table of contents

### Technologies
Astro
Astro Paper
Github pages
NPM

Bullet points
Create a repo using the template command (try running the build command)
Delete unneeded files
Update Astro paper config
Update favicon and OG Image
Add base in astro config
Add gh-pages package
Add nojekyll and CNAME files
Update GitHub pages settings
Build, then deploy
Connect domain

<!-- 

<details>
<summary>i have a astro website. i want to host this website on github pages but without using github actions. I pushed the dist folder generated from the astro build command to the gh-pages branch, but no styling or js is getting loaded. the network tab shows a 404 error.
How do I host my astro website as a static website on github pages</summary>
Ah, the classic GitHub Pages blank screen of death. I feel your pain—pushing your code only to see a broken, unstyled page with a wall of 404 errors in the network tab is incredibly frustrating.

The good news? Your `dist` folder is likely fine. The issue almost always comes down to **pathing**.

By default, Astro builds your site assuming it lives at the root of a domain (e.g., `https://yourwebsite.com/`). But unless you are using a custom domain, GitHub Pages hosts project sites in a subdirectory (e.g., `https://username.github.io/repo-name/`). Because of this, Astro is looking for your CSS and JS at the root, but GitHub has tucked them away inside your repository folder.

Here is exactly how to fix it without touching GitHub Actions.

---

### Step 1: Update your `astro.config.mjs`

You need to tell Astro explicitly that it is being hosted in a subdirectory. Open your configuration file and add the `site` and `base` properties.

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  // 1. Your full GitHub Pages URL
  site: 'https://<your-username>.github.io', 
  
  // 2. The exact name of your GitHub repository (must start with a forward slash)
  base: '/<your-repo-name>', 
});

```

> ⚠️ **Important:** Make sure `<your-repo-name>` matches your GitHub repository exactly. If your repo is called `my-portfolio`, your base should be `/my-portfolio`.

### Step 2: Rebuild your website

Now that Astro knows where the assets will actually live, run your build command again in your terminal:

```bash
npm run build

```

If you inspect the newly generated `dist/index.html` file, you'll notice that your asset paths now look like `/repo-name/_astro/client.css` instead of just `/_astro/client.css`.

### Step 3: Push the updated `dist` folder to `gh-pages`

Since you are managing deployment manually without Actions, you just need to get the contents of this new `dist` folder back up to your `gh-pages` branch.

If you are using a tool like the `gh-pages` npm package, you can just run:

```bash
npx gh-pages -d dist

```

*(Or, if you are doing it manually via Git, ensure the **contents** of `dist` are what gets pushed to the root of your `gh-pages` branch).*

### Step 4: Add a `.nojekyll` file (Just in case)

GitHub Pages automatically runs a static site generator called Jekyll behind the scenes. Jekyll ignores any folders that start with an underscore (like Astro’s `_astro` folder where your JS and CSS live).

To stop GitHub from ignoring your assets:

1. Create an empty file named `.nojekyll` (with the dot at the front).
2. Place it directly inside your `public/` folder in your Astro project.
3. Re-run `npm run build`. This ensures the file is copied into the root of your `dist` folder every time you build.

---

### Why this fixes the 404s

Without the `base` configuration, your browser was looking for your styles here:
`https://username.github.io/_astro/styles.css` (Which doesn't exist ❌)

With the `base` configuration added, your browser correctly looks here:
`https://username.github.io/repo-name/_astro/styles.css` (Success!  )

Give it a few minutes for GitHub to clear its cache after you push the update, and your site should load beautifully. Let me know if those 404s clear up!</details>

<details>
<summary>the dist folder that is getting generated does not seem to have a public folder in it. Nor does the code that is there on the gh-pages branch</summary>
That is actually completely normal! It’s a common point of confusion when first working with Astro.

Here is what is happening under the hood:

### Where did the `public` folder go?

Astro uses the `public/` folder as a staging area for static assets (like your favicon, images, or that `.nojekyll` file we talked about). When you run `npm run build`, Astro takes everything *inside* the `public` folder and copies it **directly into the root of the `dist` folder**, not as a subfolder.

So, if your project looks like this:

* `public/favicon.svg`
* `public/.nojekyll`

Your generated `dist` folder will look like this:

* `dist/favicon.svg`
* `dist/.nojekyll`
* `dist/index.html`
* `dist/_astro/` (this contains your compiled JS and CSS)

### What should be on your `gh-pages` branch?

Your `gh-pages` branch should **only** contain the *contents* of your `dist` folder, right at the root level. It should not contain a folder named `dist` or a folder named `public`.

If GitHub Pages opens your repository and sees a folder named `dist` instead of an `index.html` file, it won't know what to load.

Here is a quick checklist of what your `gh-pages` branch files should look like on GitHub:

```text
your-repo/ (gh-pages branch)
├── _astro/          <-- (Contains your CSS/JS)
├── .nojekyll        <-- (Crucial for GitHub to see the _astro folder)
├── index.html       <-- (Your main homepage)
└── favicon.svg      <-- (Any other assets from your public folder)

```

### The Easiest Way to Deploy Correctly

If you are manually moving files or trying to push the `dist` folder using standard git commands, it can get messy quickly. The absolute easiest way to ensure only the *contents* of `dist` get pushed to your `gh-pages` branch without using GitHub Actions is using the `gh-pages` npm package.

1. Install it in your project as a dev dependency:
```bash
npm install -D gh-pages

```


2. Open your `package.json` file and add a `deploy` script:
```json
"scripts": {
  "dev": "astro dev",
  "start": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "astro": "astro",
  "deploy": "astro build && gh-pages -d dist -t true"
}

```


*(Note: The `-t true` flag ensures dotfiles like `.nojekyll` are included in the upload).*
3. Now, whenever you want to update your website, just run:
```bash
npm run deploy

```



This command will automatically build your Astro site, grab everything inside the `dist` folder, and force-push **just those contents** to your `gh-pages` branch on GitHub, cleaning up any path issues automatically.</details>

<details>
<summary>for the js and css files, it is giving a 301 status now. Styling still doesn't appear.</summary>
Ah, progress! Moving from a 404 (Not Found) to a 301 (Moved Permanently) means GitHub Pages now *knows* those files exist, but it is trying to redirect the browser somewhere else—and getting stuck in the process.

This almost always happens because of a subtle trailing slash issue in how the `base` URL is interacting with Astro's asset routing.

Let’s get this sorted out. Here are the two things causing this and how to fix them:

### 1. The Trailing Slash in `astro.config.mjs`

When GitHub Pages serves a project site, it expects the folder paths to resolve strictly. If your `base` configuration doesn't have a trailing slash, or if your assets are being referenced with a double slash (e.g., `//_astro/...`), GitHub will throw a 301 redirect to try and correct the URL, breaking the CSS/JS load.

Open your `astro.config.mjs` and make sure it looks exactly like this, paying close attention to the **slashes**:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<your-username>.github.io',
  base: '/<your-repo-name>', // NO trailing slash here
  trailingSlash: 'always'    // Forces consistent URL routing
});

```

### 2. Force Clear Your Browser Cache (Crucial)

Because 301 is a *permanent* redirect, your browser is incredibly stubborn about remembering it. Even if you fixed the code, your browser might still be serving the broken 301 redirect from its local memory.

1. Open your published GitHub Pages site.
2. Open your Developer Tools (F12 or Right-Click -> Inspect).
3. Right-click the **Refresh button** in your browser and select **"Empty Cache and Hard Reload"** (or press `Ctrl + F5` / `Cmd + Shift + R`).

---

### Still Blinking? Check your `dist` build output

If you do a hard reload and it’s still 301-ing, let's look at how the HTML is actually being generated.

Run `npm run build` locally, open up your local `dist/index.html` file, and look at how your CSS is being linked near the top. It should look exactly like this:

`<link rel="stylesheet" href="/your-repo-name/_astro/index.XXXXX.css" />`

* If it says `/_astro/index.css` (missing the repo name), your `base` config isn't being applied correctly.
* If it has a double slash like `/your-repo-name//_astro/`, your `base` config has an accidental extra slash at the end.

Update your config, run your deployment command again, give GitHub about 60 seconds to process the new files, and give it that hard refresh. Your styling should snap right into place!</details>

<details>
<summary>in the github pages webpage, it is showing me the last deployment was an hour ago. I have disabled Github Actions for this repo and also selected 'Deploy from branch' in the Build and Deployment source option.</summary>
Ah! That is the final piece of the puzzle. If GitHub Pages is telling you the last deployment was an hour ago, it means **GitHub hasn’t actually processed your new pushes yet.**

When you choose "Deploy from branch," GitHub Pages *still* uses an internal background process to take the files from your `gh-pages` branch and publish them to their web servers. If you disabled GitHub Actions entirely in your repository settings, you might have accidentally turned off the very mechanism GitHub uses to refresh your site when a branch updates.

Let's get GitHub syncing with your manual pushes again.

### Step 1: Ensure Actions are allowed to run the deployment

Even though you aren't writing a custom workflow file, GitHub Pages relies on its own built-in Actions runner to sync the branch.

1. Go to your repository on GitHub.
2. Click on **Settings** -> **Actions** -> **General**.
3. Under **Actions permissions**, make sure **"Allow all actions and reusable workflows"** (or at least the local option) is selected.

### Step 2: Kickstart the deployment

Sometimes GitHub Pages gets "stuck" if the settings were changed. Let's force it to look at your branch:

1. In your repository **Settings**, go to the **Pages** tab on the left menu.
2. Under **Build and deployment**, temporarily switch the Source from "Deploy from branch" to **"GitHub Actions"**.
3. Wait 5 seconds, then switch it right back to **"Deploy from branch"**.
4. Re-select your `gh-pages` branch and the `/ (root)` folder, then click **Save**.

### Step 3: Verify the update on GitHub

Once you click save (or after you run `npm run deploy` again), go to the main page of your repository on GitHub.

On the right-hand sidebar, look at the **Environments** section. You should see `github-pages` with a little green dot or a loading circle. Click on it to see the live deployment status.

Once that timestamp changes from "an hour ago" to "now" or "1 minute ago," your 301 redirects and styling issues will be officially overwritten by your new, corrected configuration!</details>

<details>
<summary>Enabled Github Actions and the redeployment happened again as well. Still I see the same 301 status</summary>
If the deployment timestamp updated but you are still seeing 301 statuses, it means GitHub is actively redirecting your asset requests to a different URL structure.

Because we know the `gh-pages` branch is updating, a 301 on a static file asset almost always points to an exact mismatch between how Astro is building the asset URLs and how GitHub Pages expects them.

Let’s run a quick 3-step diagnostic to find exactly where the path is breaking.

---

### Step 1: Check your `site` URL format

Look closely at your `astro.config.mjs` file. A common culprit for 301 loops is including a trailing slash or a `www` in the `site` property when GitHub doesn't use it.

Ensure your config looks **exactly** like this (replacing with your actual username and repo):

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<your-username>.github.io', // NO trailing slash here
  base: '/<your-repo-name>',                 // MUST start with a slash, NO trailing slash
});

```

### Step 2: Inspect the "Location" header in your Network Tab

The 301 status code means "Moved Permanently," and the server *always* sends back the new address it wants the browser to go to. We can use this to see exactly what GitHub is complaining about.

1. Open your browser's Developer Tools (`F12`) and go to the **Network** tab.
2. Refresh the page so you see the red/yellow 301 errors.
3. Click on one of the broken CSS or JS files.
4. Look at the **Headers** tab on the right, and find the **Response Headers** section.
5. Look for the **`Location:`** header.

> **What does the `Location` header say?**
> * If it is redirecting from `/repo-name/_astro/` to `/repo-name/_astro` (or vice versa), it's a trailing slash issue.
> * If it is redirecting to `https://<your-username>.github.io/_astro/...` (missing the repo name), your `base` config isn't being compiled into the HTML.
> 
> 

### Step 3: Check for Case Sensitivity

GitHub Pages servers are case-sensitive (Linux-based), whereas your local computer (Windows/Mac) usually is not.

If your repository is named `My-Portfolio` but your Astro config `base` is set to `/my-portfolio` (lowercase), your local build will work perfectly, but GitHub Pages will throw a 301 redirect trying to find the correct casing, often failing to load the asset. Ensure the capitalization in your `base: '/<your-repo-name>'` matches your GitHub repository name exactly.

### Step 4: The Nuclear Option (Clear GitHub's Cache)

If your configurations are 100% correct and matching, GitHub Pages might be caching the old 301 redirect on *their* edge servers.

To force GitHub to clear its cache entirely:

1. Go to your repository **Settings** -> **Pages**.
2. Under "Build and deployment", change the branch from `gh-pages` to `main` (or `master`) and hit **Save**.
3. Wait 1 minute.
4. Change it back to `gh-pages` and hit **Save**.

This completely tears down the GitHub Pages server instance for your repo and rebuilds it fresh using your newest code. Give that a shot and check the Network tab again!</details>

<details>
<summary>my site url is https://somedev.github.io and the base is "somedev.github.io" as my repo name is "somedev.github.io". Should I change that? </summary>
Yes, **absolutely change that!** You have hit the exact edge case that causes this specific routing loop.

Because your repository is named `somedev.github.io`, GitHub Pages treats this as a **User Website** rather than a **Project Website**.

Here is exactly why that is causing the 301 redirect and how to fix your configuration.

---

### The Problem: User Sites vs. Project Sites

GitHub Pages has two different ways of serving sites:

1. **Project Sites:** `https://username.github.io/repo-name/` (Requires a `base` folder path).
2. **User Sites:** `https://username.github.io/` (Root level—**No subfolders**).

Because your repository is named exactly `somedev.github.io`, GitHub is serving your website directly at the root (`https://somedev.github.io/`).

By setting your `base` configuration to `"somedev.github.io"`, you are telling Astro to look for your files inside a subfolder: `https://somedev.github.io/somedev.github.io/_astro/...`

GitHub sees this, realizes it's a weird path, tries to use a 301 redirect to guess what you mean, and ultimately fails to find the files.

---

### The Fix: Set `base` to the Root

Since your site is being served at the absolute root of your domain, your `base` should just be a single forward slash `/` (or omitted entirely, as Astro defaults to `/`).

Open your `astro.config.mjs` and change it to this:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Your main URL
  site: 'https://somedev.github.io', 
  
  // CHANGE THIS to just a forward slash because your repo is the user root!
  base: '/', 
});

```

### Step 2: Re-deploy

1. Save the file.
2. Run your deployment command again:
```bash
npm run deploy

```


*(Or build and push your `dist` contents manually to the `gh-pages` branch).*
3. Give GitHub Pages about a minute to process the update.
4. **Important:** Do a hard refresh in your browser (`Ctrl + F5` or `Cmd + Shift + R`) to force it to forget that old 301 redirect.

Your paths in the HTML will now correctly point to `https://somedev.github.io/_astro/...` instead of nesting your domain name twice, and your styles will load perfectly!</details>

<details>
<summary>Woah, that worked. Thank you! One last thing, how do I connect this to my domain 'some.dev'</summary>
Awesome! I'm so glad that did the trick. Dealing with root domains vs. subdirectories is a rite of passage for web developers.

Connecting your custom domain `some.dev` is the perfect final touch. Since you are using a User Site (`somedev.github.io`), the setup is incredibly clean.

Here is how to wire it up so GitHub and your domain provider talk to each other correctly.

---

### Step 1: Update your `astro.config.mjs`

First, you need to let Astro know your new primary URL so it can generate correct canonical links and sitemaps. Change the `site` property to your new domain:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://some.dev', // Update to your custom domain
  base: '/',                // Keep this as '/'
});

```

Run `npm run deploy` one more time so the newly compiled code is pushed up.

### Step 2: Tell GitHub about your domain

GitHub needs to know to expect traffic from `some.dev`.

1. On GitHub, go to your repository **Settings** -> **Pages**.
2. Scroll down to the **Custom domain** section.
3. Type in `some.dev` and click **Save**.

> 💡 **What this actually does:** GitHub automatically creates a file named `CNAME` (with no file extension) containing just `some.dev` and commits it to your `gh-pages` branch.

*Note: Since you are manually deploying from your local machine, your next `npm run deploy` might overwrite this file if you aren't careful. To prevent this, create a file named `CNAME` (all caps, no extension) inside your local `public/` folder, and type `some.dev` inside it. Astro will then bundle it safely into every build.*

### Step 3: Update your DNS Records (At your Domain Provider)

Now you need to tell your domain provider (GoDaddy, Namecheap, Google Domains/Squarespace, etc.) to point `some.dev` to GitHub's servers.

Log into your domain registrar, find the **DNS Settings / DNS Zone Editor**, and add the following records:

#### 1. The Apex Domain (The @ records)

You will need to create **four `A` records** pointing to GitHub's official IP addresses.

| Type | Name (Host) | Value (IP Address) |
| --- | --- | --- |
| **A** | `@` | `185.199.108.153` |
| **A** | `@` | `185.199.109.153` |
| **A** | `@` | `185.199.110.153` |
| **A** | `@` | `185.199.111.153` |

#### 2. The `www` Subdomain (Optional but recommended)

If someone types `www.some.dev`, you want them to land on your site too. Add a **`CNAME` record** to handle this:

| Type | Name (Host) | Value (Target) |
| --- | --- | --- |
| **CNAME** | `www` | `somedev.github.io.` |

*(Note: Some DNS providers require a trailing dot after `somedev.github.io.`, while others don't. If it gives you an error, remove the final dot).*

---

### Step 4: Enforce HTTPS

DNS changes can take anywhere from a few minutes to a few hours to propagate worldwide.

Once the DNS updates, go back to your GitHub repository **Settings** -> **Pages**. Refresh the page, and you should see a checkbox under your custom domain that says **"Enforce HTTPS"**.

Check that box! GitHub will provision a free SSL certificate for `some.dev` so your site securely loads with `https://`. (If the checkbox is greyed out, it just means GitHub is still verifying your DNS records; give it a little time).

And that's it! You've got a blazing-fast, custom-domain Astro site running entirely on GitHub Pages without a single line of GitHub Actions yaml config. Congrats!
</details> -->
