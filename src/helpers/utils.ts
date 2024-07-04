export const omit = (obj: { [key: string]: any }, keys: string[]) => {
  return Object.fromEntries(Object.entries(obj).filter((pair) => !keys.includes(pair[0])));
};

export const AI_API_URL = import.meta.env.VITE_AI_API_URL;
