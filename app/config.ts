// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://a-frame-in-100-lines-nine-dun.vercel.app/';
export const CATS_OR_DOGS_CONTRACT_ADDR = '0xE57f42A0C241FC1Fa3940fE1701DC9C87F01aAF6';
