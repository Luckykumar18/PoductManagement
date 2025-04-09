# Product Management Web App
## Introduction

🚀 Product Management Web App is a full-stack application that enables users to register, login, and manage a list of products with advanced features such as filtering, search, and sorting. The application includes JWT-based user authentication and basic product CRUD functionality.

## Features

### User Authentication (JWT-based)
- User Signup: Register with email and password.
- User Login: Authenticate and receive a JWT token.
- User Logout: Logout and clear JWT token from storage.
- Protected Routes: Only authenticated users can access product management routes.

### Product Management
- Create Product: Add products with details like name, description, category, price, and rating.
- View Products: Display a list of products in a table/grid format.
- Update Product: Edit product details.
- Delete Product: Remove a product from the listing.

### Product Filtering & Search
- Filtering: Filter products by category, price range, or rating.
- Search: Search products by name or description.
- Sorting: Sort products by price, rating.

## Tech Stack

### Frontend
- Framework: React.js (Functional Components with Hooks)
- Styling: Tailwind CSS 
- State Management: React Context / Local State
- Authentication: JWT (stored in localStorage or cookies)
- Routing: React Router

### Backend
- Language: TypeScript/Javascript
- Framework: NestJS/Express js
- Database: MongoDB
- Authentication: JWT Authentication Strategy

This project has two directories in it.
#BACKEND 

- *Controllers*: Handle the logic for different routes.
- *Middleware*: Custom middleware functions.
- *Models*: Mongoose schemas and models.
- *Routes*: Define the API endpoints.
- *Utils*: Utility functions and constants.

#FRONTEND

- *Components*: Reusable React components.
- *Context*: Context providers for global state management.
- *Pages*: Different pages of the application.
- *Helpers*: Helper functions for API communication.
- *Styles*: CSS and Tailwind CSS files.

## Prerequisites

Before getting started, ensure you have the following installed:
- Node.js (v14 or higher)
- npm
- MongoDB
- GIT
- React js
- express js

## Installation

### Backend Setup 

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/product-management-webapp.git
   cd product-management-webapp/backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   

3. **Configure Environment Variables:**

   Create a `.env` file in the backend folder and define the following variables (adjust values as necessary):

    PORT=3000
    MongoDBURI=mongodb+srv://Lucky:JZlVW1VHW3hWd7pu@cluster0.kpgmg85.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET=secret
    COOKIE_SECRET=secret
    CLOUD_NAME=dcy9zyveh
    CLOUD_API_KEY=175673437257839


4. **Start the Backend Server:**

   ```bash
   nodemon index.js
   ```

   The backend should now be running on `http://localhost:3000`.

### Frontend Setup (React.js)

1. **Navigate to the Frontend Folder:**

   ```bash
   cd frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   

3. **Configure API Endpoint:**

   In your frontend project, update the API base URL (for example, in an `.env` file or a configuration file):

   ```env
   REACT_APP_API_URL=http://localhost:3000/api
   ```

4. **Start the Frontend Development Server:**

   ```bash
     npm run dev
   ```

   The frontend should now be running on `http://localhost:5173` (or the default port for Create React App).

## Environment Variables

### Backend `.env` Example

```env
PORT=3000

MongoDBURI=mongodb+srv://Lucky:JZlVW1VHW3hWd7pu@cluster0.kpgmg85.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=secret

COOKIE_SECRET=secret

CLOUD_NAME=dcy9zyveh

CLOUD_API_KEY=175673437257839

CLOUD_API_SECRET=hLctSUxSUTb8htjA13ypltEEOIw
```


## Usage

1. **User Registration & Login:**  
   - Open the frontend application.
   - Sign up with an email and password.
   - Login using the registered credentials to receive and store the JWT token.

2. **Managing Products:**  
   - Once logged in, navigate to the product management section.
   - Create a new product via the form.
   - View a list of products displayed in a table/grid layout.
   - Update or delete any existing product.
   - Use provided filters and search to easily locate products.

3. **Protected Routes:**  
   - Note that any product routes are secured using JWT. If you are not authenticated, the app will redirect you to the login page.

## Bonus Features 

- **Product Image Upload:**  
  Upload product images and save file names to display on the frontend.


- Sorting:
  Sort products by attributes like price and rating.




## Future Improvements

- Enhanced Error Handling: Improve error response messages and user notifications.
- Real-Time Updates: Implement real-time product updates .
- User Profile: Add an edit profile page for users.
- Testing: Integrate unit tests and end-to-end tests for robust code quality.
- UI/UX Improvements: Enhance the overall look and feel using animations and better UI components.



Thank you for using Product Management We hope it makes your Product management experience smooth and enjoyable.
