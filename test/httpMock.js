import Vue from 'vue';

function init() {
  Vue.httpCases = [];

  Vue.http.interceptors.unshift((request, next) => {
    const httpCase = Vue.httpCases.find(httpCase => httpCase.method === request.method && httpCase.url === request.url);

    if (httpCase) {
      next(request.respondWith(
        typeof httpCase.body === 'function' ? httpCase.body() : httpCase.body,
        {
          status: httpCase.status
        }
      ));
    } else {
      next(request.respondWith({}, { status: 200 }));
    }
  });
}

export default init;
