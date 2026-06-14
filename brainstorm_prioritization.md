# Ideation Phase — Brainstorm & Idea Prioritization

**Date**: 31 January 2025  
**Team ID**: Team-ShopEZ-23  
**Project Name**: ShopEZ — Localized MVC MERN E-Commerce Platform  
**Maximum Marks**: 4 Marks  

---

### Step-1: Team Gathering, Collaboration and Select the Problem Statement

#### 🤝 Collaboration & Gathering Setup
* **Communication Channel**: Slack for daily check-ins and updates.
* **Whiteboarding Tool**: Mural and Figma Jam for asynchronous layout brainstorming, diagram creation, and visual flow mapping.
* **Source Control**: GitHub repository for tracking code changes, versioning, and continuous collaboration.

#### 🎯 Selected Problem Statement
The standard template e-commerce platforms are typically designed around a Western market model (USD currency, ZIP code formats, standard shipping models, and mixed frontend-backend folders). This creates friction when developing an application specifically tailored for Indian consumers and deployment grading structures. 

Specifically, we address the following challenges:
1. **Lack of Localized UX**: Standard platforms display pricing in USD (`$`), use non-Indian numbering formats, and lack strict validations for Indian mobile numbers (10 digits) and PIN codes (6 digits).
2. **Directory & Deployment Clutter**: Unstructured project repositories lead to overlapping client and server configuration files, violating clean MVC design principles.
3. **Rigid Homepages**: Homepage banners and key promotional assets are often hardcoded in the frontend, preventing dynamic admin customization.
4. **Grading Compliance**: Lack of explicit request-parsing middleware (e.g., `body-parser`) and incorrect server entry point naming (e.g., `index.js` instead of `server.js`).

**Target Objective**: Restructure the application into isolated, clean `client` (React) and `server` (Node/Express/MongoDB) environments, fully localize the payment, shipping, and currency parameters for the Indian market, and add a dynamic `Admin` configuration system alongside a premium, custom visual identity.

---

### Step-2: Brainstorm, Idea Listing and Grouping

During our collaborative brainstorming sessions, the team proposed and categorized multiple ideas to solve the target objective:

#### Group A: Structural Separation & MVC Compliance (Server Restructuring)
* **Idea A1**: Separate the codebase into independent `client/` and `server/` directories, each with its own package configurations and build/dev processes.
* **Idea A2**: Rename the main server file to `server/server.js` and update backend scripts to ensure compatibility with standard assignment runners.
* **Idea A3**: Explicitly integrate and configure `body-parser` JSON and URL-encoded middleware to handle incoming request bodies uniformly.
* **Idea A4**: *Discarded:* Maintain a hybrid Supabase + Express setup. This was rejected because using two distinct databases/backends increases latency, splits state, and violates pure MVC architecture.

#### Group B: Indian Market Localization (UX/UI Enhancements)
* **Idea B1**: Localize all currency markers in the application to Indian Rupees (`₹`), substituting old dollar symbols (`$`) across all user and admin-facing views.
* **Idea B2**: Implement localized Indian e-commerce shipping rules: Free shipping eligibility threshold raised to **₹500**, with a standard shipping charge of **₹50** on smaller orders.
* **Idea B3**: Implement validation rules on the checkout page restricting inputs to a 6-digit PIN code format and 10-digit mobile number format.
* **Idea B4**: Format all revenue stats on the Admin Dashboard using the Indian numbering system (`en-IN`) grouping (e.g., ₹1,50,000 instead of ₹150,000).

#### Group C: Dynamic Admin System & Premium Branding
* **Idea C1**: Create a dedicated Mongoose `Admin` collection (`admins` collection) to dynamically store homepage configurations, specifically landing banner images.
* **Idea C2**: Update the backend seeding script (`server/seed.js`) to clear, seed, and populate default categories, products, user accounts, and admin banner assets.
* **Idea C3**: Build a custom vector `Logo` component (`Logo.tsx`) combining a shopping bag shape with an embedded Rupee (`₹`) symbol, styled with a modern saffron-white-emerald handle gradient to reflect the target Indian consumer base.
* **Idea C4**: Position the new branding logo on the Login and Signup pages to establish instant brand identity.

---

### Step-3: Idea Prioritization

We plotted the brainstormed ideas on an **Action Priority Matrix (Impact vs. Effort)** to optimize our execution plan:

```text
       HIGH IMPACT
       ┌───────────────────────────────┬───────────────────────────────┐
       │                               │                               │
       │  QUICK WINS                   │  MAJOR PROJECTS               │
       │  • Currency localization (₹)  │  • Structural isolation of    │
       │  • Pincode/phone validation   │    client/ & server/ folders  │
       │  • Premium vector Logo design │  • Dynamic Admin collection   │
       │    and form placement         │    model & seed population    │
       │  • Rename main to server.js   │                               │
       │                               │                               │
       ├───────────────────────────────┼───────────────────────────────┤
       │                               │                               │
       │  FILL-INS                     │  THANKLESS TASKS              │
       │  • Shipping pricing shifts    │  • Maintaining hybrid         │
       │    (₹500 threshold / ₹50 fee) │    Supabase configurations    │
       │  • en-IN dashboard number     │    (Discarded)                │
       │    locale formatting          │                               │
       │                               │                               │
       └───────────────────────────────┴───────────────────────────────┘
       LOW                                                         HIGH
                                    EFFORT
```

#### 📋 Execution Timeline Based on Prioritization:
1. **Phase 1: Foundation (High Impact, High Effort)**:
   - Restructure folder layouts into decoupled `client/` and `server/` folders.
   - Setup `server.js` backend, inject `body-parser`, and create the Mongoose database schemas (including the new `Admin` banner model).
2. **Phase 2: Localized UX & Branding (High Impact, Low Effort)**:
   - Swap currency variables to Indian Rupees (`₹`) across all frontend pages.
   - Enforce 6-digit pincode and 10-digit phone number validation regex.
   - Implement the new SVG `Logo` component inside the Navbar, Footer, and Auth pages.
3. **Phase 3: Seeding & Verification (Low Effort, Low/High Impact)**:
   - Run the database seeding scripts.
   - Boot client and server dev instances to verify complete functional flows (registration, shopping, cart calculations, checkout, order logs, and admin dashboards).
   - Push codebase to the GitHub remote repository.
