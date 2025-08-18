# E-commerce Frontend

A React-based e-commerce frontend application built with Vite, TypeScript, Redux Toolkit, React Query, and React Router.

## 🚀 Deployment to Netlify

### Prerequisites
- Node.js 18+ installed
- Git repository set up
- Netlify account

### Environment Variables
Make sure to set these environment variables in your Netlify dashboard:

```
VITE_API_BASE_URL=https://your-backend-url.com/api/v1
```

### Deployment Steps

#### Option 1: Deploy via Netlify UI (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with your GitHub account
   - Click "New site from Git"
   - Choose your repository

3. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

4. **Set Environment Variables**
   - Go to Site settings > Environment variables
   - Add `VITE_API_BASE_URL` with your backend URL

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete

#### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Netlify**
   ```bash
   netlify init
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Build Configuration

The project includes:
- `netlify.toml` - Netlify configuration
- Optimized Vite build settings
- SPA routing support
- Security headers
- Asset caching

### Post-Deployment

1. **Update Backend CORS**
   - Ensure your backend allows requests from your Netlify domain
   - Add your Netlify URL to CORS origins

2. **Test the Application**
   - Verify all routes work correctly
   - Test authentication flow
   - Check API connectivity

### Troubleshooting

- **Build fails**: Check Node.js version (should be 18+)
- **404 errors**: Ensure `netlify.toml` redirects are in place
- **API errors**: Verify environment variables are set correctly
- **CORS errors**: Update backend CORS configuration

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── services/      # API services
├── store/         # Redux store
├── hooks/         # Custom hooks
├── utils/         # Utility functions
├── types/         # TypeScript types
└── constants/     # App constants
```

## 🔧 Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Query** - Server state management
- **React Router** - Routing
- **Axios** - HTTP client
- **Formik + Yup** - Form handling
- **Socket.IO** - Real-time features

