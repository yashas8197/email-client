import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Email, EmailBody } from "../types";

// Step 1: Create the async thunk for fetching email data
export const fetchEmailBody = createAsyncThunk<
  EmailBody,
  string,
  { rejectValue: string }
>("emails/fetchEmailBody", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://flipkart-email-mock.now.sh/?id=${id}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue("Failed to fetch email body"); // handle the error
  }
});

export const fetchEmails = createAsyncThunk<
  Email[],
  number,
  { rejectValue: string }
>("emails/fetchEmails", async (page, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://flipkart-email-mock.now.sh/?page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch emails");
    }
    const data = await response.json();
    return data.list;
  } catch (error) {
    return rejectWithValue("Failed to fetch emails");
  }
});

interface EmailState {
  emailBody: EmailBody | null;
  emailList: Email[];
  loading: boolean;
  error: string | null;
  currentPage?: number;
}

const initialState: EmailState = {
  emailBody: null,
  emailList: [],
  loading: false,
  error: null,
};

const emailSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setEmailBody: (state, action) => {
      state.emailBody = action.payload;
    },
    resetEmailBody: (state) => {
      state.emailBody = null;
    },
    toggleFavorite: (state, action) => {
      const emailId = action.payload;
      const email = state.emailList.find((email) => email.id === emailId);

      if (email) {
        email.isFavorite = !email.isFavorite;

        let favoriteEmails = JSON.parse(
          localStorage.getItem("favoriteEmails") || "[]"
        );

        if (email.isFavorite) {
          const isAlreadyFavorite = favoriteEmails.some(
            (fav: Email) => fav.id === emailId
          );
          if (!isAlreadyFavorite) {
            favoriteEmails.push(email);
          }
        } else {
          favoriteEmails = favoriteEmails.filter(
            (fav: Email) => fav.id !== emailId
          );
        }

        localStorage.setItem("favoriteEmails", JSON.stringify(favoriteEmails));
      }
    },

    toggleRead: (state, action) => {
      const emailId = action.payload;
      const email = state.emailList.find((email) => email.id === emailId);

      if (email) {
        let readEmails = JSON.parse(localStorage.getItem("readEmails") || "[]");

        const isAlreadyRead = readEmails.some(
          (readEmail: Email) => readEmail.id === emailId
        );

        if (!isAlreadyRead) {
          email.isRead = true;
          readEmails.push(email);

          localStorage.setItem("readEmails", JSON.stringify(readEmails));
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmailBody.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEmailBody.fulfilled,
        (state, action: PayloadAction<EmailBody>) => {
          state.loading = false;
          state.emailBody = { ...action.payload, isFavorite: false };
        }
      )
      .addCase(
        fetchEmailBody.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      );

    builder
      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEmails.fulfilled,
        (state, action: PayloadAction<Email[]>) => {
          state.loading = false;
          const emailsWithFlags = action.payload.map((email: Email) => ({
            ...email,
            isFavorite: false,
            isRead: false,
          }));

          state.emailList = emailsWithFlags;
        }
      )

      .addCase(
        fetchEmails.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      );
  },
});

export const { resetEmailBody, setEmailBody, toggleFavorite, toggleRead } =
  emailSlice.actions;

export default emailSlice.reducer;
