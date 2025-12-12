import { Navigate, Outlet, useLocation } from 'react-router-dom'
import auth from '../utils/auth'

const ProtectedRoute = () => {
  const location = useLocation()
  if (!auth.isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <Outlet />
}

export default ProtectedRoute
