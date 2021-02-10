export const sendCard = (data: any) => {
  return fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: `${data}`,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          console.log(err.message);
        });
      }
      return res.json();
    })
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const deleteCard = async (id: any) => {
  const response = await fetch("/api/todos/:id", {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
  const string = await response.text();
  const json = string === "" ? {} : JSON.parse(string);
  return json;
};

export const sendProgress = (data: any) => {
  return fetch("/api/progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: `${data.title}`,
      id: `${data.id}`,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          console.log(err.message);
        });
      }
      return res.json();
    })
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const deleteProgress = async (id: any) => {
  const response = await fetch("/api/progress/:id", {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
  const string = await response.text();
  const json = string === "" ? {} : JSON.parse(string);
  return json;
};

export const sendDone = (data: any) => {
  return fetch("/api/done", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: `${data.title}`,
      id: `${data.id}`,
      price: `${data.price}`,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          console.log(err.message);
        });
      }
      return res.json();
    })
    .then((data) => data)
    .catch((err) => console.log(err));
};
