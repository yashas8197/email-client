export type Email = {
  id: string;
  from: {
    email: string;
    name: string;
  };
  date: number;
  subject: string;
  short_description: string;
  isRead?: boolean;
  isFavorite?: boolean;
};

export type EmailBody = {
  id: string;
  body: string;
  isFavorite?: boolean;
};
