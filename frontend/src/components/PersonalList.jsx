import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const PersonalList = () => {
  const [personals, setPersonals] = useState([]);
  const [page, setPage] = useState(0);
  const [limit] = useState(10); // Limit is constant, no need to be in state
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");

  const getPersonals = async () => {
    try {
      const response = await axios.get(
        `/api/personals?search=${keyword}&limit=${limit}&page=${page}`
      );
      setPersonals(response.data.result);
      setPages(response.data.totalPages);
      setRows(response.data.totalRows);
      setMsg(response.data.totalRows === 0 ? "Tidak ditemukan? Gunakan search box" : "");
    } catch (error) {
      console.error("Error fetching data", error);
      setMsg("Error fetching data");
    }
  };

  useEffect(() => {
    getPersonals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, page]);

  const pageChange = ({ selected }) => setPage(selected);

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  return (
    <div className="container mt-5">
      <div className="columns">
        <div className="column is-centered">
          <form onSubmit={searchData}>
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
              {personals.map((personal) => (
                <tr key={personal.id}>
                  <td>{personal.id}</td>
                  <td>{personal.first_name}</td>
                  <td>{personal.last_name}</td>
                  <td>{personal.email}</td>
                  <td>{personal.gender}</td>
                  <td>{personal.ip_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Total Rows: {rows.toLocaleString("en-US")} Page: {page + 1} of {pages.toLocaleString("en-US")}
          </p>
          <p className="has-text-danger has-text-right">{msg}</p>
          <nav
            className="pagination is-right is-rounded"
            role="navigation"
            aria-label="pagination"
          >
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              pageCount={pages}
              onPageChange={pageChange}
              containerClassName={"pagination-list"}
              pageLinkClassName={"pagination-link"}
              previousLinkClassName={"pagination-previous"}
              nextLinkClassName={"pagination-next"}
              activeLinkClassName={"pagination-link is-current"}
              disabledLinkClassName={"pagination-link is-disabled"}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PersonalList;
