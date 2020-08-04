const isProduction = process.env.NODE_ENV === 'production';

const url = isProduction ? 'https://github.com/jackchen0120/' : 'http://localhost:8088/';

const apiUrl = '/api';  


export {
  apiUrl,
  url
};
