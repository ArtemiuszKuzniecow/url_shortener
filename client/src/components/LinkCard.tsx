import * as React from "react";
import { ILink } from "../models/models";

const LinkCard = ({ ...link }: ILink) => {
  return (
    <div>
      <h2>Your link</h2>
      <p>
        Your link:{" "}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        From:{" "}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Quantity of clicks: <strong>{link.clicks}</strong>
      </p>
      <p>
        Date: <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </div>
  );
};

export default LinkCard;
