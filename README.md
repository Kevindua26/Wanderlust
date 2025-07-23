# Wanderlust

Wanderlust is a full-stack web application inspired by Airbnb, built with Node.js, Express, MongoDB, and EJS templating. This project is the result of my journey to learn, build, and share in public, reflecting my passion for creating real-world applications and growing as a developer.

## ✨ About the Project

Wanderlust replicates the core functionality of Airbnb, allowing users to book unique places to stay, host their own listings, and manage reservations. The project is shaped by my commitment to learning in public—sharing not only my successes but also the roadblocks and lessons encountered along the way.

## 🚀 Features

- User authentication and profile management (in progress)
- Browse available stays and detailed property pages
- Host dashboard for listing management
- Booking and reservation system (in progress)
- Reviews and ratings (with flash messages)
- Responsive, modern UI with Bootstrap
- Error handling with custom ExpressError utility
- Flash messages for user feedback

## 🛠️ Tech Stack

- **Frontend:** EJS (Embedded JavaScript Templates), Bootstrap, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** Passport.js (in progress)
- **Cloud & Storage:** (To be implemented)

## 🤝 Learning in Public

Wanderlust represents my journey of building in public. By documenting my progress, sharing code, and detailing challenges, I hope to motivate others, give back to the community, and continue growing as a developer.

<!-- ## 📸 Screenshots

Add screenshots or GIFs here
![Home Page](screenshots/homepage.png)
![Listing Page](screenshots/listing.png) -->

## 🧑‍💻 Getting Started

To run Wanderlust locally, follow these steps:

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or Atlas cloud)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Kevindua26/Wanderlust.git
   cd Wanderlust
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```
   MONGO_URL=your_mongodb_connection_string
   PORT=8080
   ```

4. **Initialize the database with sample data**

   ```bash
   node init/index.js
   ```

5. **Run the application**

   ```bash
   npm start
   # or for development with auto-restart
   nodemon app.js
   ```

6. **Visit the app**

   Open [http://localhost:8080](http://localhost:8080) in your browser.

## 🗃️ Folder Structure

```
Wanderlust/
  ├── init/
  │   ├── data.js
  │   └── index.js
  ├── models/
  │   ├── listing.js
  │   └── review.js
  ├── public/
  │   ├── assets/
  │   ├── css/
  │   └── js/
  ├── routes/
  │   ├── listing.js
  │   ├── listings.js
  │   └── review.js
  ├── utils/
  │   ├── ExpressError.js
  │   └── WrapAsync.js
  ├── views/
  │   ├── includes/
  │   ├── layouts/
  │   └── listings/
  ├── app.js
  ├── package.json
  ├── schema.js
  └── README.md
```

- `init/` — Database initialization scripts and sample data
- `models/` — MongoDB models using Mongoose
- `public/` — Static files (CSS, JS, images)
- `routes/` — Express route handlers
- `utils/` — Utility functions and error handling
- `views/` — EJS templates and layouts

## 🙌 Acknowledgements

- Inspired by [Airbnb](https://www.airbnb.com/)
- Thanks to the open-source community for libraries, tutorials, and inspiration

## 📚 License

[MIT](https://github.com/Kevindua26/Wanderlust/blob/main/LICENSE)

---

**Learning in public is the best way to grow—thank you for visiting Wanderlust!**
