import React, { Component } from "react";
import api from "./commons/api";
import "./input.css";
class Input extends Component {
  state = {
    data: "",
    result: [],
    error: [],
  };
  handleClick = () => {
    // const response=api(data);
    // console.log(response);

    var url = "https://en.wikipedia.org/w/api.php";

    var params = {
      action: "query",
      list: "search",
      srsearch: this.state.data,
      format: "json",
    };
    url = url + "?origin=*";
    Object.keys(params).forEach(function (key) {
      url += "&" + key + "=" + params[key];
    });

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        //console.log( response);
        this.setState({ result: response, isLoaded: true });
      })
      .catch((error) => {
        //console.log(error);
        this.setState({ error, isLoaded: false });
      });
  };
  handleChange = ({ currentTarget }) => {
    this.setState({ data: currentTarget.value });
  };

  render() {
    const { result } = this.state;
    console.log(result);
    return (
      <React.Fragment>
        <div className="row">
          <div className="input-group mb-3 mt-5">
            <label htmlFor="name" className="input-group mb-3">
              WIKI FOR YOU
            </label>
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control"
              aria-label="name"
              aria-describedby="basic-addon2"
            />

            <div className="input-group-append">
              <button className="btn btn-outline-secondary ml-2" type="button">
                <i
                  onClick={() => this.handleClick()}
                  className="fa fa-search"
                ></i>
              </button>
            </div>
          </div>
        </div>

        <table className="table">
          <tbody>
            {result.length === 0
              ? "Type..."
              : result.query.search.map((r) => (
                  <a href={`https://en.wikipedia.org/wiki/${r.title}`}>
                    <tr key={r.title}>
                      <td style={{ fontFamily: "monospace", color: "orange" }}>
                        {r.title}
                      </td>
                      <td>{r.snippet.replace(/<\/?span[^>]*>/g, "")}</td>
                    </tr>
                  </a>
                ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Input;
