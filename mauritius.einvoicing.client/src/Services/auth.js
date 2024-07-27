export function IsAuthenticated() {
  return localStorage.getItem("token") ? true : false;
}

export function GetJwtToken() {
  return localStorage.getItem("token");
}

export function SetJwtToken(token) {
  localStorage.setItem("token", token);
}

export function ClearLocalStore() {
  localStorage.clear();
}
