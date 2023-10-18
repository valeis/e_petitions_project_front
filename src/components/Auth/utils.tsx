export function validateEmail(email: string) {
  let error;

  const emailRegex = /^[A-Z0-9._%+-]+@([A-Z0-9.-]+\.[A-Z]{2,}|[A-Z0-9.-])+\.utm\.md$/i;

  if (!email) {
    error = "Email is required";
  } else if (!emailRegex.test(email)) {
    error = "Invalid email address";
  }
  return error;
}

export function validatePassword(password: string) {
  let error;

  if (!password) {
    error = "Password is required";
  } else if (password.length < 8) {
    error = "Password must be 8 characters long";
  }
  return error;
}

export function validateRepeatedPassword(pass: string, value: string) {
  let error;
  console.log(pass, value);
  if (!value) {
    error = "Password is required";
  } else if (value.length < 8) {
    error = "Password must be 8 characters long";
  } else if (pass !== value) {
    error = "Passwords don't match";
  }
  console.log(error);
  return error;
}
