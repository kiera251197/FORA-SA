# 🦮 FORA SA

![FORA SA Banner](./frontend/src/assets/githubImages/FORABanner.png)

### Kiera Poley 251197

A digital home for shelter, care and community.

**FORA Connect** is a full-stack volunteer management platform for Friends of Rescued Animals South Africa (FORA SA) - a public facing site where visitors can learn about the shelter, browse volunteer opportunities and register to help out, and a staff only side with CRUD functionality where FORA's team can post announcements/opportunities, manage said announcements & opportunities (with image uploads) as well as review submitted volunteer applications.

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [How to Install](#how-to-install)
  - [File Structure](#file-structure)
- [Features and Functionality](#features-and-functionality)
- [Database / ERD](#database--erd)
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
├── backend/
│ ├── config/
│ │ ├── cloudinary.js
│ │ ├── database.js
│ │ ├── server.js
│ │ └── upload.js
│ ├── controller/
│ │ ├── announcementController.js
│ │ ├── opportunityController.js
│ │ ├── shiftController.js
│ │ ├── staffController.js
│ │ └── volunteerController.js
│ ├── models/
│ │ ├── announcementModel.js
│ │ ├── opportunityModel.js
│ │ ├── shiftModel.js
│ │ ├── staffModel.js
│ │ └── volunteerModel.js
│ ├── routes/
│ │ ├── announcementRoutes.js
│ │ ├── opportunityRoutes.js
│ │ ├── shiftRoutes.js
│ │ ├── staffRoutes.js
│ │ └── volunteerRoutes.js
│ ├── middleware/
│ │ └── requireStaffAuth.js
│ ├── scripts/
│ │ └── createStaffUser.js
│ ├── database/
│ │ └── fora_sa.sql
│ └── package.json
│
└── frontend/
├── public/
├── src/
│ ├── assets/
│ │ ├── images/
│ │ ├── icons/
│ │ └── githubImages/
│ ├── components/
│ │ ├── navbar.js
│ │ ├── footer.js
│ │ ├── staffNavbar.js
│ │ ├── staffFooter.js
│ │ ├── labelPicker.js
│ │ ├── requireStaffAuth.js
│ │ └── thankYouModal.js / .css
│ ├── pages/
│ │ ├── home.js / .css
│ │ ├── story.js / .css
│ │ ├── terms.js / .css
│ │ ├── contact.js / .css
│ │ ├── opportunities.js / .css
│ │ ├── announcements.js / .css
│ │ ├── volunteer.js / .css
│ │ └── staff/
│ │ ├── login.js / .css
│ │ ├── dashboard.js
│ │ ├── addAnnouncement.js / editAnnouncement.js
│ │ ├── manageAnnouncements.js
│ │ ├── addOpportunity.js / editOpportunity.js
│ │ ├── manageOpportunities.js
│ │ ├── volunteerApplications.js
│ │ ├── viewVolunteerApplication.js
│ │ └── staff.css
│ ├── utils/
│ │ └── staffAuth.js
│ ├── App.js
│ └── index.js
└── package.json
```

---

## Features and Functionality

coming soon...

---

## Database / ERD

![FORA SA Banner](https://github.com/kiera251197/FORA-SA/blob/b5bc89bc3c89a819f9f185c48b45fdcfbc057c9d/frontend/src/assets/githubImages/fora%20sa.png)

---

## Acknowledgements

Cloudinary, XAMPP/phpMyAdmin, React Icons and my lecturer Tsungai Katsuro.

## License

Distributed under the MIT License. See `LICENSE` for details.
