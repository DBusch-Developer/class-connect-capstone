import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { authLogin } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Add error state

  const { loading, isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && user.token) {
      //Navigate to dashboard
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validation

    if (loginForm.username === "" || loginForm.password === "") {
      setError("Please enter both username and password.");
    } else {
      setError(""); // Clear previous errors
      dispatch(authLogin({ ...loginForm }))
        .unwrap()
        .catch(() => {
          setError("Incorrect username or password.");
        });
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="blog-bg py-5 px-10 mx-auto mt-10 mb-10 max-w-2xl lg:py-16 shadow rubik text-[#6ecfd5]">
        <h2 className="pt-10 pb-7 flex numans mb-4 text-3xl font-med ">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="user-name"
                className="block mb-2 text-15 font-medium text-[#6ecfd5] "
              >
                User Name
              </label>

              <input
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                type="text"
                name="user-name"
                id="user-name"
                className=" bg-neutral-300 border border-gray-300 text-black placeholder:text-gray-500 text-15 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder=""
                required="required"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="block mb-2 text-15 font-medium text-[#6ecfd5] "
              >
                Password
              </label>

              <input
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                type="password"
                name="password"
                id="password"
                className=" bg-neutral-300 border border-gray-300 text-black placeholder:text-gray-500 text-15 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="••••••••"
                required="required"
              />
            </div>

            <div className="sm:col-span-2 flex justify-center space-x-6">
              <button
                type="submit"
                className="numans inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-md font-med text-center  black  rounded-lg text-black font-bold bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc]  rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
        {error && (
          <div className="mt-10 text-red-500 text-center font-bold">
            {error}
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
