import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Step 1: Create the async thunk for fetching email data
export const fetchEmailBody = createAsyncThunk(
  "emails/fetchEmailBody",
  async (id, { rejectWithValue }) => {
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
  }
);

export const fetchEmails = createAsyncThunk(
  "emails/fetchEmails",
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://flipkart-email-mock.now.sh/?page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Failed to fetch emails");
    }
  }
);

const emailSlice = createSlice({
  name: "emails",
  initialState: {
    emailBody: null,
    emailList: [],
    loading: false,
    error: null,
  },
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

        let favoriteEmails =
          JSON.parse(localStorage.getItem("favoriteEmails")) || [];

        if (email.isFavorite) {
          const isAlreadyFavorite = favoriteEmails.some(
            (fav) => fav.id === emailId
          );
          if (!isAlreadyFavorite) {
            favoriteEmails.push(email);
          }
        } else {
          favoriteEmails = favoriteEmails.filter((fav) => fav.id !== emailId);
        }

        localStorage.setItem("favoriteEmails", JSON.stringify(favoriteEmails));
      }
    },

    toggleRead: (state, action) => {
      const emailId = action.payload;
      const email = state.emailList.find((email) => email.id === emailId);

      if (email) {
        let readEmails = JSON.parse(localStorage.getItem("readEmails")) || [];

        const isAlreadyRead = readEmails.some(
          (readEmail) => readEmail.id === emailId
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
      .addCase(fetchEmailBody.fulfilled, (state, action) => {
        state.loading = false;
        state.emailBody = { ...action.payload, isFavorite: false };
      })
      .addCase(fetchEmailBody.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading = false;
        const emailsWithFlags = action.payload.list.map((email) => ({
          ...email,
          isFavorite: false,
          isRead: false,
        }));

        state.emailList = emailsWithFlags;
      })

      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetEmailBody, setEmailBody, toggleFavorite, toggleRead } =
  emailSlice.actions;

export default emailSlice.reducer;
