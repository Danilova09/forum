export interface User {
  _id: string,
  email: string,
  name: string,
  token: string,
}

export interface RegisterUserData {
  name: string,
  email: string,
  password: string
}

export interface FieldError {
  message: string
}

export interface RegisterError {
  errors: {
    password: FieldError,
    email: FieldError
  }
}
