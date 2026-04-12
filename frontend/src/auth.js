const USERS_KEY = "bravo_users";
const SESSION_KEY = "bravo_session";

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

const writeUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const signUp = async ({
  email,
  password,
  role = "attendee",
  firstName = "",
  lastName = "",
  phone = "",
  gender = "",
  age = "",
}) => {
  const users = readUsers();
  const exists = users.some(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );

  if (exists) {
    return { success: false, error: "Account already exists for this email" };
  }

  const nextUsers = [
    ...users,
    {
      email,
      password,
      role,
      firstName,
      lastName,
      phone,
      gender,
      age,
    },
  ];
  writeUsers(nextUsers);
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email, role }));

  return { success: true, role };
};

export const signIn = async (email, password) => {
  const users = readUsers();
  const found = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );

  if (!found || found.password !== password) {
    return { success: false, error: "Invalid email or password" };
  }

  const role = found.role || "attendee";
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email: found.email, role }),
  );
  return { success: true, role };
};

export const signOut = async () => {
  localStorage.removeItem(SESSION_KEY);
  return { success: true };
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
};
