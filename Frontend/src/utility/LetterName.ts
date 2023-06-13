export const getLetterName = (username: any) => {
  const lettername =
    username.indexOf(' ') === -1
      ? username[0].toUpperCase()
      : username[0].toUpperCase() +
        username[username.indexOf(' ') + 1].toUpperCase()
  return lettername
}
