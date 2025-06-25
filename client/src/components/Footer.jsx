import { Link } from "react-router";

const Footer = () => {
  return (
    <>
      <footer className="mt-8 p-4 bg-black md:p-8 lg:p-10">
        <div className=" mx-auto max-w-screen-xl text-center">
          <div className="flex justify-center text-2xl font-semibold text-gray-900 mr-10 mb-2">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={new URL(`../assets/images/plug.svg`, import.meta.url).href}
                className="h-8"
                alt="classConnect Logo"
              />
              <span className="self-center text-[#6ecfd5] text-2xl font-semibold whitespace-nowrap dark:text-white numans">
                <span className="text-neutral-50">class</span>Connect
              </span>
            </a>
          </div>
          <div className="flex justify-center">
            <ul className="flex pb-1 text-neutral-300 font-poppins">
              <li>
                <Link to="/" className="mr-4 hover:underline md:mr-6 ">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/blog-list" className="mr-4 hover:underline md:mr-6 ">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/wiki" className="mr-4 hover:underline md:mr-6">
                  Wiki
                </Link>
              </li>
              <li>
                <Link to="/whitelist" className="mr-4 hover:underline md:mr-6">
                  Whitelist
                </Link>
              </li>
              <li>
                <Link to="/ollama" className="mr-4 hover:underline md:mr-6">
                  Ollama
                </Link>
              </li>
              <li>
                <Link to="/login" className="mr-4 hover:underline md:mr-6">
                  Log In
                </Link>
              </li>
            </ul>
          </div>
          <span className="text-sm text-gray-500 sm:text-center font-poppins">
            © 2025{" "}
            <Link to="" className="hover:underline">
              Team5 Productions™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
