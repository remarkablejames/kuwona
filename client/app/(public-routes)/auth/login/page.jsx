"use client";
// pages/login.js
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import the useRouter hook

function Login() {
  const router = useRouter(); // Use the useRouter hook

  const [email, setEmail] = useState("ethan@gmail.com");
  const [password, setPassword] = useState("test123");

  const loginUser = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      // Handle login error
      console.error("Login failed:", result.error);
      return;
    }

    // Check if there's a callback URL in the query parameters
    const callbackUrl = router?.query?.callback;

    // Redirect to /feed if there's no callback URL, otherwise, use the provided callback
    const destination = callbackUrl || "/feed";
    router.push(destination);
  };

  return (
    <div>
      {/* Your login form */}
      <form onSubmit={loginUser}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
