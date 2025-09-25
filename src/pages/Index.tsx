import { useState } from 'react';
import { Login } from '@/components/auth/Login';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { User, UserType } from '@/types';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>('admin');

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <Login 
        onLogin={handleLogin} 
        userType={userType} 
        setUserType={setUserType} 
      />
    );
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
};

export default Index;
