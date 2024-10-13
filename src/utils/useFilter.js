export const useFilter = (emailList, activeFilter) => {
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
