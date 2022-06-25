class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getToDos(page) {
    return fetch(`${this._baseUrl}/v2/?developer=Eugeny&page=${page}`, {}).then(
      (res) => this._getResponseData(res)
    );
  }

  createToDo(username, email, text) {
    return fetch(`${this._baseUrl}/v2/create?developer=Eugeny`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: username,
        email: email,
        text: text,
      }),
    }).then((res) => this._getResponseData(res));
  }

  login(username, password) {
    return fetch(`${this._baseUrl}/v2/login?developer=Eugeny`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: username,
        password: password,
      }),
    }).then((res) => this._getResponseData(res));
  }

  editToDo(toDoId, status, text) {
    return fetch(`${this._baseUrl}/v2/edit/${toDoId}?developer=Eugeny`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: JSON.parse(localStorage.getItem("token")),
        status: status,
        text: text,
      }),
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  baseUrl: "https://uxcandy.com/~shapoval/test-task-backend",
});

export default api;
