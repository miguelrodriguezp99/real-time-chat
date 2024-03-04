import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("authUser", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
