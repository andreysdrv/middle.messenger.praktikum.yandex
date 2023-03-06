const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function queryStringify(data) {
  let queries = '?';
  for (const key in data) {
    if (data[key]) {
      queries += `${key}=${data[key]}&`;
    }
  }
  return queries.slice(0, -1);
}

export class HTTPTransport {
  get = (url, options: {timeout: number}) => {
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  request(url, options, timeout = 5000) {
    const { method, headers, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, method === METHODS.GET || !data ? url + queryStringify(data) : url);
      xhr.timeout = timeout;

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (headers) {
        for (const key in headers) {
          if (headers[key]) {
            xhr.setRequestHeader(key, headers[key]);
          }
        }
      }

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
