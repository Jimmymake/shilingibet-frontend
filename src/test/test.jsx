import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";

const authService = new AuthService();
   // adjust path

const UserBalance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = authService.getToken(); // 👈 GET TOKEN HERE

    if (!token) {
      setError("No auth token found");
      setLoading(false);
      return;
    }

    fetch("https://api.ganjibets.com/api/v1/user/getUserBalance", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // 👈 FEED TOKEN
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch balance");
        return res.json();
      })
      .then((data) => {
        setBalance(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading balance...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>User Balance</h2>
      <pre>{JSON.stringify(balance, null, 2)}</pre>
    </div>
  );
};

export default UserBalance;
