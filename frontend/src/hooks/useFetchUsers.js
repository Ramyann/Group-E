// hooks/useFetchUsers.js
import { useState, useEffect } from "react";

// Simple helper to handle API responses
async function handleApiResponse(response) {
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("user"); // Side effect: clear user on auth failure
      throw new Error("Authorization failed. Please log in again.");
    }
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      // If response is not JSON (e.g., plain text error)
      throw new Error(`HTTP error ${response.status}`);
    }
    throw new Error(errorData?.error || `HTTP error ${response.status}`);
  }
  return response.json();
}

export function useFetchUsers(token) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUsers([]);
    setError(null);
    setIsLoading(false);

    if (!token) {
      setError("Not logged in. Please log in to view users.");
      return;
    }

    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/user/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await handleApiResponse(response);
        setUsers(
          Array.isArray(data)
            ? data.map((user) => ({ ...user, key: user._id || user.email }))
            : []
        ); // Ensure keys for Table
      } catch (fetchError) {
        console.error("Failed to fetch users:", fetchError);
        setError(fetchError.message || "Failed to load user data.");
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  return { users, isLoadingUsers: isLoading, userFetchError: error };
}
