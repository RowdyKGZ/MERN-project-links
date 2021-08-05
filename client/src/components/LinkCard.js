import React, { useEffect } from "react";

export const LinkCard = ({ link }) => {
  const handleClick = () => {};

  useEffect(() => {
    console.log("izmenilosi");
  }, [link.clicks]);
  return (
    <>
      <h2>Ссылка</h2>
      <p>
        Ваша ссылка:
        <a
          onclick={handleClick}
          href={link.to}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.to}
        </a>
      </p>
      <p>
        Откуда:
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Количество кликов по ссылке: <strong>{link.clicks}</strong>
      </p>
      <p>
        Дата создания: <strong>{new Date(link.data).toLocaleString()}</strong>
      </p>
    </>
  );
};
