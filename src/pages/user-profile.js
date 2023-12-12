import { useContext } from "react";
import { renderQueryParams } from "../utils";
import { RouterContext } from "../router";

export const UserProfile = ({ params, query }) => {
  const { history } = useContext(RouterContext);

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {params.id}</p>
      <h2>Query Parameters:</h2>
      <button onClick={() => history.push("/")}>Go to Home</button>
      {renderQueryParams(query)}
    </div>
  );
};
