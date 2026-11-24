class Login {
  constructor(page) {
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.loginBtn = page.locator("#login");
  }

  async validLogin(username, password) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
}

export default Login;
