# Authentication System Demo

This is a simple authentication system built with React and localStorage for demonstration purposes.

## Features

- **Login Page**: Simple form that accepts any credentials
- **Protected Routes**: All routes except `/login` require authentication
- **LocalStorage**: Authentication state is stored in browser localStorage
- **Auto-redirect**: Unauthenticated users are automatically redirected to login
- **Logout**: Logout button in navbar clears authentication and redirects to login

## How to Use

### 1. Start the Application
```bash
cd platform
npm start
```

### 2. Access the Application
- Open your browser and go to `http://localhost:3000`
- You will be automatically redirected to `/login` since you're not authenticated

### 3. Login
- Use any username and password (e.g., `demo` / `demo123`)
- The system will accept any non-empty credentials
- After successful login, you'll be redirected to the demo page

### 4. Navigate the Application
- Once authenticated, you can access all protected routes
- The demo page shows your authentication status
- Use the navbar to navigate between different sections

### 5. Logout
- Click the red "Logout" button in the top-right corner of the navbar
- This will clear your authentication and redirect you back to login

## File Structure

```
src/
├── hooks/
│   └── useAuth.ts              # Authentication hook
├── components/
│   └── ProtectedRoute.tsx      # Route protection component
├── pages/
│   ├── login/
│   │   ├── login-page.tsx      # Login form
│   │   └── index.ts
│   └── demo/
│       ├── demo-page.tsx       # Demo page showing auth status
│       └── index.ts
└── App.tsx                     # Main app with protected routes
```

## Key Components

### useAuth Hook
- Manages authentication state
- Provides `login()`, `logout()`, and `isAuthenticated` functions
- Automatically syncs with localStorage

### ProtectedRoute Component
- Wraps routes that require authentication
- Redirects unauthenticated users to login
- Shows loading spinner while checking auth status

### LoginPage Component
- Simple login form
- Accepts any non-empty credentials
- Redirects to demo page on successful login

## Demo Credentials

For testing purposes, you can use:
- **Username**: `demo`
- **Password**: `demo123`

Or any other non-empty values.

## Security Note

⚠️ **This is a demo system only!** 
- Uses localStorage (not secure for production)
- Accepts any credentials
- No server-side validation
- No encryption or secure tokens

For production use, implement proper authentication with:
- JWT tokens
- Secure HTTP-only cookies
- Server-side validation
- Password hashing
- HTTPS enforcement
