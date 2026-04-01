# Frontend Technical Assessment - React + TypeScript

A production-ready React + TypeScript web application demonstrating advanced frontend engineering practices. This submission includes a complete authentication flow, protected routing, and a sophisticated products data table with filtering, sorting, draggable columns, and detailed product modals.

## 🎯 Project Overview

This is a technical assessment submission showcasing professional frontend development skills. The application features:

- **Authentication System**: Secure login with token-based authentication
- **Protected Routing**: Route guards ensuring only authenticated users access protected pages
- **Responsive Products Table**: Advanced table with multiple interactive features
- **Modern React Patterns**: Functional components, hooks, and context API
- **TypeScript**: Strict typing throughout the codebase
- **Professional UI**: Clean, polished design using shadcn/ui and Tailwind CSS

## 🏗️ Tech Stack

- **React 19**: Latest React with modern hooks
- **TypeScript 5.6**: Strict type safety
- **Vite**: Lightning-fast build tool
- **React Router (Wouter)**: Lightweight routing
- **Tailwind CSS 4**: Utility-first styling
- **shadcn/ui**: High-quality component library
- **Lucide React**: Beautiful icon library
- **React Hook Form**: Efficient form handling
- **Zod**: Schema validation

## 📁 Project Structure

```
frontend_assessment/
├── client/
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── LoginForm.tsx          # Login form with validation
│   │   │   ├── table/
│   │   │   │   ├── ProductsTable.tsx      # Main table component
│   │   │   │   ├── TableColumnFilter.tsx  # Column filter inputs
│   │   │   │   └── DraggableColumnHeader.tsx  # Draggable headers
│   │   │   ├── modal/
│   │   │   │   └── ProductDetailsModal.tsx    # Product details modal
│   │   │   ├── ui/                        # shadcn/ui components
│   │   │   └── ErrorBoundary.tsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx            # Authentication context
│   │   │   └── ThemeContext.tsx           # Theme management
│   │   ├── routes/
│   │   │   ├── ProtectedRoute.tsx         # Protected route wrapper
│   │   │   └── PublicRoute.tsx            # Public route wrapper
│   │   ├── services/
│   │   │   ├── authService.ts             # Auth API calls
│   │   │   └── productService.ts          # Product API calls
│   │   ├── types/
│   │   │   ├── auth.ts                    # Auth types
│   │   │   └── product.ts                 # Product types
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx              # Login page
│   │   │   ├── DashboardPage.tsx          # Dashboard page
│   │   │   └── NotFound.tsx               # 404 page
│   │   ├── App.tsx                        # Main app component
│   │   ├── main.tsx                       # React entry point
│   │   └── index.css                      # Global styles
│   └── index.html
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The development server will start at `http://localhost:3000/`

## 🔐 Authentication Flow

### Login Process

1. User enters credentials on the login page
2. Credentials are sent to `POST https://dummyjson.com/auth/login`
3. API returns authentication token and user data
4. Token and user data are stored in localStorage
5. User is redirected to the dashboard

### Test Credentials

```
Username: emilys
Password: emilyspass
```

### Token Management

- Tokens are persisted in localStorage with key `auth_token`
- User data is persisted with key `auth_user`
- On page refresh, auth state is restored from localStorage
- Logout clears all auth data

### Protected Routes

- **Login Page** (`/login`): Redirects authenticated users to dashboard
- **Dashboard** (`/dashboard`): Requires authentication; redirects unauthenticated users to login
- **Root** (`/`): Redirects to login for unauthenticated users, dashboard for authenticated users

## 📊 Products Table Features

### 1. Column Filtering

- Independent filters for each filterable column (ID, Title, Category, Brand)
- Real-time filtering as user types
- Clear button for each filter
- "Clear All Filters" button to reset all filters at once
- Maintains filter state while sorting

### 2. Sorting

- Click column header to toggle sort order (ascending → descending → none)
- Visual indicators show current sort state
- Sorting works with filtered results
- Supports numeric and string sorting

### 3. Draggable Columns

- Drag column headers to reorder them
- Visual feedback during drag operations
- Smooth animations and transitions
- Column order persists during the session
- Intuitive grip handle appears on hover

### 4. Row Details Modal

- Click any table row to open detailed product view
- Modal displays comprehensive product information:
  - Product image
  - Full description
  - Pricing and discount information
  - Rating and stock levels
  - Category, brand, and SKU
  - Dimensions and weight
  - Warranty and shipping information
  - Return policy
  - Tags
- Close modal with close button, overlay click, or Escape key
- Fully responsive and accessible

### 5. Responsive Design

