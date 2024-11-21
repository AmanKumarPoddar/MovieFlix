export const PHOTO_AVATAR =
  "https://avatars.githubusercontent.com/u/147264428?v=4&size=64";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    Authorization: "Authorization: Bearer " + process.env.REACT_APP_TMDB_KEY,
    accept: "application/json",
  },
};
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";
export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/b3a0c5b0-403e-4562-b01f-9d8a0c399942/NP-en-20240827-TRIFECTA-perspective_WEB_3035350d-5154-4510-a5f5-82bea690bfa0_large.jpg";
export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
  { identifier: "nepali", name: "Nepali" },
];

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;
