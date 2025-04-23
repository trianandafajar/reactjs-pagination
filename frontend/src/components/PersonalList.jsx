import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import ReactPaginate from "react-paginate";

const LIMIT = 10;

const PersonalList = () => {
  const [data, setData] = useState({
    personals: [],
    pages: 0,
    rows: 0,
  });
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [keyword, setKeyword] = useState("");
  const [msg, setMsg] = useState("");

  const fetchPersonals = useCallback(async () => {
    try {
      const { data: res } = await axios.get(
        `/api/personals?search=${keyword}&limit=${LIMIT}&page=${page}`
      );
      setData({
        personals: res.result,
        pages: res.totalPages,
        rows: res.totalRows,
      });
      setMsg(res.totalRows === 0 ? "Tidak ditemukan? Gunakan search box" : "");
    } catch (err) {
      console.error(err);
      setMsg("Error fetching data");
    }
  }, [keyword, page]);

  useEffect(() => {
    fetchPersonals();
  }, [fetchPersonals]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  const handlePageChange = ({ selected }) => setPage(selected);

  const { personals, pages, rows } = data;

  return (
    <div className="container mt-5">
      <div className="columns">
        <div className="column is-centered">
          <form onSubmit={handleSearch}>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  type="text"
                  className="input is-rounded"
                  placeholder="Search ..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="control">
                <button type="submit" className="button is-rounded is-info">
                  Search
                </button>
              </div>
            </div>
          </form>

          <table className="table is-striped is-bordered is-fullwidth mt-2">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              {personals.map(({ id, first_name, last_name, email, gender, ip_address }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{email}</td>
                  <td>{gender}</td>
                  <td>{ip_address}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            Total Rows: {rows.toLocaleString()} Page: {page + 1} of {pages.toLocaleString()}
          </p>
          <p className="has-text-danger has-text-right">{msg}</p>

          <nav className="pagination is-right is-rounded" role="navigation" aria-label="pagination">
            <ReactPaginate
              previousLabel="Prev"
              nextLabel="Next"
              pageCount={pages}
              onPageChange={handlePageChange}
              containerClassName="pagination-list"
              pageLinkClassName="pagination-link"
              previousLinkClassName="pagination-previous"
              nextLinkClassName="pagination-next"
              activeLinkClassName="pagination-link is-current"
              disabledLinkClassName="pagination-link is-disabled"
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PersonalList;
