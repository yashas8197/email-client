const FilterHeader = ({ activeFilter, handleFilterChange }) => {
  return (
    <div>
      <div className="filter container my-4 d-flex align-items-center">
        <p className="my-1">
          <strong>Filter By:</strong>
        </p>
        <div className="mx-5 row">
          {["Unread", "Read", "Favorites"].map((filter) => (
            <span
              key={filter}
              className={`col px-2 ${activeFilter === filter ? "active" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterHeader;
