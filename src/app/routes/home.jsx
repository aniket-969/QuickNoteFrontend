import { Navigate } from "react-router-dom";
import { paths } from "../paths";

export function HomeRedirector() {
  let raw = localStorage.getItem("session");
  let session = raw ? JSON.parse(raw) : null;

  return session
    ? <Navigate to={paths.notes.list.path} replace />
    : <Navigate to={paths.auth.login.path} replace />;
}
