import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../hooks/useAuth";
import { paths } from "../../../config/paths";
import { Navigate, Link, useLocation } from "react-router-dom";
import { loginSchema } from "../../../schema/user.schema";
import { Spinner } from "../../../components/ui/spinner";

export default function LoginPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo =
    searchParams.get("redirectTo") || paths.notes.list.getHref();
  const { session, login } = useAuth();

  if (session.data) {
    return <Navigate to={redirectTo} replace />;
  }

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // onSubmit handler
  const onSubmit = async (values) => {
    await login.mutateAsync(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="max-w-md w-full bg-bg rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
          <p className="mt-2 text-muted">Please login to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full px-4 py-3 rounded border border-border bg-surface text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full px-4 py-3 rounded border border-border bg-surface text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-medium rounded hover:bg-primary/90 transition"
            disabled={login.isLoading}
          >
            {login.isLoading ? "Logging in..." : "Log In"}
          </button>

          {/* Error Feedback */}
          {login.isError && (
            <p className="mt-3 text-center text-sm text-red-500">
              {login.error?.response?.data?.message ||
                "Login failed. Please try again."}
            </p>
          )}
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-muted">
          Don&rsquo;t have an account?{" "}
          <Link
            to={paths.auth.register.getHref(redirectTo)}
            className="text-primary hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
