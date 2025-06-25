import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userGetAll } from "../redux/userSlice";
import { userCreate } from "../redux/userSlice";
import { toast } from "react-toastify";

const UserCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.users);

  const [signUpForm, setSignUpForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
    confirmPassword: "",
    avatar: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    dispatch(userGetAll());
  }, []);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleProfilePhotoUpload = async (e) => {
    console.log("handleFile", e);
    if (e.target.files) {
      const testString64 = await toBase64(e.target.files[0]);
      setSignUpForm({ ...signUpForm, avatar: testString64 });
      console.log(testString64);
      setAvatarFile(e.target.files[0]); // Store the file for potential future use
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let checkUsername = users
      .filter((user) => user.username === signUpForm.username)
      .map((user) => {
        return user.username;
      })
      .join();

    if (
      signUpForm.confirmPassword === signUpForm.password &&
      checkUsername !== signUpForm.username
    ) {
      let userForm = {
        firstName: signUpForm.firstName,
        lastName: signUpForm.lastName,
        username: signUpForm.username,
        password: signUpForm.password,
        role: signUpForm.role,
        avatar: signUpForm.avatar,
      };
      console.log("userForm form sign up", userForm);
      dispatch(userCreate(userForm));
      toast("User created successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        className: "numans font-bold text-black",
        closeOnClick: true,
      });
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="blog-bg py-5 px-10 mx-auto mt-10 mb-10 max-w-2xl lg:py-16 shadow rubik text-[#6ecfd5]">
        <h2 className="pt-10 pb-7 flex numans mb-4 text-3xl font-med ">
          Create a new user
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
              <label
                htmlFor="first-name"
                className="block mb-2 text-15 font-medium text-[#6ecfd5]"
              >
                First Name
              </label>
              <input
                value={signUpForm.firstName}
                onChange={(e) =>
                  setSignUpForm({
                    ...signUpForm,
                    firstName: e.target.value,
                  })
                }
                type="name"
                name="first-name"
                id="first-name"
                className="bg-neutral-300 border border-gray-300 text-black placeholder:text-gray-500 border border-gray-300 text-15 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Your first name..."
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="last-name"
                className="block mb-2 text-15 font-medium text-[#6ecfd5]"
              >
                Last Name
              </label>
              <input
                value={signUpForm.lastName}
                onChange={(e) =>
                  setSignUpForm({ ...signUpForm, lastName: e.target.value })
                }
                type="name"
                name="last-name"
                id="last-name"
                className="bg-neutral-300 placeholder:text-gray-500 border border-gray-300 text-black  border border-gray-300  text-15 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Your last name..."
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="username"
                className="block mb-2 text-15 font-medium text-[#6ecfd5] "
              >
                User Name
              </label>

              <input
                value={signUpForm.username}
                onChange={(e) =>
                  setSignUpForm({ ...signUpForm, username: e.target.value })
                }
                type="username"
                name="username"
                id="username"
                className=" bg-neutral-300 border border-gray-300 text-black placeholder:text-gray-500 text-15 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Your user name..."
                required="required"
              />
            </div>
            <div className="w-full">
              <div>
                <label
                  htmlFor="photo"
                  className="block text-15 font-medium text-[#6ecfd5]"
                >
                  Profile Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <svg
                    className="h-12 w-12 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <input
                    onChange={handleProfilePhotoUpload}
                    className="bg-neutral-300 border border-gray-300 text-gray-500 placeholder:text-gray-500 border border-gray-300 text-15 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                    type="file"
                    id="myFile"
                    name="filename"
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="category"
                className="block mb-2 text-15 font-medium text-[#6ecfd5]"
              >
                Role
              </label>
              <select
                value={signUpForm.readTime}
                onChange={(e) =>
                  setSignUpForm({ ...signUpForm, role: e.target.value })
                }
                id="role"
                className="bg-neutral-300 border border-gray-300 text-black placeholder:text-gray-500  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-3.25 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400  dark:focus:ring-gray-500 dark:focus:border-gray-500"
              >
                <option defaultValue="">Select category</option>
                <option value="Admin">Admin</option>
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="password"
                className="block mb-2 text-15 font-medium text-[#6ecfd5]"
              >
                Password
              </label>
              <input
                value={signUpForm.password}
                onChange={(e) =>
                  setSignUpForm({ ...signUpForm, password: e.target.value })
                }
                type="password"
                name="password"
                id="password"
                className="bg-neutral-300 border border-gray-300 text-black placeholder:text-gray-500 border border-gray-300 text-15 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-15 font-medium text-[#6ecfd5]"
              >
                Confirm Password
              </label>
              <input
                value={signUpForm.confirmPassword}
                onChange={(e) =>
                  setSignUpForm({
                    ...signUpForm,
                    confirmPassword: e.target.value,
                  })
                }
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="bg-neutral-300 placeholder:text-gray-500 border border-gray-300 text-black  border border-gray-300  text-15 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="col-span-2">
              <div className="flex items-center justify-end space-x-6">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  className="numans inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-md font-med text-center  black  rounded-lg text-black font-bold bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc]  rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="numans inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-md font-med text-center  black  rounded-lg text-black font-bold bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc]  rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserCreate;
