import React, { Component } from "react";
import util from "../util";
import styled from "styled-components";
import "antd/dist/antd.css";
import { message, DatePicker } from "antd";

const CloseButton = styled.button`
  padding: 5px;
  background: black;
  font-weight: 300;
  color: white;
`;
const BasketWrapper = styled.div`
  padding: 0px;
  font-weight: thin;
  font-size: 0.75em;
  text-align: left;
  position: fixed;
  top: 200px;
  left: 260px;
  width: 200px;
  height: 100px;
  bottom: 0px;
  border: 0px solid #ffffff;
  padding-left: 0em;
  padding-top: 0.25em;
  max-width: 9.5em;
  height: 2em;
  float: right;
  background-color: transparent;
`;

const ItemTitle = styled.b`
  color: black;
  align-content: center;
  margin-left: 0;
  padding: 0px;
  border: 0px;
  border-top: 0px;
`;

const EmptyBasket = styled.div`
  margin-left: 0;
  padding: 0px;
  border: 0px;
  background: display none;
`;

const MemberID = styled.input`
  background-color: transparent;
  margin-left: 3px;
  padding: 0px;
  border: 1px solid black;
  width: 100px;
`;

const StartTime = styled.select`
  padding: 2px;
  border: 0px solid black;
  width: 100px;
  color: black;
  font-weight: thin;
  font-size: 1em;
  text-align: left;
  color: none;
`;

const EndTime = styled.select`
  padding: 2px;
  border: 0px solid black;
  width: 100px;
  color: black;
  font-weight: thin;
  font-size: 1em;
  text-align: left;
  color: none;
`;

const DateStyled = styled.div`
  background-color: black;
  left: 0;
  padding: 0px;
  border: 0px solid black;
  width: 100px;
  color: white;
  font-weight: thin;
  font-size: 0.5em;
  text-align: left;
  color: none;
`;

const TimeWindow = styled.div`
  background: black;
  margin-left: 3px;
  padding: 0px;
  border: 0px solid black;
  width: 110px;
  color: white;
  font-weight: thin;
  font-size: 1em;
  text-align: left;
  color: white;
  border-right: 3px solid grey;
`;
const FormStyled = styled.form`
  background: black;
  margin-left: 0px;
  padding: 4px;
  border: 3px solid grey;
  width: 120px;
  color: black;
  font-weight: thin;
  font-size: 1em;
  text-align: center;
  color: white;
`;

