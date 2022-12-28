import * as React from "react";
import LinksList from "../components/LinksList";
import Loader from "../components/Loader/Loader";
import { AuthContext } from "../context/AuthContext";
import useHttp from "../hooks/http.hook";

const LinksPage = () => {
  const [links, setLinks] = React.useState([]);
  const { loading, request } = useHttp();
  const { token } = React.useContext(AuthContext);

  const fetchLinks = React.useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        ...Headers,
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
    } catch (error) {}
  }, [token, request]);

  console.log(links);

  React.useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return !loading ? (
    <>
      <LinksList links={links} />
    </>
  ) : (
    <Loader />
  );
};

export default LinksPage;
