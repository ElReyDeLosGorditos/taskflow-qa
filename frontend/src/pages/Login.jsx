import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", form);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.email?.[0] ||
        "Login failed."
      );
    }
  };

  return (
    <AuthLayout
        title="TaskFlow QA"
        subtitle="Sign in to continue"
        footer={
        <>
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
            Register
            </Link>
        </>
        }
    >
        <form onSubmit={handleSubmit} className="space-y-5">
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
            </label>
            <input
            data-testid="login-email"
            type="email"
            name="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
        </div>

        <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
            </label>
            <input
            data-testid="login-password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
        </div>

        {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
            </div>
        )}

        <button
            data-testid="login-button"
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
        >
            Login
        </button>
        </form>
    </AuthLayout>
    );
}