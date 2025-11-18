# API Integration Demo

This project demonstrates key concepts for integrating with external APIs in React applications.

## Getting Started

### Installation

First, install the project dependencies:

```bash
npm install
```

### Running the App

Start the development server:

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000) in your browser.

The page will reload automatically when you make changes to the code.

## Lesson Plan

This project covers four fundamental topics for working with APIs:

### 1. Request Structure (Body, Method Type, Headers)

Understanding HTTP methods (GET, POST, PUT, DELETE), request headers (`Content-Type`, `Authorization`), request bodies (JSON format), and URL parameters. Learn when to use each method and how to properly structure requests with headers and data.

---

### 2. Fetch and Async/Await

Using the Fetch API to make HTTP requests with async/await syntax. Learn to handle promises, parse JSON responses, manage errors with try/catch blocks, and implement loading states.

---

### 3. Environment Variables

Securely storing API keys and configuration in `.env` files. Learn to use `process.env` in React, set up environment-specific configs, and understand security best practices (never committing secrets to version control).

---

### 4. SDKs (Software Development Kits)

Pre-built libraries that simplify API integration (e.g., Google OAuth SDK, Stripe SDK). Learn when to use SDKs vs. direct API calls, how to install and configure SDK packages via npm, and the trade-offs between using SDK methods and custom fetch implementations.

---

## Project Structure

```
src/
├── App.js              # Main application component
├── api/
│   ├── ChatGPT.js      # ChatGPT API integration
│   └── GoogleLogin.js  # Google OAuth integration
└── ...
```

## Next Steps

After completing these lessons, you'll be able to:
- Make API calls from any React application
- Securely manage API keys and configuration
- Choose between SDKs and direct API integration
- Handle asynchronous operations cleanly
- Build production-ready API integrations
