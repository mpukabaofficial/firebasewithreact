import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContext";

const AnalyticsPage = () => {
  const { user, ready } = useUserAuth();
  if (!user && ready) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <div className="w-full max-w-sm rounded-lg bg-white p-4 shadow dark:bg-gray-800 md:p-6">
        <div className="flex justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
          <dl>
            <dt className="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">
              Profit
            </dt>
            <dd className="text-3xl font-bold leading-none text-gray-900 dark:text-white">
              $5,405
            </dd>
          </dl>
          <div>
            <span className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
              <svg
                className="me-1.5 h-2.5 w-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13V1m0 0L1 5m4-4 4 4"
                />
              </svg>
              Profit rate 23.5%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 py-3">
          <dl>
            <dt className="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">
              Income
            </dt>
            <dd className="text-xl font-bold leading-none text-green-500 dark:text-green-400">
              $23,635
            </dd>
          </dl>
          <dl>
            <dt className="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">
              Expense
            </dt>
            <dd className="text-xl font-bold leading-none text-red-600 dark:text-red-500">
              -$18,230
            </dd>
          </dl>
        </div>

        <div id="bar-chart"></div>
        <div className="grid grid-cols-1 items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between pt-5">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="lastDaysdropdown"
              data-dropdown-placement="bottom"
              className="inline-flex items-center text-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              type="button"
            >
              Last 6 months
              <svg
                className="m-2.5 ms-1.5 w-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="lastDaysdropdown"
              className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Yesterday
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Today
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Last 7 days
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Last 30 days
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Last 90 days
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Last 6 months
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Last year
                  </a>
                </li>
              </ul>
            </div>
            <a
              href="#"
              className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold uppercase text-blue-600  hover:bg-gray-100 hover:text-blue-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-blue-500 dark:focus:ring-gray-700"
            >
              Revenue Report
              <svg
                className="ms-1.5 h-2.5 w-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