function validate(memberID, date, starttime, cartItems, endtime) {
  const errors = [];
  if (cartItems.length === 0) {
    errors.push("List is empty");
    message.info("List is blank");
  }
  if (memberID.length === 0) {
    errors.push("Name can't be empty");
    message.info("MemberID cant be empty.");
  }
  if (starttime > endtime) {
    errors.push("Name can't be empty");
    message.info("Start time < Latest Time - Please Adjust");
  }
  if (date.length === 0) {
    errors.push("Must choose Date");
    message.info("Must choose Date");
    console.log(process.env.DB_POST);
  }
  if (starttime.length === 0) {
    errors.push("Must choose time available from");
    message.info("Must choose start time");
  }

  if (memberID.length < 5) {
    errors.push("Member ID is 5 charcters long");
    message.info("Member ID not recognized");
  }
  if (memberID.length > 5) {
    errors.push("Member ID is 5 charcters long");
    message.info("Member ID not recognized");
  }
  return errors;
}
export default class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberID: "",
      date: "",
      starttime: "",
      endtime: "0"
    };
  }
  updateMemberID = newText => {
    this.setState(() => ({
      memberID: newText
    }));
  };
  onDateChange = dateValue => {
    this.setState(() => ({
      date: dateValue
    }));
  };
  onStartTime = startTime => {
    this.setState(() => ({
      starttime: startTime
    }));
  };
  onendTime = endTime => {
    this.setState(() => ({
      endtime: endTime
    }));
  };
  render() {
    const memberID = this.state.memberID;
    const date = this.state.date;
    const starttime = this.state.starttime;
    const endtime = this.state.endtime;
    const submit = e => {
      e.preventDefault();
      const errors = validate(memberID, date, starttime, cartItems, endtime);
      if (errors.length > 0) {
        this.setState({ errors });
        return;
      }
      fetch(`"${process.env.DB_POST}"`, {
        method: "POST",
        body: JSON.stringify({
          cartItems: cartItems,
          memberID: memberID,
          date: date,
          starttime: starttime,
          endtime: endtime
        })
      })
        .then(function() {
          localStorage.clear();
        })
        .catch(function() {
          return alert("There was an error, please try again");
        });

      alert("Thank you :)");
      localStorage.clear();
      return window.location.reload(true);
    };
    const { cartItems } = this.props;
    return (
      <BasketWrapper className="alert alert-info">
        {cartItems.length === 0 ? (
          " "
        ) : (
          <EmptyBasket>
            {cartItems.length} item(s)
            <br />
          </EmptyBasket>
        )}
        <FormStyled onSubmit={submit} size="small">
          <MemberID
            onChange={event => this.updateMemberID(event.target.value)}
            value={this.state.memberID}
            type="memberID"
            name="memberID"
            placeholder="member id"
            required
          />
          <br />
          <br />
          <TimeWindow>
            Time Window
            <DateStyled>
              <DatePicker
                name="date"
                type="date"
                style={{ height: 33 }}
                placeholder="day"
                onChange={date => this.onDateChange(date)}
                format="ddd DD"
                required
              />
            </DateStyled>
            <br />
            <StartTime
              name="starttime"
              type="starttime"
              onChange={event => this.onStartTime(event.target.value)}
            >
              <option value="">Start Time</option>
              <option value="12:00:00.000Z">12pm</option>
              <option value="13:00:00.000Z">1pm</option>
              <option value="14:00:00.000Z">2pm</option>
              <option value="15:00:00.000Z">3pm</option>
              <option value="16:00:00.000Z">4pm</option>
              <option value="17:00:00.000Z">5pm</option>
              <option value="18:00:00.000Z">6pm</option>
              <option value="19:00:00.000Z">7pm</option>
              <option value="20:00:00.000Z">8pm</option>
            </StartTime>
            <br />
            <br />
            <EndTime
              name="endtime"
              type="endtime"
              onChange={event => this.onendTime(event.target.value)}
            >
              <option value="">Latest Time</option>
              <option value="12:00:00.000Z">12pm</option>
              <option value="13:00:00.000Z">1pm</option>
              <option value="14:00:00.000Z">2pm</option>
              <option value="15:00:00.000Z">3pm</option>
              <option value="16:00:00.000Z">4pm</option>
              <option value="17:00:00.000Z">5pm</option>
              <option value="18:00:00.000Z">6pm</option>
              <option value="19:00:00.000Z">7pm</option>
              <option value="20:00:00.000Z">8pm</option>
            </EndTime>
          </TimeWindow>
          <br />
          <b>
            TOTAL:{" "}
            {util.formatCurrency(
              cartItems.reduce((a, c) => a + c.price * c.count, 0)
            )}
          </b>
          <button
            style={{ cursor: "pointer" }}
            onTouchStart={this.onSubmit}
            onClick={void 0}
            className="btn btn-primary"
          >
            checkout
          </button>
        </FormStyled>

        <br />

        {cartItems.length > 0 && (
          <div>
            <ul style={{ marginLeft: 0 }}>
              {cartItems.map(item => (
                <li key={item.id}>
                  <ItemTitle>{item.title}</ItemTitle>
                  <CloseButton
                    style={{ float: "right" }}
                    className="btn btn-danger btn-xs"
                    onClick={e => this.props.handleRemoveFromCart(e, item)}
                  >
                    X
                  </CloseButton>
                  <br />
                  {item.count} x {util.formatCurrency(item.price)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </BasketWrapper>
    );
  }
}
