// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { adminService } from "@/api/admin";

interface User {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  date_joined?: string;
  is_active?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAdmin: boolean;
  adminStats: any;
  fetchAdminStats: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminStats, setAdminStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("access_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        // Verify token is still valid
        const userRes = await axios.get("http://localhost:8000/users/detail/", {
          headers: { Authorization: `Bearer ${storedToken}` }
        });
        
        setUser(userRes.data);
        setToken(storedToken);
        setIsAdmin(userRes.data.is_staff);
        
        if (userRes.data.is_staff) {
          await fetchAdminStats();
        }
      } catch (err) {
        console.error("Session validation failed:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const response = await adminService.getDashboardStats();
      setAdminStats(response.data);
    } catch (error) {
      console.error('Failed to fetch admin stats', error);
    }
  };

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/users/token/', {
        username,
        password,
      });
      
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      setToken(response.data.access);
      
      // Fetch current user details
      const userResponse = await axios.get('http://localhost:8000/users/detail/', {
        headers: { Authorization: `Bearer ${response.data.access}` },
      });
      
      setUser(userResponse.data);
      setIsAdmin(userResponse.data.is_staff);
      
      if (userResponse.data.is_staff) {
        await fetchAdminStats();
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed', error);
      logout();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await axios.post('http://localhost:8000/user/register/', {
        username,
        email,
        password,
      });
      await login(username, password);
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    setAdminStats(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      login, 
      register, 
      logout, 
      loading,
      isAdmin,
      adminStats,
      fetchAdminStats
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

