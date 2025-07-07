import { useState, useEffect } from 'react';
import { getDLCs } from '../../utils/api';

function DlcList() {
  const [dlcs, setDlcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    setLoading(true);
    setError(null);
    getDLCs(page, limit)
      .then(data => {
        setDlcs(data.dlcs);
        setTotalPages(data.totalPages);
      })
      .catch(err => {
        console.error('Error loading DLCs', err);
        setError('Failed to load DLCs. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <p>Loading DLCs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="dlc-list">
        {dlcs.map(dlc => (
          <div key={dlc._id} className="dlc-card">
            <img
              src={`http://localhost:3000${dlc.image}`}
              alt={dlc.name}
              className="dlc-image"
            />
            <h2>{dlc.name}</h2>
            <p><strong>Year:</strong> {dlc.year}</p>
            <p><strong>Game:</strong> {dlc.game}</p>
            <p><strong>Category:</strong> {dlc.category}</p>
            <p>{dlc.description}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span> Page {page} of {totalPages} </span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </>
  );
}

export default DlcList;
