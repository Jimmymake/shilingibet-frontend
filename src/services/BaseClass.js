class BaseClass {
  // Get the current user from localStorage
  get user() {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  }

  // Get the token from user
  get token() {
    return this.user?.token || null;
  }

  // Get the userId
  get userId() {
    return this.user?.userId || null;
  }

  // Get the phone
  get phone() {
    return this.user?.phone || null;
  }

  // Get the referralCode
  get referralCode() {
    return this.user?.referralCode || null;
  }
  // Get the Username
  get username() {
    return this.user?.username || null;
  }

  // Auth headers (auto-updates when token changes)
  get authHeaders() {
    return {
      Authorization: this.token ? `Bearer ${this.token}` : "",
      "Content-Type": "application/json",
    };
  }

  // Auth headers for JSON
  get authJsonHeaders() {
    return this.authHeaders;
  }

  // Check if token is expired
  isTokenExpired() {
    if (!this.token) return true;
    try {
      const payload = JSON.parse(atob(this.token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      return now >= payload.exp;
    } catch {
      return true;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token && !!this.user && !this.isTokenExpired();
  }

  // Logout / clear user
  clearUser() {
    localStorage.removeItem("user");
  }
}

export default BaseClass;
