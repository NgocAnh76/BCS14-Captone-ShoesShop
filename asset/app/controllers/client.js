export class Client {
  constructor(email, password, name, phone, gender) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.phone = phone;
    this.gender = gender === "true";
  }
}
