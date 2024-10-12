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
      <div
        className="card p-3 my-3"
        onClick={() => getEmailBody(email.id)}
        style={{ cursor: "pointer" }}
      >
        <div className="row">
          <div
            className="d-flex mx-3 justify-content-center align-items-center text-white rounded-circle"
            style={{
              width: "50px",
              height: "50px",
              fontSize: "20px",
              fontWeight: "bold",
              backgroundColor: "#E54065",
            }}
          >
            {email.from.name.charAt(0).toUpperCase()}
          </div>

          <div className="col ms-3">
            <div className="card-body p-0">
              <div style={{ margin: "0px" }}>
                <span className="text-secondary">From: </span>
                <span className="">
                  <strong>
                    {email.from.name} &lt;{email.from.email}&gt;
                  </strong>
                </span>
              </div>
              <div>
                <span className="text-secondary">Subject: </span>
                <strong>{email.subject}</strong>
              </div>
              <div>
                {emailBody && email.short_description.length > 50
                  ? email.short_description.slice(0, 50) + "..."
                  : email.short_description}
              </div>
              <div className="text-muted" style={{ margin: "0px" }}>
                {formattedDate}
                <span
                  className="mx-5"
                  style={{ color: "#E54065", cursor: "pointer" }}
                >
                  <strong>{email?.isFavorite && "Favorite"}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailCard;
