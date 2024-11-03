

Welcome to  CarryCure

This project is a user-friendly E-Pharmacy web application developed using ReactJS and Firebase. It provides users with a seamless experience for browsing and purchasing medicines online, with functionalities that cater to both customers and administrators. This project was created as part of a submission assignment, focusing on delivering an intuitive and efficient online pharmacy platform.

Features

User Features

Home Page: A central page displaying a selection of medicines, with a search bar for quick navigation.

Medicine Details: Detailed view of each medicine with information like name, price, category, manufacture date, expiry date, and availability. Users can add medicines to their cart directly from this page.

Cart Functionality: Users can view items added to their cart, adjust quantities, and proceed with their order. The Cart page has a minimalistic design with animations and glassmorphism effects.

Order History: A dedicated section for users to view their past orders, retrieved directly from the cart data.

Profile Management: Editable profile details like profile image and name, with fixed details fetched from login data.


Admin Features

Inventory Management: Admins have the ability to perform CRUD operations on medicine data to ensure accurate inventory control.


Technical Highlights

Firebase Integration: Used for user authentication, storing cart data, and managing medicine inventory.

React-Toastify: Displays notifications for user actions such as adding items to the cart or updating profile details.

Framer Motion Animations: Adds a smooth and dynamic UI experience with animations on various elements.

Location-Based Features: Includes a map section utilizing OpenStreetMap and Leaflet.js to help users locate nearby clinics, with location access requested on user interaction.

Google Meet Integration: Allows patients to schedule and attend online consultations with doctors.


Tech Stack

Frontend: ReactJS, Tailwind CSS for responsive design, and Framer Motion for animations.

Backend: Firebase (Firestore) for data storage and authentication.

APIs: OpenStreetMap API with Leaflet.js for location-based services, Google Gemini Api for chat assistance.


Installation & Setup

1. Clone the repository.


2. Install dependencies using npm install.


3. Set up Firebase and replace configuration details in the project’s Firebase setup file.


4. Run the backend with node server.js

5. Run the frontend with npm run dev.



Usage

Users can browse the home page to view medicines and navigate to the details page for more information.

Cart functionalities allow adding, removing, and viewing items, with a checkout process.

Profile and order history pages enhance the user experience by displaying personalized information and order details.

Thank You!
