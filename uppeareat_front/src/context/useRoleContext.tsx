import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'user' | 'admin';

interface UserRoleContextType {
  role: UserRole;
  setRole: React.Dispatch<React.SetStateAction<UserRole>>;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(
  undefined,
);

export const UserRoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<UserRole>('admin');

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRoleContext = (): UserRoleContextType => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error(
      'useUserRoleContext should be used inside UserRoleProvider',
    );
  }
  return context;
};
