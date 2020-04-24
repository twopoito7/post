import React, { Component } from "react";
export default class Products extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">{`${this.props.count} items`}</div>
        <div className="col-md-4">
          <label>
            Filter
            <br />
            <select
              className="form-control"
              value={this.props.sort}
              onChange={this.props.handleSortChange}
            >
              <option value="lowestprice">Newest First</option>
              <option value="highestprice">Oldest First</option>
            </select>
          </label>
        </div>
        <div className="col-md-4">
          <br />
          <label>
            {" "}
            <select
              className="form-control"
              value={this.props.size}
              onChange={this.props.handleSizeChange}
            >
              <option value="">ALL</option>
              <option value="x">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}
