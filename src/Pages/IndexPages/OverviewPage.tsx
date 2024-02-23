import { Link, Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContext";

const OverviewPage = () => {
  const { user } = useUserAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }
  const sections = [
    {
      title: "Latest Articles",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus ex in nisl viverra, vitae egestas tellus cursus. Cras a massa quam. Quisque purus augue, pulvinar eu enim sed, tristique laoreet felis. Aliquam magna ligula, fringilla sit amet lobortis ut, semper non leo. Nulla facilisi. Curabitur a felis ipsum. Sed tempus, odio at iaculis accumsan, nibh risus facilisis ipsum, at tempus mi augue a metus. Pellentesque sagittis nisl nibh, nec blandit dui pellentesque sit amet. Donec et dui nisl. Nulla quis congue ipsum, at pharetra orci. Pellentesque non consequat libero. Curabitur est nulla, pharetra eget dolor vel, tempor faucibus sapien. Praesent ut interdum mauris. ",
      link: "/articles",
    },
    {
      title: "Tasks",
      description:
        " Sed condimentum lorem sed pulvinar dignissim. Cras purus lectus, euismod in accumsan sed, sagittis in justo. Nullam id neque imperdiet, viverra arcu ac, dapibus velit. Phasellus laoreet nulla et quam fermentum aliquet. Maecenas auctor metus sed accumsan efficitur. Aenean varius ullamcorper nulla, quis venenatis quam. Nam ac neque ipsum. ",
      link: "/tasks",
    },
    {
      title: "Projects",
      description:
        " Ut ornare, massa ut feugiat interdum, velit nisi iaculis diam, eu tempor sem lectus at quam. Curabitur egestas ligula non lectus tempor convallis. Phasellus feugiat efficitur urna ut semper. Quisque accumsan, augue ut posuere tincidunt, justo ligula pulvinar ex, vel tristique nunc tortor at tortor. Etiam at elementum massa. Proin sed lorem justo. Integer ut magna nec nibh ullamcorper maximus non vitae enim. Phasellus vel mauris eu dolor tristique vehicula eu nec lacus. Sed pulvinar blandit nisi eu consectetur. ",
      link: "/projects",
    },
    {
      title: "Top Articles",
      description:
        " Duis nisl purus, volutpat molestie tellus eget, varius porttitor dolor. Nulla ac commodo sem. Donec lectus odio, sagittis ut lorem et, dictum ultrices orci. Vivamus finibus vulputate magna nec ultricies. Aenean vehicula metus at vestibulum interdum. Aliquam semper sapien ac facilisis laoreet. Nunc venenatis, massa eget ultrices varius, ante diam dictum augue, eget semper lectus tortor eget mi. ",
      link: "/analytics",
    },
  ];

  return (
    <div className="mb-8 grid h-full w-full gap-2 lg:grid-cols-2">
      {sections.map((section) => (
        <div
          key={section.title}
          className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow "
        >
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              {section.title}
            </h5>
          </a>
          <p className="mb-3 line-clamp-4 font-normal text-gray-700 ">
            {section.description}
          </p>

          <div>
            <Link
              className="inline-flex items-center rounded-lg bg-blue-500 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              to={section.link}
            >
              See more
              <svg
                className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewPage;
