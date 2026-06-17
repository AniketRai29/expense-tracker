import {
  notifySuccess,
  notifyError
} from "../utils/notify";
import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import API from "../services/api";

const Register = () => {
  const navigate =
    useNavigate();

  const [
    fullName,
    setFullName
  ] = useState("");

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword
  ] = useState("");

  const registerUser =
    async (e) => {
      e.preventDefault();

      try {
        await API.post(
          "/auth/register",
          {
            fullName,
            email,
            password
          }
        );

        notifySuccess("Registration Successful");

        navigate("/login");
      } catch (error) {
        notifyError(
  error?.response?.data?.message ||
  "Error"
);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={
          registerUser
        }
        className="bg-white p-8 rounded-xl shadow-md w-[400px]"
      >
        <h2 className="text-3xl font-bold mb-6">
          Register
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded mb-4"
          value={fullName}
          onChange={(e) =>
            setFullName(
              e.target.value
            )
          }
        />

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
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Register
        </button>

        <p className="mt-4">
          Already have account?
          <Link
            to="/login"
            className="text-blue-500 ml-1"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;