import EmailCard from "./EmailCard";

const ListPage = ({ setCurrentPage, currentPage, totalPages, emails }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <section>
      <div>
        <div>
          {emails.map((email) => (
            <EmailCard key={email.id} email={email} />
          ))}
          <nav
            aria-label="Pagination"
            className="pagination d-flex justify-content-center my-5"
          >
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="btn btn-danger rounded-pill text-white ms-3"
              style={{ fontWeight: "bold" }}
            >
              Previous
            </button>
            <span className="mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-danger rounded-pill text-white ms-3"
              style={{ fontWeight: "bold" }}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ListPage;
