export const isDev = process.env.NODE_ENV === "development";

/**
 * @param name - User name from session
 * @returns First name of the user
 */
export const getFirstName = (name: string | null) => {
  if (!name) {
    return "";
  }
  return name.split(" ")[0];
};
