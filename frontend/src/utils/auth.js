const auth = {
  getToken() {
    return localStorage.getItem('token')
  },
  setToken(token) {
    localStorage.setItem('token', token)
  },
  clear() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  getUser() {
    const raw = localStorage.getItem('user')
    if (!raw) return null
    try {
      return JSON.parse(raw)
    } catch (e) {
      console.log(e);      
      return null
    }
  },
  setUser(user) {
    try {
      localStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
      console.log(e);
    }
  },
  isAuthenticated() {
    return !!this.getToken()
  },
  isAdmin() {
    const user = this.getUser()
    return !!(user && (user.role === 'admin' || user.isAdmin))
  },
  
}

export default auth
