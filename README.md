# Full Stack Content Editor

A simple full-stack application built to demonstrate form handling, validation, API communication, and dynamic UI updates.  
Users can create content with a heading, rich-text paragraph, background image, and text color, and instantly preview the result.

---

## 📁 Project Structure

nidishtask/
├── client/   # React frontend  
├── server/   # Node.js + Express backend  

---

## 🚀 Features

- Interactive form with validation  
- Rich text editor (React Quill)  
- Dynamic preview section  
- Client-side and server-side validation  
- Image URL validation with accessibility check  
- Clean and responsive UI  
- User-friendly error handling  

---

## 🛠 Tech Stack

Frontend:
- React.js  
- Axios  
- React Quill  
- CSS  

Backend:
- Node.js  
- Express.js  
- Axios  

---

## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/Omrag12/nidish-fullstack-assignment.git  
cd nidishtask  

---

### 2. Start Backend

cd server  
npm install  
node server.js  

Backend runs on: http://localhost:5000  

---

### 3. Start Frontend

Open a new terminal:

cd client  
npm install  
npm start  

Frontend runs on: http://localhost:3000  

---

## 🔗 API Endpoint

POST /api/content  

### Request Body Example:

{
  "heading": "Sample Heading",
  "paragraph": "<p>Sample content</p>",
  "imageUrl": "https://example.com/image.jpg",
  "textColor": "#ffffff"
}

---

## ✅ Application Behavior

✔ On valid input:
- Data is sent to backend  
- Backend validates request  
- Preview updates dynamically  

❌ On invalid input:
- Displays clear error messages  
- Handles:
  - Missing fields  
  - Invalid HEX color  
  - Invalid or inaccessible image URL  

---

## 📌 Notes

- Image validation is handled on the backend  
- Rich text content is rendered securely in preview  
- Clean client-server architecture followed  

---

## 👨‍💻 Author

Om Raghuwanshi
