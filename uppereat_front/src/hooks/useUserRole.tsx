import { useUserRoleContext } from '@/context/useRoleContext';

export const useUserRole = () => {
  const { role, setRole } = useUserRoleContext();

  const isAdmin = role === 'admin';

  return { role, setRole, isAdmin };
};
