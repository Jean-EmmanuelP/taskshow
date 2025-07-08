# Contributing to TaskFlow

Thank you for considering contributing to TaskFlow! This guide will help you get started with contributing to our task management application.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Code Style](#code-style)
- [Testing](#testing)
- [Reporting Issues](#reporting-issues)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation)
- Git
- A code editor (VS Code recommended)

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/taskflow.git
   cd taskflow
   ```

3. **Set up the development environment**:
   ```bash
   # For macOS/Linux
   ./setup.sh
   
   # For Windows
   setup.bat
   ```

4. **Start the development servers**:
   ```bash
   npm run dev
   ```

## 🛠️ Making Changes

### Branch Naming

Create a new branch for your feature or fix:

```bash
git checkout -b feature/your-feature-name
git checkout -b fix/your-bug-fix
git checkout -b docs/your-documentation-update
```

### Code Organization

```
taskflow/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── contexts/          # React Context providers
│   └── api.js             # API service layer
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── middleware/    # Express middleware
│   └── env.example        # Environment template
```

### Development Guidelines

#### Frontend (React)
- Use functional components with hooks
- Implement proper error handling
- Follow React best practices
- Use Tailwind CSS for styling
- Ensure responsive design

#### Backend (Node.js/Express)
- Use async/await for asynchronous operations
- Implement proper error handling middleware
- Validate input data
- Follow RESTful API conventions
- Use appropriate HTTP status codes

#### Database (MongoDB)
- Use Mongoose for data modeling
- Implement proper schema validation
- Create appropriate indexes
- Handle connection errors gracefully

## 📝 Code Style

### General Guidelines

- Use meaningful variable and function names
- Write clear, concise comments
- Follow consistent indentation (2 spaces)
- Remove unused imports and variables
- Use ES6+ features where appropriate

### React Components

```javascript
/**
 * Component description
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Title to display
 */
const MyComponent = ({ title }) => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  return (
    <div className="component-container">
      <h1>{title}</h1>
    </div>
  );
};

export default MyComponent;
```

### API Routes

```javascript
/**
 * Route description
 * 
 * @route GET /api/resource
 * @access Public/Private
 */
const getResource = async (req, res) => {
  try {
    // Route logic
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

## 🧪 Testing

### Running Tests

```bash
# Frontend tests
npm run test

# Backend tests
cd server && npm test

# Run all tests
npm run test:all
```

### Writing Tests

- Write unit tests for utility functions
- Test API endpoints with proper mocking
- Test React components with React Testing Library
- Ensure good test coverage

## 📨 Submitting Changes

### Commit Messages

Follow conventional commit format:

```
type(scope): description

feat(auth): add user registration functionality
fix(tasks): resolve task filtering issue
docs(readme): update installation instructions
style(ui): improve button styling
refactor(api): optimize database queries
test(auth): add login endpoint tests
```

### Pull Request Process

1. **Update documentation** if needed
2. **Ensure all tests pass**
3. **Update CHANGELOG.md** if applicable
4. **Create a pull request** with:
   - Clear title and description
   - Link to related issues
   - Screenshots for UI changes
   - Testing instructions

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code is commented appropriately
- [ ] Documentation updated
```

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Clear title** and description
2. **Steps to reproduce** the issue
3. **Expected behavior**
4. **Actual behavior**
5. **Environment details** (OS, Node.js version, etc.)
6. **Screenshots** if applicable
7. **Error messages** or console output

### Feature Requests

For feature requests, please provide:

1. **Clear description** of the feature
2. **Use case** or problem it solves
3. **Proposed solution** (if you have one)
4. **Alternative solutions** considered
5. **Additional context** or examples

## 🎯 Development Focus Areas

Current development priorities:

### High Priority
- [ ] Improve test coverage
- [ ] Add more comprehensive error handling
- [ ] Implement data validation
- [ ] Optimize performance

### Medium Priority
- [ ] Add more user preferences
- [ ] Implement notifications
- [ ] Add task categories
- [ ] Improve mobile responsiveness

### Low Priority
- [ ] Add themes/dark mode
- [ ] Implement task templates
- [ ] Add export functionality
- [ ] Add calendar integration

## 📚 Resources

### Documentation
- [React Documentation](https://reactjs.org/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Documentation](https://expressjs.com)

### Tools
- [VS Code](https://code.visualstudio.com)
- [Postman](https://www.postman.com) (for API testing)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (for database management)

## 🤝 Community

### Getting Help

- Open an issue for bug reports or feature requests
- Check existing issues before creating new ones
- Join our community discussions
- Follow coding standards and best practices

### Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

## 📄 License

By contributing to TaskFlow, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to TaskFlow! 🚀 