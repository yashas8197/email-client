import { useDispatch, useSelector } from "react-redux";
import useFormatDate from "../utils/useFormatDate";
import Shimmer from "./Shimmer";
import { toggleFavorite } from "../utils/emailSlice";

const EmailBody = () => {
  const dispatch = useDispatch();
  const { emailList, emailBody, loading, error } = useSelector(
    (state) => state.emailBody
  );

  if (loading) {
    return <Shimmer />;
  }

  const email = emailList?.find((email) => email?.id === emailBody?.id);

  if (!email) return;

  const formattedDate = useFormatDate(email?.date);
  return (
    <div className="card p-3 d-flex">
      <div className="row w-100">
        <div className="col-auto d-flex ">
          <div
            className="text-white rounded-circle me-3"
            style={{
              width: "50px",
              height: "50px",
              fontSize: "20px",
              fontWeight: "bold",
              backgroundColor: "#E54065",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {email.from.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="col">
          <div className="d-flex align-items-center mb-3 justify-content-between">
            <div>
              <h5 className="display-6">
                <strong>{email?.subject}</strong>
              </h5>
              <span className="text-secondary">{formattedDate}</span>
            </div>

            <button
              onClick={() => {
                dispatch(toggleFavorite(email?.id));
              }}
              className="btn btn-danger rounded-pill text-white ms-3"
              style={{ fontWeight: "bold" }}
            >
              {email.isFavorite ? "Remove from Favorite" : "Mark as Favorite"}
            </button>
          </div>
          <div dangerouslySetInnerHTML={{ __html: emailBody?.body }} />
        </div>
      </div>
    </div>
  );
};

export default EmailBody;
