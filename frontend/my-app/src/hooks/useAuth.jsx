import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const useAuth = (requiredRole) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user || user.role !== requiredRole) {
      navigate('/unauthorized');
    }
  }, [user, requiredRole, navigate]);

  return user && user.role === requiredRole;
};

export default useAuth;
