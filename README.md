# 🦮 FORA SA

![FORA SA Banner](./frontend/src/assets/githubImages/FORABanner.png)

### Kiera Poley 251197

A digital home for shelter, care and community.

**FORA SA Connect** is a full-stack volunteer management platform for Friends of Rescued Animals South Africa (FORA SA), a public facing site where visitors can learn about the shelter, browse volunteer opportunities and register to help out, and a staff only side with CRUD functionality where FORA's team can post announcements/opportunities, manage said announcements & opportunities (with image uploads) as well as review submitted volunteer applications.

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [How to Install](#how-to-install)
  - [File Structure](#file-structure)
- [Features and Functionality](#features-and-functionality)
- [Planning & Process](#planning-&-process)
  - [ERD](#erd)
  - [Design Reference](#design-reference)
- [Final Outcome](#final-outcome)
  - [Live Website Links](#live-website-links)
  - [Mockups](#mockups)
  - [Presentation Slides](#presentation-slides)
- [Deployment Summary](#deployment-summary)
- [Challenges and Solutions](#challenges-and-solutions)
- [What I Learnt](#what-i-learnt)
- [Acknowledgements](#acknowledgements)
- [License](#license)

---

## About the Project

FORA Connect gives the shelter one place to post what's happening and give
the community an easy way to get involved - and gives FORA's staff a simple
dashboard to manage that content themselves, without needing a developer
on hand for every update.

### Built With

- **Frontend:** React (Create React App), React Router DOM & React Icons
- **Backend:** Node.js & Express (Controller/Model/Route pattern)
- **Database:** MySQL (via XAMPP/phpMyAdmin)
- **Auth:** JSON Web Tokens (jsonwebtoken) & bcryptjs for staff login
- **Image Hosting:** Cloudinary, via Multer & multer-storage-cloudinary

---

## Getting Started

### Prerequisites

- [XAMPP](https://www.apachefriends.org/) (for MySQL as Apache isn't needed, Express serves the API)
- [Node.js](https://nodejs.org/) (v18+) and npm
- A free [Cloudinary](https://cloudinary.com/) account (for opportunity images)
- A code editor (eg. VS Code)

### How to Install

1. Clone the repository:

```bash
   git clone https://github.com/kiera251197/FORA-SA.git
   cd FORA-SA
```

2. Start **MySQL** from the XAMPP control panel.

3. In phpMyAdmin, create a database called `fora_sa`, then **Import** →
   select `backend/database/fora_sa.sql`. This creates every table
   (`staff`, `opportunities`, `announcements`, `labels`,
   `opportunity_tags`, `announcement_labels`, `shifts`, `volunteers`) and
   seeds a few opportunities and announcements so the site isn't empty.

4. Set up the backend:

```bash
   cd backend
   npm install
```

   Create a `.env` file in `backend/` with:

```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=fora_sa

   JWT_SECRET=replace-with-a-long-random-string

   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   PORT=5001
```

   There's no public staff sign up page by design, so create your own
   staff login from the command line:

```bash
   node scripts/createStaffUser.js <username> <password> "<Display Name>"
   # eg. node scripts/createStaffUser.js claire "mypassword123" "Claire"
```

   Then start the API:

```bash
   npm run dev
```

   The backend runs at `http://localhost:5001`.

5. Set up the frontend (in a new terminal):

```bash
   cd frontend
   npm install
   npm start
```

   The app opens at `http://localhost:3000`. `frontend/package.json`
   already has `"proxy": "http://localhost:5001"`, so every `/api/...`
   call is forwarded to the backend automatically, no frontend `.env`
   needed :)

6. Visit `http://localhost:3000/staff/login` and sign in with the staff
   account you created in step 4 to access the dashboard.

### File Structure
```
FORA-SA/
├── .github/
│   └── workflows/
│       ├── azure-static-web-apps-yellow-meadow-01f7f6c10.yml # Azure frontend CI/CD
│       └── main_fora-backend.yml # Azure backend CI/CD
├── .vscode/
├── .deployment
├── .gitattributes
├── .gitignore
├── LICENSE
├── README.md
│
├── backend/
│   ├── .deployment
│   ├── .platform/ # AWS Elastic Beanstalk (only if you added it)
│   │   └── nginx/conf.d/proxy.conf # raises the upload limit to 10MB
│   ├── Procfile # AWS Elastic Beanstalk start command (only if added)
│   ├── package.json
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── database.js
│   │   ├── server.js
│   │   └── upload.js
│   ├── controller/
│   │   ├── announcementController.js
│   │   ├── opportunityController.js
│   │   ├── shiftController.js
│   │   ├── staffController.js
│   │   └── volunteerController.js
│   ├── database/
│   │   └── fora_sa.sql # re-export this if you fixed keys on Azure/RDS
│   ├── middleware/
│   │   └── requireStaffAuth.js
│   ├── models/
│   │   ├── announcementModel.js
│   │   ├── opportunityModel.js
│   │   ├── shiftModel.js
│   │   ├── staffModel.js
│   │   └── volunteerModel.js
│   ├── routes/
│   │   ├── announcementRoutes.js
│   │   ├── opportunityRoutes.js
│   │   ├── shiftRoutes.js
│   │   ├── staffRoutes.js
│   │   └── volunteerRoutes.js
│   └── scripts/
│       └── createStaffUser.js
│
└── frontend/
    ├── .env.production
    ├── package.json
    ├── public/
    │   ├── favicon.svg
    │   ├── index.html
    │   ├── manifest.json
    │   ├── robots.txt
    │   └── staticwebapp.config.json
    └── src/
        ├── assets/
        │   ├── githubImages/
        │   ├── icons/
        │   └── images/
        ├── components/
        │   ├── footer.js
        │   ├── labelPicker.js
        │   ├── navbar.js
        │   ├── requireStaffAuth.js
        │   ├── staffFooter.js
        │   ├── staffNavbar.js
        │   └── thankYouModal.js / .css
        ├── pages/
        │   ├── announcements.js / .css
        │   ├── contact.js / .css
        │   ├── home.js / .css
        │   ├── opportunities.js / .css
        │   ├── story.js / .css
        │   ├── terms.js / .css
        │   ├── volunteer.js / .css
        │   └── staff/
        │       ├── addAnnouncement.js
        │       ├── addOpportunity.js
        │       ├── dashboard.js
        │       ├── editAnnouncement.js
        │       ├── editOpportunity.js
        │       ├── login.js / .css
        │       ├── manageAnnouncements.js
        │       ├── manageOpportunities.js
        │       ├── viewVolunteerApplication.js
        │       ├── volunteerApplications.js
        │       └── staff.css
        ├── utils/
        │   ├── api.js
        │   ├── staffAuth.js
        │   └── useSeo.js
        ├── App.js
        ├── App.css
        ├── index.js
        └── index.css
```

---

## Features and Functionality

Visitors landing on the site can browse featured volunteer opportunities and official shelter announcements and fill out a volunteer application form to express interest in supporting the shelter.

Authenticated staff members access a protected management dashboard to publish and manage announcements, create, edit or delete volunteer opportunities with image uploads, coordinate shift schedules and review incoming volunteer applications in real time.

The system is deployed on `AWS` infrastructure, using Elastic Beanstalk for the Express API, CloudFront for HTTPS and CORS management, Amplify for the React frontend with Single Page Application rewrite rules and RDS MySQL for centralised database storage.

In addition to the AWS environment, the project maintains an automated `Azure` deployment pipeline using Azure Static Web Apps configured via GitHub Actions workflows (`azure-static-web-apps.yml`), utilising custom fallback routing rules (`staticwebapp.config.json`) to handle client side routes and seamless deployment environments.

---
## Planning & Process

### ERD

![FORA SA ERD](https://github.com/kiera251197/FORA-SA/blob/32aef8b1bfb7e9c6e8559aad77b59f0045dd97f4/frontend/src/assets/githubImages/fora%20sa.jpg)

### Design Reference

This website implements the **[FORA SA Connect]** web app designed in Figma by **[Gabriel Lucio Pullela, Amelie Coetser, Victoria Fryer, Mene de Beer, Aiden Stacey-Hale, Kayla van der Westhuizen & Rachel Laubscher]** for the UX200 module.

- Figma file: [Figma Link](https://www.figma.com/design/MV9t4loGJaZgXqL5V8EPhR/FORA-DV-200?node-id=5002-752&t=MPT8RKxuw0BvBV6g-1)
- Design source and credit: Designed by the students mentioned upbove for UX200 and updated design done by me
- Logo, icons and imagery: React Icons (Feather), custom logo, photography sources
- Fonts: League Spartan and Red Hat Display (Google Fonts)

---

## Final Outcome

### Live Website Links

Platform 1:
[Microsoft Azure](https://www.forasaconnect.co.za/)

Platform 2:
[Amazon Web Services](https://main.d2ovdv3v4sfzkv.amplifyapp.com)

### Mockups

#### Desktop PC
![Desktop Mockup](https://github.com/kiera251197/FORA-SA/blob/dde72d92c60960e2cdc9b971153686c77032949d/frontend/src/assets/githubImages/pc%20mockup.png)

#### Laptop
![Laptop Mockup](https://github.com/kiera251197/FORA-SA/blob/dde72d92c60960e2cdc9b971153686c77032949d/frontend/src/assets/githubImages/laptop%20mockup.png)

#### Tablet
![Tablet Mockup](https://github.com/kiera251197/FORA-SA/blob/dde72d92c60960e2cdc9b971153686c77032949d/frontend/src/assets/githubImages/tablet%20mockup.png)

#### Mobile
![Mobile Mockup](https://github.com/kiera251197/FORA-SA/blob/dde72d92c60960e2cdc9b971153686c77032949d/frontend/src/assets/githubImages/mobile%20mockup.png)

### Presentation Slides

coming soon :3

---

## Deployment Summary

### Platform 1: Microsoft Azure
- **Frontend:** Azure Static Web Apps, deployed automatically from GitHub by a GitHub Actions workflow on every push to `main`. `staticwebapp.config.json` rewrites unknown paths to `index.html` so React Router works on refresh.
- **Backend:** Azure App Service (Node.js), deployed by a second GitHub Actions workflow.
- **Database:** Azure Database for MySQL, with the schema imported from `backend/database/fora_sa.sql`.
- **Domain:** custom domain from GoDaddy, connected with DNS records and an Azure managed SSL certificate.
- **Configuration:** environment variables on App Service (`DB_*`, `DB_SSL`, `JWT_SECRET`, `CLOUDINARY_*`, `FRONTEND_URL`) and `REACT_APP_API_URL` at frontend build time.

### Platform 2: Amazon Web Services
- **Frontend:** AWS Amplify Hosting (monorepo, app root `frontend`) with a rewrite rule that serves `index.html` for client side routes.
- **Backend:** Elastic Beanstalk (Node.js on Amazon Linux), started through the `Procfile`, with an nginx config (`.platform/`) that allows 10MB image uploads.
- **HTTPS for the API:** an Amazon CloudFront distribution in front of Beanstalk, so the HTTPS frontend can call the API without mixed content errors.
- **Database:** Amazon RDS for MySQL in the default VPC, restricted by a security group.
- **Configuration:** Beanstalk environment properties (same variables as Azure) and `REACT_APP_API_URL` set in Amplify.

---

## Challenges and Solutions

### During Development

**1. The same label component needed to behave differently on different pages**
- **Challenge:** Announcements and opportunities share labels but opportunities also use Indoor/Outdoor/Weekday/Weekend, which make no sense for announcements.
- **Solution:** Gave `LabelPicker` a `scope` prop and tagged each label with the scopes it belongs to, so one component serves both forms. A shared `labelClassMap` keeps pill colours consistent across the public site and staff dashboard.

**2. Protecting staff routes on both sides**
- **Challenge:** Hiding staff pages in React isn't secure because anyone can call the API directly.
- **Solution:** Passwords are hashed with bcrypt and verified on login, which returns a JWT that expires after 8 hours. A `requireStaffAuth` middleware checks the token on every create, update and delete route. On the frontend, a `RequireStaffAuth` route guard handles redirects, and a `staffFetch` helper attaches the token to every staff request. There is no public sign up and staff accounts are created by a command line script.

### Deployment: Azure

**3. The deployed site loaded but showed no data**
- **Challenge:** The frontend, backend and database were all deployed but every API call returned a 404.
- **Cause:** The server file lives in `backend/config/`, but the start script and deployment settings didn't point at it, so Azure fell back to its default page.
- **Solution:** Corrected the start command and removed leftover code that referenced an undefined path.

**4. Relative API URLs only worked locally**
- **Challenge:** Staff could log in but couldn't add, edit or delete anything. The console showed "Unexpected token `<`" because the app received an HTML page instead of JSON.
- **Cause:** Calls like `fetch("/api/...")` only reach the backend in development. In production they hit the static site itself.
- **Solution:** Created a central `API_BASE_URL` (from `REACT_APP_API_URL`) and updated `staffFetch` and all public fetches to use it.

**5. CORS blocked the production frontend**
- **Challenge:** Once the backend ran, the browser rejected requests from the deployed site.
- **Solution:** Replaced the open CORS setting with an allow list built from defaults plus a `FRONTEND_URL` environment variable so each new domain (Azure URL, custom domain, AWS URL) can be added without a code change.

**6. Strict SQL mode rejected my queries (HTTP 500)**
- **Challenge:** Announcements and opportunities returned 500 on Azure only. The log showed `only_full_group_by` errors.
- **Cause:** Azure MySQL enforces strict `GROUP BY` rules that XAMPP doesn't.
- **Solution:** Read the backend log stream to find the exact SQL error, then relaxed the mode per connection in `database.js` and fixed the underlying cause (see number 7 below).

**7. The database import silently lost my primary keys**
- **Challenge:** Tables on Azure had no `PRIMARY KEY` or `AUTO_INCREMENT` on `id`, and extra hidden `my_row_id` columns had appeared.
- **Cause:** phpMyAdmin exports keys as `ALTER TABLE` statements at the end of the dump. Azure had already auto added invisible primary keys, so those statements failed and the import carried on.
- **Solution:** Rebuilt the keys and foreign keys manually with `ALTER TABLE` scripts, then verified with `SHOW CREATE TABLE`. For future imports, turn off `sql_generate_invisible_primary_key` first.
- **Lesson:** "Import succeeded" doesn't mean the schema is correct -_-

### Deployment: AWS

**8. An https frontend can't call an http API**
- **Challenge:** A single Beanstalk instance only serves plain `http://` and browsers block insecure requests from an https page (mixed content).
- **Solution:** Put a CloudFront distribution in front of the API to provide HTTPS with caching disabled and all HTTP methods and headers forwarded.

**9. Image uploads failed with a 413 on Beanstalk**
- **Challenge:** Beanstalk's nginx proxy rejects request bodies over 1 MB by default, but the my web app allows uploads of up to 10 MB for images.
- **Solution:** Added `.platform/nginx/conf.d/proxy.conf` with `client_max_body_size 10M;`.

**10. Refreshing a page gave a 404 on Amplify**
- **Challenge:** Client side routes like `/staff/login` don't exist as real files.
- **Solution:** Added an Amplify rewrite rule that serves `index.html` for non-file paths (the same job `staticwebapp.config.json` does on Azure). I also set `CI=false` so React doesn't turn build warnings into build failures.

---

## What I Learnt

- Local and production environments differ in more ways than the URL... SQL strictness, proxies, upload limits and HTTPS all behaved differently 
- Always verify an import don't assume it worked
- Configuration (API URL, allowed origins, SSL mode) belongs in environment variables so the same code deploys to several platforms

---

## Acknowledgements

Cloudinary, XAMPP/phpMyAdmin, React Icons, AWS, Azure and my lecturer Tsungai Katsuro.

## License

Distributed under the MIT License. See `LICENSE` for details.
