# 🛒 Product Management CRUD Application

A modern, full-stack **MERN (MongoDB, Express, React, Node.js)** CRUD (Create, Read, Update, Delete) application for managing products. This application features a responsive frontend, custom UI interactions, category filtering, live search functionality, toast notifications, and a light/dark theme toggle.

---

## 🚀 Key Features

* **Full CRUD Operations:** Create, retrieve, edit, and delete products from the interface.
* **Search & Filter:** Search products by name (case-insensitive search) and filter by category (e.g., Electronics, Clothing, Home, etc.) with real-time results.
* **Dynamic Modals & UI:** Modal-based product forms for creating and editing products.
* **Dual Theme Support:** Smooth transition between **Dark Mode** and **Light Mode**.
* **Toast Notifications:** Customized popup alerts (toasts) for success and error actions.
* **Responsive Layout:** Completely responsive design built with optimized, custom Vanilla CSS.
* **Data Validation:** Backend Mongoose model validation to ensure price and quantity are positive, and required fields are present.

---

## 🛠️ Tech Stack

### Frontend
* **React 19:** Functional components, hooks (`useState`, `useEffect`), and reactive state management.
* **Vite:** High-performance, fast dev server and bundler.
* **Vanilla CSS:** Custom modular styles designed for rich look and feel, responsive layout, animations, and transitions.

### Backend
* **Node.js & Express:** Lightweight, robust backend API layer.
* **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
* **CORS:** Cross-Origin Resource Sharing enabled for secure communication with the client.
* **Dotenv:** Secure environment variable management.
* **Nodemon:** Auto-restarting development server.

### Database
* **MongoDB:** Document-oriented database for storing product records.

---

## 📂 Project Structure

```text
CRUD-App/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── assets/         # App assets
│   │   ├── components/     # Reusable React components (Navbar, ProductCard, ProductModal, Toast)
│   │   ├── App.css         # Component-specific styles
│   │   ├── App.jsx         # Main React application component (states, endpoints, fetching)
│   │   ├── index.css       # Core design system styles (colors, layout, theme definitions)
│   │   └── main.jsx        # App entry point
│   ├── index.html          # HTML Shell
│   ├── package.json        # Frontend dependencies and scripts
│   └── vite.config.js      # Vite configuration
│
├── server/                 # Express Backend
│   ├── config/
│   │   └── db.js           # MongoDB connection utility
│   ├── controllers/
│   │   └── productController.js # CRUD handlers logic
│   ├── models/
│   │   └── Product.js      # Mongoose Schema & validation logic
│   ├── routes/
│   │   └── productRoutes.js# REST endpoints routes mapping
│   ├── .env                # Environment configuration variables
│   ├── package.json        # Backend dependencies and scripts
│   └── server.js           # Server starter file (middlewares, routing, ports)
│
└── README.md               # Documentation (This file)
```

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v16.x or higher recommended)
* [MongoDB Community Server](https://www.mongodb.com/try/download/community) (running locally) or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account.

---

### Step 1: Set Up and Run the Backend Server

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the `server/` directory and configure the environment variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/crud_app
   ```
   * *Note: Replace the `MONGO_URI` with your MongoDB Atlas connection string if you are using cloud database hosting.*

4. Run the backend server in development mode (with Nodemon):
   ```bash
   npm run dev
   ```
   The backend will start running on [http://localhost:5000](http://localhost:5000).

---

### Step 2: Set Up and Run the Frontend Client

1. Open a new terminal tab/window and navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will start running on [http://localhost:5173](http://localhost:5173). Open this URL in your web browser.

---

## 🔌 API Endpoints Reference

The backend API exposes the following RESTful routes:

| Method | Endpoint | Description | Query Parameters / Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/products` | Retrieve all products | Optional Query: `?search=name&category=categoryName` |
| **GET** | `/api/products/:id` | Retrieve detailed info of a single product | Required: `:id` in URL |
| **POST** | `/api/products` | Add/Create a new product | Required JSON Body: `name`, `price`, `category`, `quantity`, `imageUrl`, `description` |
| **PUT** | `/api/products/:id` | Update an existing product | Required: `:id` in URL, JSON Body of fields to update |
| **DELETE** | `/api/products/:id` | Delete a product | Required: `:id` in URL |

### Example Product Schema JSON
```json
{
  "name": "Wireless Mechanical Keyboard",
  "price": 89.99,
  "category": "Electronics",
  "quantity": 15,
  "imageUrl": "https://example.com/keyboard.jpg",
  "description": "RGB backlight hot-swappable gaming mechanical keyboard with brown switches."
}
```

---

## 🎨 Theme Configuration & Styles
* **Light Theme:** Enabled by appending the `.light-theme` class to the HTML/Body element (managed through the theme state toggle in the navbar).
* **Dark Theme (Default):** Standard UI mode using custom variables in [index.css](file:///c:/Projects/CRUD-App/client/src/index.css) to support soft dark gradients, glowing borders, and readable text contrasts.

---

## 📄 License
This project is open-source and available under the ISC License.
