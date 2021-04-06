export const isTokenValid = (tokenObj) => {
  if (!tokenObj) return false;

  const { access_token, expires_in, retrieved, token_type } = tokenObj;

  if (expires_in == null ) return false;
  if (retrieved == null) return false;
  if (access_token == null || access_token.length === 0) return false;
  if (token_type == null || token_type.length === 0) return false;
  
  const expiry = (expires_in - 300) * 1000;
  return new Date().getTime() < (retrieved + expiry);
}

export const isValidShareLink = (link) => {
  const regex = new RegExp(/^https:\/\/open\.spotify\.com\/playlist\/\w*$/, 'i');
  return regex.test(link);
}