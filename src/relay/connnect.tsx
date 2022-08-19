import { render } from "@testing-library/react";
import { io, Socket } from "socket.io-client";
import React from "react";
import { Zokrates } from "../zokrates/Zokrates";
import { Navigate } from "react-router-dom";

export interface TransactionRecord {
  amount: number;
  from: string;
  id: number;
  proof: Object;
  success?: boolean;
  to: string;
  verify?: boolean;
}
export default class Client {
  private socket: Socket;
  private static instance: Client;
  private bank: string = "";

  public static getInstance(url: string) {
    if (!Client.instance) {
      try {
        Client.instance = new Client(url);
      } catch (err) {
        console.log("Socket init error");
      }
    }
    return Client.instance;
  }

  constructor(url: string) {
    
    this.socket = io(url, {
      reconnectionDelayMax: 10000,
    });
    this.socket.on("connect", () => {
      console.log("Connected to relay server");
    });
    this.socket.on("disconnect", () => {
      console.log("Disconnected from relay server");
    });
    this.socket.on("relay", (payload: TransactionRecord) => {
      // do something
      console.log("Received payload from relay:", payload);
      render(<Zokrates  isProof={false} isVerify = {true} payload={payload}/>)
      
    });
  }

  public subscribe = (bank: string) => {
    // if (this.bank) {
    //   throw new Error("You can only subscribe to one bank");
    // }
    this.socket.emit("subscribe", { bank });
    this.bank = bank;
    console.log(`Subscribed to bank ${bank}`);
  };
  public transmit = (id: string, to: string, amount: string, proof: string) => {
    try{
      if (!this.bank) {
        throw new Error("You must subscribe to a bank first");
      }
      this.socket.emit("transmit", {
        id,
        from: this.bank,
        to,
        amount,
        proof,
      });
      console.log(`Payload transmitted to ${to}`);
    }catch(e){
      <Navigate to ='/'/>
    }
   
  };
}
