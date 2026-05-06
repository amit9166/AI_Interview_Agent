const AUTH_TOKEN_KEY = "interviewiq_token";
const AUTH_USER_KEY = "interviewiq_user";

export function getStoredToken(){
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getStoredUser(){
  const user = localStorage.getItem(AUTH_USER_KEY);
  if(!user){
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    localStorage.removeItem(AUTH_USER_KEY);
    return null;
  }
}

export function storeAuth(user, token){
  if(token){
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
  if(user){
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }
}

export function clearStoredAuth(){
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}
