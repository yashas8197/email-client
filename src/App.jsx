import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ListPage from "./components/ListPage";
import EmailBody from "./components/EmailBody";
import FilterHeader from "./components/FilterHeader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmails, resetEmailBody } from "./utils/emailSlice";
import { useFilter } from "./utils/useFilter";

function App() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;
  const [activeFilter, setActiveFilter] = useState("");

  const [showEmailBody, setShowEmailBody] = useState(false);
  const { emailList, emailBody } = useSelector((state) => state.emailBody);

  useEffect(() => {
    dispatch(fetchEmails(currentPage));
    window.scroll(0, 0);
  }, [currentPage, activeFilter]);

  const email = emailList.find((email) => email?.id === emailBody?.id);

  useEffect(() => {
    if (!email) {
      setShowEmailBody(false);
      dispatch(resetEmailBody());
    } else {
      setShowEmailBody(emailBody !== null ? true : false);
    }
  }, [email, emailBody]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredList = useFilter(emailList, activeFilter);

  return (
    <>
      <FilterHeader
        activeFilter={activeFilter}
        handleFilterChange={handleFilterChange}
      />
      <div className="container-fluid">
        <div className="row">
          <div className={`${showEmailBody ? "col-5" : "col"}`}>
            <ListPage
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
              emails={filteredList}
              activeFilter={activeFilter}
            />
          </div>
          {showEmailBody && (
            <div className="col-7">
              <EmailBody />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
