import React, { useState } from "react";
import { Title, TitleBox, MainPanel, ListBox } from "../component/common";
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
    setVerifierPage(false);
  };

  const handleVerifierTab = () => {
    setProverPage(false);
    setVerifierPage(true);
  };
  return (
    <div style={{ backgroundColor: "#f8fcf8", flexGrow: "0" }}>
      <TitleBox>
        <Title>ZK WORKSHOP</Title>
      </TitleBox>
      <MainPanel>
        <ListBox>
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
        </ListBox>
        <Container>
          <Title style={{ margin: "20px 0 0 40px", fontSize: "26px" }}>
            {proverPage === true ? "Prover" : "Verifier"}
          </Title>
          {proverPage === true && <Prover />}
          {verifierPage === true && <Verifier />}
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
