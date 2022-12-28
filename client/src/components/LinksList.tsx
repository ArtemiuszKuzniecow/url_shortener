import { Link } from "react-router-dom";
import { ILink } from "../models/models";

const LinksList = (props: { links: ILink[] | [] }) => {
  const { links } = props;

  if (links.length === 0) {
    <p className="center">There are no links yet.</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Original</th>
          <th>Short</th>
          <th>Open</th>
        </tr>
      </thead>

      <tbody>
        {links.map((l, i) => (
          <tr key={l._id}>
            <td>{i + 1}</td>
            <td>{l.from}</td>
            <td>{l.to}</td>
            <td>
              <Link to={`/detail/${l._id}`}>Open</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinksList;
