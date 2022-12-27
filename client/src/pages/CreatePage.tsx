import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useHttp from "../hooks/http.hook";

const CreatePage = () => {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();
  const { request } = useHttp();
  const [link, setLink] = React.useState("");

  const pressHandler = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event?.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          { ...Headers, Authorization: `Bearer ${auth.token}` }
        );
        navigate(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };

  React.useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col s8 offset-s2 create-page-padding">
        <div className="input-field ">
          <input
            id="link"
            type="text"
            className="validate"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyDown={pressHandler}
          />
          <label htmlFor="link">Enter your link and press "Enter"</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
