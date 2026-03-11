# 🚀 SnippetVault

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38BDF8?logo=tailwindcss&logoColor=white)
![Highlight.js](https://img.shields.io/badge/Highlight.js-Syntax%20Highlighting-yellow)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

---

# 🌐 Live Application

```
https://snippetvault-lime.vercel.app/
```

---

# 📌 Important Routes (How to Test the App)

Since the project uses **Next.js App Router**, you must access pages using the following routes.

### Sign Up Page

```
https://snippetvault-lime.vercel.app/signup
```

Create a new account here.

---

### Login Page

```
https://snippetvault-lime.vercel.app/login
```

Login using your registered account.

---

### Dashboard

```
https://snippetvault-lime.vercel.app/dashboard
```

Here you can:

- Create snippets
- Add tags
- Copy code
- Share snippets
- Delete snippets

---

### Shared Snippet Page

When you click **Share**, a link is generated like:

```
https://snippetvault-lime.vercel.app/share/{share_id}
```

Example:

```
https://snippetvault-lime.vercel.app/share/abc123
```

Anyone with this link can view the snippet.

---

# ✨ Features

### 🔐 Authentication
- Secure login and signup
- Managed with **Supabase Auth**

### 📝 Create Snippets
- Add snippet title
- Select programming language
- Paste code
- Add tags

### 🎨 Syntax Highlighting
- Highlighted code using **Highlight.js**

### 📋 Copy Code
- Copy snippet code instantly

### 🔗 Share Snippets
- Generate public shareable link
- View snippets without login

### 🗑 Delete Snippets
- Remove snippets from dashboard

### 🏷 Tag Support
- Add tags to organize snippets

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|--------|
Next.js | Frontend Framework |
Supabase | Backend + Database |
TailwindCSS | Styling |
Highlight.js | Syntax highlighting |
Vercel | Deployment |

---

# 📂 Project Structure

```
snippetvault
│
├── app
│   ├── dashboard
│   │   └── page.tsx
│   │
│   ├── login
│   │   └── page.tsx
│   │
│   ├── signup
│   │   └── page.tsx
│   │
│   └── share
│       └── [id]
│           └── page.tsx
│
├── components
│   ├── CreateSnippetForm.tsx
│   ├── Navbar.tsx
│   └── SnippetList.tsx
│
├── lib
│   └── supabase.ts
│
└── package.json
```

---

# 🔄 Application Flow (Mermaid Flowchart)

```mermaid
flowchart TD

User[User Opens Application]

User --> Signup[Signup Page]
Signup --> CreateAccount[Create Account]

CreateAccount --> Login[Login Page]
Login --> Dashboard[Dashboard]

Dashboard --> CreateSnippet[Create New Snippet]
CreateSnippet --> SaveSnippet[Save Snippet to Supabase]

SaveSnippet --> DisplaySnippet[Snippet Appears in Dashboard]

DisplaySnippet --> CopyCode[Copy Code Button]
DisplaySnippet --> DeleteSnippet[Delete Snippet Button]

DisplaySnippet --> ShareSnippet[Click Share Button]

ShareSnippet --> GenerateLink[Generate Public Share Link]

GenerateLink --> PublicPage[Public Snippet Page]

PublicPage --> ViewSnippet[Anyone Can View the Snippet]

ViewSnippet --> End[End]
```
---

# 🚀 Running the Project Locally

### Clone Repository

```
git clone https://github.com/Anusha1527/snippetvault.git
cd snippetvault
```

---

### Install Dependencies

```
npm install
```

---

### Create Environment Variables

Create `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these in:

```
Supabase → Project Settings → API
```

---

### Start Development Server

```
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🌍 Deployment

This project is deployed on **Vercel**

Live URL:

```
https://snippetvault-lime.vercel.app/
```

Deployment steps:

1. Push project to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

---

# 💡 Future Improvements

- 🔎 Search snippets
- ⭐ Favorite snippets
- 📁 Folder organization
- 🌐 Public snippet gallery
- 🧑‍🤝‍🧑 Team collaboration

---