import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../hooks/useAuth";
import { paths } from "../../../config/paths";
import { Navigate, Link, useLocation } from "react-router-dom";
import { registerSchema } from "../../../schema/user.schema";

export default function RegisterPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo =
    searchParams.get("redirectTo") || paths.notes.list.getHref();
  const { session, register: registerMutation } = useAuth();

  // If already signed in, redirect
  if (session.data) {
    return <Navigate to={redirectTo} replace />;
  }

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  // onSubmit handler
  const onSubmit = async (values) => {
    await registerMutation.mutateAsync(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="max-w-md w-full bg-bg rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Create Account</h1>
          <p className="mt-2 text-muted">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="w-full px-4 py-3 rounded border border-border bg-surface text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

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
            disabled={registerMutation.isLoading}
          >
            {registerMutation.isLoading ? "Registering..." : "Sign Up"}
          </button>

          {/* Error Feedback */}
          {registerMutation.isError && (
            <p className="mt-3 text-center text-sm text-red-500">
              {registerMutation.error?.response?.data?.message ||
                "Registration failed. Please try again."}
            </p>
          )}
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            to={paths.auth.login.getHref(redirectTo)}
            className="text-primary hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
