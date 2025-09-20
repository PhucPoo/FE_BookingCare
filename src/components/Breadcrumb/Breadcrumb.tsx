import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

type Props = {
  location: string;
};

const Breadcrumb = ({ location }: Props) => {
  const pathnames = location.split("/").filter((x) => x);
  let breadcrumbPath = "";

  // if (pathnames.length === 0) {
  //   // If the current route is the home route ('/'), do not render the breadcrumbs
  //   return null;
  // }

  return (
    <div className="breadcrumbs my-2 ">
      <Link to="/">
        <HomeOutlined className="mx-2" style={{ color: "#5ccad8" }} />
      </Link>
      {pathnames.map((name, index) => {
        breadcrumbPath += `/${name}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span key={breadcrumbPath} className="mx-2">
            / {name}
          </span>
        ) : (
          <span key={breadcrumbPath}>
            /
            <Link
              to={breadcrumbPath}
              className="mx-2"
              style={{ color: "#5ccad8" }}
            >
              {name}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
