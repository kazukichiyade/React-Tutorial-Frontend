import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';

// 取得
const getAll = () => {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  };
  return request.then(response => response.data.concat(nonExisting));
};

// 新規作成
const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
};

// 更新
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

export default { getAll, create, update };
