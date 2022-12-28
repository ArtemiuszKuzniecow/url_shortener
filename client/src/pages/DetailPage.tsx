import * as React from "react";
import { useParams } from "react-router-dom";
import LinkCard from "../components/LinkCard";
import Loader from "../components/Loader/Loader";
import { AuthContext } from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import { ILink } from "../models/models";

const DetailPage = () => {
  const { token } = React.useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = React.useState<ILink | null>(null);
  const linkId = useParams().id;

  const getLink = React.useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        ...Headers,
        Authorization: `Bearer ${token}`,
      });

      setLink(fetched);
    } catch (error) {}
  }, [token, linkId, request]);

  React.useEffect(() => {
    getLink();
  }, [getLink]);

  return !loading ? <>{link && <LinkCard {...link} />}</> : <Loader />;
};

export default DetailPage;
