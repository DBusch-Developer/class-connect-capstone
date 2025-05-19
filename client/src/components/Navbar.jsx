import { Link, useLocation } from "react-router";
// medium teal: [#6ecfd5] dark teal: [#60c7cc]

const Navbar = () => {
  const location = useLocation();

  return (
    <>
<nav className="bg-black dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 numans">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={
                        new URL(
                          `../assets/images/plug.svg`,
                          import.meta.url
                        ).href
                      } className="h-8" alt="classConnect Logo" />
      <span className="self-center text-[#6ecfd5] text-2xl font-semibold whitespace-nowrap dark:text-white numans"><span className="text-neutral-50">class</span>Connect</span>
  </a>
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <Link to="/add-blog">
      <button type="button" className="text-black font-bold bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc]  rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">Add Post</button>
      </Link>
     
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-black md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <Link to="/">
      <li className={`block py-2 px-3 ${location.pathname === "/" ? "text-white" : "text-[#6ecfd5]" } rounded-sm md:bg-transparent md:p-0 md:dark:text-blue-500 hover:text-white`} aria-current="page">Home
      </li>
      </Link>

              <Link to="/blog-list">
                <li
                  className={`block py-2 px-3 ${
                    location.pathname === "/blog-list"
                      ? "text-white"
                      : "text-[#6ecfd5]"
                  } rounded-sm md:bg-transparent md:p-0 md:dark:text-blue-500 hover:text-white`}
                  aria-current="page"
                >
                  Blog
                </li>
              </Link>

              <Link to="/wiki">
                <li
                  className={`block py-2 px-3 ${
                    location.pathname === "/wiki"
                      ? "text-white"
                      : "text-[#6ecfd5]"
                  } rounded-sm md:bg-transparent md:p-0 md:dark:text-blue-500 hover:text-white`}
                  aria-current="page"
                >
                  Wiki
                </li>
              </Link>

      <Link to="/whitelist">
      <li
      className={`block py-2 px-3 ${location.pathname === "/whitelist" ? "text-white" : "text-[#6ecfd5]" } rounded-sm md:bg-transparent md:p-0 md:dark:text-blue-500 hover:text-white`} aria-current="page">Whitelist
      </li>
      </Link>
    </ul>
  </div>
  </div>
  <div className="text-[#6ecfd5] border-1 border-b"></div>
</nav>
    </>
  );
};

export default Navbar;