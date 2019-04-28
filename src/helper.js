import dateFns from "date-fns";

export function fetchData(method = "GET", id = "", options = {}) {
  const apiUrl = process.env.REACT_APP_API_URL;
  return fetch(apiUrl + "/" + id, {
    method,
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(handleErrors)
    .catch(error => console.error("Error:", error));
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function dateFormat(data) {
  return data.map(data => {
    data.invoiceDate = dateFns.format(new Date(data.invoiceDate), "YYYY-MM-DD");
    return data;
  });
}
