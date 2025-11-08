import { nanoid } from "nanoid";
export const getOrCreateUserId = () => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = nanoid();
    localStorage.setItem("userId", userId);
  }
  return userId;
};
