import { useDispatch, useSelector } from "react-redux";
import useFormatDate from "../utils/useFormatDate";
import Shimmer from "./Shimmer";
import { resetEmailBody, toggleFavorite } from "../utils/emailSlice";

const EmailBody = () => {
  const dispatch = useDispatch();
  const { emailList, emailBody, loading, error } = useSelector(
    (state) => state.emailBody
  );

  if (loading) {
    return <Shimmer />;
  }

  const email =
    JSON.parse(localStorage.getItem("favoriteEmails"))?.find(
      (email) => email?.id === emailBody?.id
    ) || emailList?.find((email) => email?.id === emailBody?.id);
  console.log(email);

  if (!email) return;

  const formattedDate = useFormatDate(email?.date);
  return (
    <article className="card p-3 d-flex position-relative">
      <span
        className="position-absolute top-0 end-0 px-2"
        style={{ cursor: "pointer" }}
        onClick={() => dispatch(resetEmailBody())}
      >
        X
      </span>
      <div className="row w-100">
        <div className="col-auto d-flex">
          <div
            className="text-white avatar rounded-circle me-3"
            aria-label="Sender Initial"
          >
            {email.from.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="col">
          <header className="d-flex align-items-center mb-3 justify-content-between">
            <div>
              <h1 className="display-6">
                <strong>{email?.subject}</strong>
              </h1>
              <time className="text-secondary" dateTime={formattedDate}>
                {formattedDate}
              </time>
            </div>

            <button
              onClick={() => {
                dispatch(toggleFavorite(email?.id));
              }}
              className="btn btn-danger rounded-pill text-white ms-3"
              style={{ fontWeight: "bold" }}
              aria-label={
                email.isFavorite === true
                  ? "Remove from Favorite"
                  : "Mark as Favorite"
              }
            >
              {email.isFavorite ? "Remove from Favorite" : "Mark as Favorite"}
            </button>
          </header>
          <section dangerouslySetInnerHTML={{ __html: emailBody?.body }} />
        </div>
      </div>
    </article>
  );
};

export default EmailBody;
