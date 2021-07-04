const api = (data) => {
  var url = "https://en.wikipedia.org/w/api.php";

  var params = {
    action: "query",
    list: "search",
    srsearch: "",
    format: "json",
  };
  params["srsearch"] = data;
  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      //console.log( response);
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

export default api;
