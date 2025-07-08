# TaskFlow - MERN Stack Task Management Application

A modern, responsive task management application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, task filtering, and admin user management.

## 🚀 Features

### ✅ Completed Tasks

**Task 1: Authentication & Landing Page**
- Users must login before accessing the application
- Landing page with login/register functionality
- Only Dashboard tab visible when logged out
- Role-based redirection (Admin/User dashboards)

**Task 2: Task Filtering**
- Filter tasks by completion status (All/Complete/Incomplete)
- Search tasks by title and description
- Real-time filtering with live results
- Task count display for each filter

**Task 3: Admin User Log Management**
- User activity logs with login/logout times
- JWT token tracking
- User role and IP address logging
- Admin DELETE functionality for log entries
- Sortable and filterable log table

## 🛠️ Technology Stack

- **Frontend**: React.js with Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context API
- **Icons**: React Icons (Font Awesome)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local installation)

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

#### For macOS/Linux:
```bash
# Clone the repository
git clone <repository-url>
cd taskflow

# Make setup script executable and run it
chmod +x setup.sh
./setup.sh
```

#### For Windows:
```cmd
# Clone the repository
git clone <repository-url>
cd taskflow

# Run the setup script
setup.bat
```

### Option 2: Manual Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskflow
   ```

2. **Setup Backend**
   ```bash
   cd server
   cp env.example .env
   npm install
   cd ..
   ```

3. **Setup Frontend**
   ```bash
   npm install
   # Create .env.local file with:
   # VITE_API_URL=http://localhost:5000
   # VITE_APP_NAME=TaskFlow
   # VITE_NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # Start backend (in one terminal)
   cd server
   npm run dev

   # Start frontend (in another terminal)
   npm run dev
   ```

## 🎯 Usage

### Starting the Application

After setup, you can start the application using:

```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:frontend  # Frontend only
npm run dev:backend   # Backend only
```

### Application URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### Authentication

The application starts with a clean slate - no demo data. You can:
1. Register new users through the signup page
2. Login with registered credentials
3. Access role-based dashboards (Admin/User)

### Task Management

- **Create Tasks**: Add new tasks with title, description, priority, and due date
- **Filter Tasks**: Use the Task Filter component to search and filter tasks
- **Update Tasks**: Mark tasks as complete/incomplete, edit task details
- **Delete Tasks**: Remove tasks from the system

### Admin Features

- **User Management**: View and manage all users
- **User Logs**: Monitor user activity with detailed logs
- **Log Management**: Delete log entries and filter by user roles
- **Task Oversight**: View and manage all tasks in the system

## 📁 Project Structure

```
taskflow/
├── src/                          # Frontend source code
│   ├── components/
│   │   ├── auth/                # Authentication components
│   │   ├── tasks/               # Task management components
│   │   └── common/              # Shared components
│   ├── pages/
│   │   ├── AdminPages/          # Admin-specific pages
│   │   ├── UserPages/           # User-specific pages
│   │   └── Landing.jsx          # Landing page
│   ├── contexts/                # React Context providers
│   └── api.js                   # API configuration
├── server/                       # Backend source code
│   ├── src/
│   │   ├── models/              # MongoDB models
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Express middleware
│   │   └── index.js             # Server entry point
│   ├── env.example              # Environment variables template
│   └── package.json             # Backend dependencies
├── setup.sh                     # Linux/macOS setup script
├── setup.bat                    # Windows setup script
└── README.md                    # This file
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=TaskFlow
VITE_NODE_ENV=development
```

## 🧪 Testing

The application includes comprehensive logging and error handling:

1. **Authentication Testing**: Login/logout functionality with JWT tokens
2. **Task Management**: CRUD operations with real-time updates
3. **Admin Features**: User management and log tracking
4. **Filter Testing**: Search and filter functionality across components

## 📝 Available Scripts

```bash
# Setup and installation
npm run setup          # Run automated setup
npm run install:all    # Install all dependencies

# Development
npm run dev            # Start both frontend and backend
npm run dev:frontend   # Start frontend only
npm run dev:backend    # Start backend only

# Maintenance
npm run clean          # Clean node_modules and env files
```

## 🔒 Security Features

- JWT-based authentication
- Protected routes with role-based access
- Input validation and sanitization
- CORS configuration
- Secure password handling

## 🎨 UI/UX Features

- Responsive design for all screen sizes
- Clean, modern interface with Tailwind CSS
- Real-time updates and notifications
- Intuitive navigation and user experience
- Accessibility support with ARIA attributes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally
   - Check MONGO_URI in .env file

2. **Port Already in Use**
   - Kill existing processes on ports 5000 and 5173
   - Or change ports in configuration files

3. **Module Not Found**
   - Run `npm install` in both root and server directories
   - Clear node_modules and reinstall if needed

### Getting Help

If you encounter issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check environment variables are set correctly

## 🏆 Acknowledgments

- Built with modern React patterns and best practices
- Follows RESTful API design principles
- Implements secure authentication standards
- Uses industry-standard development tools

---

**Happy coding! 🚀**