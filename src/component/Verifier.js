import React from "react";
import { SubPanel, StateTag } from "./common";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import { useStore } from "../zokrates/Storage";

export function Verifier() {
  const transactionRecord = useStore((state) => state.transactionRecord);

  return (
    <SubPanel>
      <TableContainer sx={{ width: "650px" , minHeight:"500px"}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ width: "185px", fontSize: "18px" }}
              >
                交易ID
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "240px", fontSize: "18px" }}
              >
                Sender
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "200px", fontSize: "18px" }}
              >
                驗證結果
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(transactionRecord).map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center" sx={{ fontSize: "18px" }}>
                  {row.id}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "18px" }}>
                  {row.from}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "18px" }}>
                  <StateTag
                    style={{
                      marginLeft: "40px",
                      color: "#fff",
                      backgroundColor: colorSet[row.success]["BgColor"],
                    }}
                  >
                    {colorSet[row.success]["Text"]}
                  </StateTag>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SubPanel>
  );
}

const colorSet = {
  true: {
    Text: "成功",
    BgColor: "#219653",
  },
  false: {
    Text: "失敗",
    BgColor: "#eb5757",
  },
};

export const transactionRecordList = [
  {
    txID: 1,
    sender: "BankA",
    success: true,
  },
  {
    txID: 2,
    sender: "BankB",
    success: true,
  },
  {
    txID: 3,
    sender: "BankC",
    success: false,
  },
  {
    txID: 4,
    sender: "BankD",
    success: true,
  },
  {
    txID: 5,
    sender: "BankE",
    success: false,
  },
  {
    txID: 6,
    sender: "BankF",
    success: true,
  },
];
