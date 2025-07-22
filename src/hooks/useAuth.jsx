import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  register,
  login,
  logOut ,
  fetchSession} from './../api/queries/auth';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  
const navigate = useNavigate()
  const queryClient = useQueryClient();

  // — Session
  const sessionQuery = useQuery({
    queryKey: ["auth", "session"],
    queryFn: fetchSession,
     initialData: () => {
      const raw = localStorage.getItem("session");
      return raw ? JSON.parse(raw) : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: 30 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to fetch session");
    },
  });

  // — Register
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      //console.log(data)
      toast.success("Registration successful!");
      navigate('/login')
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
      console.error("Registration failed:", err);
    }, 
  });

  // — Login
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
     console.log(data?.data)
     localStorage.setItem("session", JSON.stringify(data?.data));
     toast.success("loggedin successfully!");
      navigate("/")
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Invalid credentials");
      console.error("Login error:", err);
    },
  });

  // — Logout
  const logoutMutation = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.setQueryData(["auth", "session"], null);
      localStorage.removeItem("session");
      navigate("/login")
      toast.success("Logged out successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Logout failed");
      console.error("Logout error:", err);
    },
  });
 
  return {
    session: sessionQuery,
    register: registerMutation,
    login: loginMutation,
    logout: logoutMutation,
  };
};
