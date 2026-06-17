import { notifyError } from "../utils/notify";
import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import API from "../services/api";

import {
  useAuth
} from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword
  ] = useState("");

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const { data } =
          await API.post(
            "/auth/login",
            {
              email,
              password
            }
          );

        login(
          {
            id: data._id,
            fullName:
              data.fullName,
            email:
              data.email
          },
          data.token
        );

        navigate("/");
      } catch (error) {
        notifyError(
  error?.response?.data?.message ||
  "Login Failed"
);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={
          handleSubmit
        }
        className="bg-white p-8 rounded-xl shadow-md w-[400px]"
      >
        <h2 className="text-3xl font-bold mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Login
        </button>

        <p className="mt-4">
          No account?
          <Link
            to="/register"
            className="text-blue-500 ml-1"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;