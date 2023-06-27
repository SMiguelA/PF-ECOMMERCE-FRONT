const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLoginForm = (name, email, password, picture, user) => {
  const errors = {};
  console.log(user);

  if (!name) {
    errors.name = "Enter a username";
  }

  if (!email) {
    errors.email = "Enter your email address.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Enter your password.";
  } else if (password.length > 15) {
    errors.password = "Password cannot exceed 15 characters.";
  } else {
    const numberRegex = /\d/g;
    const numberCount = (password.match(numberRegex) || []).length;
    if (numberCount < 2) {
      errors.password = "Password must contain at least 2 numbers.";
    }
  }

  if (!picture) {
    errors.picture = "You must upload a profile picture";
  }

  if (user) {
    if (user === "Email") {
      errors.email = "This email is already registered, use another one.";
    } else if (user === "Name") {
      errors.name = "This name is already in use, choose another.";
    }
  }

  return errors;
};