- **Mobile**: Horizontal scrolling with readable font sizes
- **Tablet**: Optimized layout with proper spacing
- **Desktop**: Full-width table with enhanced interactions
- Mobile-first approach throughout
- Touch-friendly filter inputs and buttons

## 🎨 Design Decisions

### Architecture

- **Context API**: Used for global authentication state management
- **Service Layer**: Separated API calls into dedicated service files
- **Component Composition**: Modular, reusable components
- **Type Safety**: Strict TypeScript throughout

### Styling

- **Tailwind CSS**: Utility-first approach for consistency
- **shadcn/ui**: Pre-built, accessible components
- **Custom Styling**: Minimal custom CSS, leveraging Tailwind tokens
- **Dark Mode Ready**: Theme system in place for future dark mode support

### Performance

- Memoized filtering and sorting with `useMemo`
- Efficient state management to prevent unnecessary re-renders
- Lazy loading of product details modal
- Optimized re-renders with proper dependency arrays

## 🔄 State Management

### Authentication State

Managed via `AuthContext`:
- `user`: Current authenticated user
- `token`: Authentication token
- `isAuthenticated`: Boolean flag
- `isLoading`: Loading state during login
- `error`: Error messages

### Table State

Managed locally in `ProductsTable`:
- `columns`: Current column order
- `filters`: Active filters per column
- `sortColumn`: Currently sorted column
- `sortOrder`: Sort direction (asc/desc)
- `selectedProduct`: Product selected for modal
- `isModalOpen`: Modal visibility

## 🧪 Testing Credentials

The application uses the DummyJSON API for demonstration:

- **Login Endpoint**: `https://dummyjson.com/auth/login`
- **Products Endpoint**: `https://dummyjson.com/products`

Test with:
```
Username: emilys
Password: emilyspass
```

## ♿ Accessibility

- Proper semantic HTML with form labels
- Keyboard navigation throughout
- Focus styles on interactive elements
- ARIA labels where appropriate
- Modal accessibility with focus management
- Screen reader friendly

## 📱 Responsive Behavior

### Mobile (< 640px)

- Single-column filter layout
- Horizontal table scrolling
- Touch-friendly buttons and inputs
- Optimized modal sizing

### Tablet (640px - 1024px)

- Two-column filter layout
- Improved spacing
- Readable font sizes

### Desktop (> 1024px)

- Four-column filter layout
- Full-width table
- Enhanced hover states
- Optimal spacing and typography

## 🛠️ Development Notes

### Code Quality

- Clean, readable code with meaningful names
- Minimal comments on obvious code
- Strategic comments on complex logic
- No console errors or warnings
- Proper error handling throughout

### Best Practices

- Functional components with hooks
- Custom hooks for reusable logic
- Separation of concerns
- DRY principle applied throughout
- Proper TypeScript typing

### Error Handling

- User-friendly error messages
- Graceful fallbacks for failed API calls
- Loading states for async operations
- Empty states for no data scenarios

## 📦 Dependencies

Key dependencies:
- `react`: UI library
- `react-dom`: React DOM rendering
- `wouter`: Lightweight routing
- `@radix-ui/*`: Accessible component primitives
- `tailwindcss`: Utility CSS framework
- `lucide-react`: Icon library
- `zod`: Schema validation
- `react-hook-form`: Form state management

## 🚢 Deployment

The application is built with Vite and can be deployed to any static hosting:

```bash
# Build for production
pnpm build

# Output in dist/ directory
```

### Deployment Platforms

- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📝 Assumptions & Tradeoffs

### Assumptions

1. **API Availability**: Assumes DummyJSON API is always available
2. **Token Format**: Assumes API returns token in `accessToken` field
3. **Product Data**: Assumes products API returns consistent data structure
4. **localStorage**: Assumes browser supports localStorage for token persistence

### Tradeoffs

1. **Token Refresh**: Not implemented (assumes tokens don't expire during session)
2. **Pagination**: Not implemented (loads all products at once)
3. **Real-time Updates**: Not implemented (static data load)
4. **Offline Support**: Not implemented (requires online connection)
5. **Dark Mode**: Theme system in place but not fully implemented

## 🎓 Learning Outcomes

This project demonstrates:

- ✅ Advanced React patterns and hooks
- ✅ TypeScript strict mode
- ✅ Authentication and authorization
- ✅ Protected routing
- ✅ State management with Context API
- ✅ Advanced table features (filtering, sorting, dragging)
- ✅ Modal implementation
- ✅ Responsive design
- ✅ Component composition
- ✅ Error handling
- ✅ Accessibility best practices
- ✅ Professional code organization

## 📄 License

MIT

---

**Built with ❤️ as a technical assessment submission**
