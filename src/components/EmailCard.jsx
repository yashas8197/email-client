import useFormatDate from "../utils/useFormatDate";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmailBody, toggleRead } from "../utils/emailSlice";

const EmailCard = ({ email }) => {
  const { emailBody } = useSelector((state) => state.emailBody);
  const dispatch = useDispatch();

  const getEmailBody = async (id) => {
    dispatch(fetchEmailBody(id));
    dispatch(toggleRead(id));
  };

  const formattedDate = useFormatDate(email.date);

  return (
    <>
      <article
        className={`card p-3 my-3 ${email.isRead && "read-bg"} ${
          emailBody?.id === email?.id && "active-ring"
        }`}
        onClick={() => getEmailBody(email.id)}
        style={{ cursor: "pointer" }}
      >
        <div className="row">
          <div
            className="d-flex mx-3 avatar justify-content-center align-items-center text-white rounded-circle"
            aria-label="Sender Initial"
          >
            {email.from.name.charAt(0).toUpperCase()}
          </div>

          <div className="col ms-3">
            <section className="card-body p-0">
              <div style={{ margin: "0px" }}>
                <span className="text-secondary">From: </span>
                <address style={{ display: "inline" }}>
                  <strong>
                    {email.from.name} &lt;{email.from.email}&gt;
                  </strong>
                </address>
              </div>
              <div>
                <span className="text-secondary">Subject: </span>
                <h6 style={{ display: "inline" }}>{email.subject}</h6>
              </div>
              <p>
                {emailBody && email.short_description.length > 50
                  ? email.short_description.slice(0, 50) + "..."
                  : email.short_description}
              </p>
              <footer className="text-muted" style={{ margin: "0px" }}>
                <time dateTime={formattedDate}>{formattedDate}</time>
                <span
                  className="mx-5"
                  style={{ color: "#E54065", cursor: "pointer" }}
                >
                  <strong>{email?.isFavorite && "Favorite"}</strong>
                </span>
              </footer>
            </section>
          </div>
        </div>
      </article>
    </>
  );
};

export default EmailCard;
