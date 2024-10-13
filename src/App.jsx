import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ListPage from "./components/ListPage";
import EmailBody from "./components/EmailBody";
import FilterHeader from "./components/FilterHeader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmails, resetEmailBody } from "./utils/emailSlice";

function App() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
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

  const filteredList = () => {
    const favoriteEmails =
      JSON.parse(localStorage.getItem("favoriteEmails")) || [];
    const readEmails = JSON.parse(localStorage.getItem("readEmails")) || [];

    if (activeFilter === "Favorites") {
      return favoriteEmails.length
        ? favoriteEmails
        : emailList.filter((email) => email.isFavorite);
    } else if (activeFilter === "Read") {
      return readEmails.length
        ? readEmails
        : emailList.filter((email) => email.isRead);
    } else if (activeFilter === "Unread") {
      const readEmailIds = readEmails.map((email) => email.id);
      return emailList.filter((email) => !readEmailIds.includes(email.id));
    }

    return emailList;
  };

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
              emails={filteredList()}
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
