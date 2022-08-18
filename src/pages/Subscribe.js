import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import Client from "../relay/connnect.tsx";
import { Navigate } from "react-router-dom";

export default class Subscribe extends Component {
  state = {
    identity: "",
    confirm: false,
    client: Client.getInstance("https://zk-relay.xyz.day")
  };

  handleConfirm = () => {
    const { client, identity } = this.state
    this.setState({confirm: true})
    try{
      client.subscribe(identity)
      localStorage.setItem('sender', identity)
    }catch(error){
      console.log(error)
    }
  };

  handleChange = ({target}) => {
    this.setState({ identity: target.value })
  };

  render() {
    const{ confirm } = this.state
    return (
      <Page>
        {confirm && <Navigate to ='/Transfer'/>}
        <MainPanel>
          <TextField
            required
            value={this.state.identity}
            onChange={this.handleChange}
            label="Identity"
            variant="outlined"
          />
          <Button
            sx={{ marginTop: "50px" }}
            variant="contained"
            onClick={this.handleConfirm}
          >
            Confirm
          </Button>
        </MainPanel>
      </Page>
    );
  }
}

export const Page = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 500px;
  border-radius: 40px;
  border: 2px none rgb(255, 255, 255);
  margin: auto;
  margin-top: 50px;
`;
export const MainPanel = styled.div`
  flex-grow: 0;
  width: 500px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.25);

  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
