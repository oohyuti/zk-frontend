import React, { useState } from "react";
import zokrates from "../zokrates/Zokrates";
import { Title, TitleBox, MainPanel } from "../component/common";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import WidgetsIcon from "@mui/icons-material/Widgets";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Prover } from "../component/Prover";
import { Verifier } from "../component/Verifier";

function Transfer() {
  const [proverPage, setProverPage] = useState(true);
  const [verifierPage, setVerifierPage] = useState(false);

  const handleProverTab = () => {
    setProverPage(true);
    setVerifierPage(false)
  };

  const handleVerifierTab = (event) => {
    setProverPage(false);
    setVerifierPage(true)

  };

  return (
    <div style={{ backgroundColor: "#f8fcf8", flexGrow: "0" }}>
      <TitleBox>
        <Title>ZK WORKSHOP</Title>
      </TitleBox>
      <MainPanel>
        <Paper
          sx={{
            marginTop: "10px",
            padding: "5px 10px 0 10px",
            width: "235px",
            height: "100vh",
          }}
        >
          <MenuList>
            <MenuItem
              sx={{
                margin: " 0 0 5px",
                padding: "11px 109px 11px 16px",
                borderRadius: "5px",
                backgroundColor: colorSet[proverPage]["Tab"],
                color: colorSet[proverPage]["Font"],
              }}
              onClick={handleProverTab}
            >
              <WidgetsIcon
                sx={{
                  color: colorSet[proverPage]["Font"],
                  marginRight: "10px",
                }}
              />
              Prover
            </MenuItem>
            <MenuItem
              sx={{
                margin: " 0 0 5px",
                padding: "11px 109px 11px 16px",
                borderRadius: "5px",
                backgroundColor: colorSet[verifierPage]["Tab"],
                color: colorSet[verifierPage]["Font"],
              }}
              onClick={handleVerifierTab}
            >
              <LibraryBooksIcon
                sx={{
                  color: colorSet[verifierPage]["Font"],
                  marginRight: "10px",
                }}
              />
              Verifier
            </MenuItem>
          </MenuList>
        </Paper>
        <Container>
          <Title style={{ margin: "20px 0 0 40px", fontSize: "26px" }}>
            {proverPage === true ? "Prover" : "Verifier"}
          </Title>
          {proverPage === true ? <Prover/> : <Verifier transactionRecord= {Array.from(JSON.parse(localStorage.getItem("transactionRecord") || "{}"))}/>}
        </Container>
      </MainPanel>
    </div>
  );
}

const colorSet = {
  true: {
    Tab: "#196e07",
    Font: "#fff",
  },
  false: {
    Tab: "#fff",
    Font: "#839c8e",
  },
};

export default Transfer;

// zokrates({ dataState: ["1", "0", "1"] }).then(() => {
//   console.log();
// });
// client.transmit("0001", "Bank B", "100", "0x01");
// console.log("success pupu ");
// console.log(result)