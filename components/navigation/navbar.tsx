// import Link from "next/link";
// // import "@fortawesome/fontawesome-free/css/all.min.css";

// const Navbar = () => {
//   return (
//     <nav
//       className="navbar navbar-expand-lg navbar-light"
//       style={{ backgroundColor: "var(--bs-blue)" }}
//     >
//       <div className="container">
//         <Link className="navbar-brand" href="#">
//           <img src="/img/snuLogo-OPSE-logo-white.png" alt="" width="180" />
//         </Link>

//         <div className="d-flex justify-content-end">
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent1"
//             aria-controls="navbarSupportedContent1"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <svg
//               className="svg-inline--fa fa-search fa-w-16 text-white"
//               aria-hidden="true"
//               focusable="false"
//               data-prefix="fa"
//               data-icon="search"
//               role="img"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 512 512"
//             >
//               <path
//                 fill="currentColor"
//                 d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
//               ></path>
//             </svg>
//           </button>
//           <button
//             className="navbar-toggler text-white"
//             type="button"
//             data-bs-toggle="offcanvas"
//             href="#offcanvasExample"
//           >
//             <svg
//               className="svg-inline--fa fa-bars fa-w-14"
//               aria-hidden="true"
//               focusable="false"
//               data-prefix="fa"
//               data-icon="bars"
//               role="img"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 448 512"
//             >
//               <path
//                 fill="currentColor"
//                 d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
//               ></path>
//             </svg>
//           </button>
//         </div>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent1">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
//           <form className="d-flex justify-content-center">
//             <div className="input-group">
//               <span
//                 className="input-group-text text-white"
//                 id="basic-addon2"
//                 style={{ backgroundColor: "var(--bs-snu-orange)" }}
//               >
//               </span>
//               <span
//                 className="twitter-typeahead"
//                 style={{ position: "relative", display: "inline-block" }}
//               >

//                 <pre
//                   aria-hidden="true"
//                   style={{
//                     position: "absolute",
//                     visibility: "hidden",
//                     whiteSpace: "pre",
//                     fontFamily: '"Source Sans Pro", sans-serif',
//                     fontSize: "14px",
//                     fontStyle: "normal",
//                     fontVariant: "normal",
//                     fontWeight: "400",
//                     wordSpacing: "0px",
//                     letterSpacing: "0px",
//                     textIndent: "0px",
//                     textRendering: "auto",
//                     textTransform: "none",
//                   }}
//                 ></pre>
//                 <div
//                   className="tt-menu"
//                   style={{
//                     position: "absolute",
//                     top: "100%",
//                     left: 0,
//                     zIndex: 100,
//                     display: "none",
//                   }}
//                 >
//                   <div className="tt-dataset tt-dataset-engine"></div>
//                 </div>
//               </span>
//             </div>
//           </form>
//         </div>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
//           <span className="navbar-text">
//             <span className="text-white">
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item dropdown">
//                   <a
//                     className="nav-link dropdown-toggle text-white"
//                     href="#"
//                     id="navbarDropdown"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     <small>Hi Anuj Maurya</small>
//                   </a>
//                 </li>
//               </ul>
//             </span>
//           </span>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../mode.toggle";

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white dark:bg-gray-900 absolute inset-x-0 top-0 pl-0 ">
      <div className="flex items-center justify-between mx-auto px-5 py-2">
        <Link
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="GeeksForum Logo"
            width={32}
            height={32}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            GeeksForum
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="flex items-center flex-row gap-x-4">
            <ModeToggle />
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-[40px] w-[40px]",
                },
              }}
            />
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          {/* <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {["Home", "About", "Services", "Pricing", "Contact"].map(
              (item, index) => (
                <li key={item}>
                  <Link
                    href="#"
                    className={`block py-2 px-3 ${
                      index === 0
                        ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                        : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    }`}
                    aria-current={index === 0 ? "page" : undefined}
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul> */}
          <Image src="https://snu.edu.in/site/templates/images/logo.svg" alt="" width="180" height="100" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
