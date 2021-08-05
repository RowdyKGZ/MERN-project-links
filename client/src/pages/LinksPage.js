import { useHttp } from "../hooks/http.hook";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";

export const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  // Функция которая загружает все линки
  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request(`/api/link`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return loading ? <Loader /> : <>{!loading && <LinksList links={links} />}</>;
};
