import React, { useState } from "react";
import {
  SubPanel,
  Subtitle,
  QuestionPanel,
  QuestionCard,
  StateText,
  ButtonPanel,
  SendDataPanel,
} from "./common";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import PaidIcon from "@mui/icons-material/Paid";
import { Zokrates } from "../zokrates/Zokrates";
import { render } from "@testing-library/react";

export function Prover() {
  const [amount, setAmount] = useState(100);
  const [receiver, setReceiver] = useState("旺旺銀行");
  const [sender] = useState(localStorage.getItem("sender"));
  const [questionList, setQuestionList] = useState(questionListTemplate);
  const [privateData, setPrivateData] = useState(["1","1","1","1","1","1","1","1","1","1"])

  // const client = Client.getInstance("https://zk-relay.xyz.day");

  const handleGenerateProof = () => {
    console.log(privateData)
    render(
      <Zokrates isProof = {true} payload = {{receiver, amount, privateData}}/>
    )
  }

  const handleReceiver = (event) => {
    setReceiver(event.target.value);
  };
  const handleAmount = (event) => {
    setAmount(event.target.value);
  };
  const handleSwitch = (event) => {
    privateData[event.target.id] = event.target.checked?"0":"1"
    setPrivateData(privateData)
    
  };

  const renderAmlQuestionList = () => {
    return questionList.map((item, index) => {

      console.log(index)
      return (
        <QuestionCard>
          Q{index + 1}. {item}
          <StateText>
            {/* {privateData[index]==="1"? "false": "true"} */}
            <Switch
              id={index}
              onChange={handleSwitch}
              sx={{ marginLeft: "5px" }}
            />
          </StateText>
        </QuestionCard>
      );
    });
  };

  return (
    <SubPanel>
      <SendDataPanel>
        <Subtitle>
          <SendIcon sx={{ marginRight: "10px" }} />
          Sender : <span style={{ marginLeft: "13px" }}>{sender}</span>
        </Subtitle>
        <Subtitle>
          <MarkAsUnreadIcon sx={{ marginRight: "10px" }} />
          Receiver :
          <TextField
            onChange={handleReceiver}
            sx={{ marginLeft: "20px", width: "70px" }}
            defaultValue={receiver}
            size="small"
            variant="standard"
          />
        </Subtitle>
        <Subtitle>
          <PaidIcon sx={{ marginRight: "10px" }} />
          Amount :
          <TextField
            onChange={handleAmount}
            sx={{ marginLeft: "20px", width: "70px" }}
            defaultValue={amount}
            size="small"
            variant="standard"
          />
        </Subtitle>
      </SendDataPanel>
      <QuestionPanel>{renderAmlQuestionList()}</QuestionPanel>
      <ButtonPanel>
        <Button
          variant="contained"
          onClick={handleGenerateProof}
          sx={{ width: "130px", marginTop: "20px", backgroundColor: "#219653" }}
        >
          產生驗證  
        </Button>
      </ButtonPanel>
    </SubPanel>
  );
}

export const questionListTemplate = [ 
  "是否是外國客戶？",
  "是否是重要政治性職務人是之客戶？",
  "是否為代理人?（例如代表客戶進行交易之律師及會計師）？",
  "是否購買與職業或收入顯不相當之不動產或事業體？",
  "是否有犯罪背景？",
  "是否進行大額交易(新臺幣1.5億元以上)",
  "是否曾設立不易辨識所有人或控制者之複雜法律結構/商業形態?",
  "資金來源是否屬於台灣或國際組織如聯合國公告制裁、禁運或其他類似措施之國家?",
  "客戶或資金來源是否有來自被金融行動工作組（FATF）確認為係防制洗錢與打擊資助恐怖分子具有技術性缺失之國家或受到FATF聲明約束之地區？",
  "是否辨識出客戶或資金來源與高層貪污或其他犯罪活動有關？"
  ]

export const answerListTemplate = [
  "0x0000000000000000000000000000000000000000000000000000000000000001",
  "0x0000000000000000000000000000000000000000000000000000000000000001",
  "0x0000000000000000000000000000000000000000000000000000000000000001",
  "0x0000000000000000000000000000000000000000000000000000000000000001",
  "0x0000000000000000000000000000000000000000000000000000000000000001",
  "0x0000000000000000000000000000000000000000000000000000000000000001",
  "0x0000000000000000000000000000000000000000000000000000000000000001",
  "0x0000000000000000000000000000000000000000000000000000000000000001",
  "0x0000000000000000000000000000000000000000000000000000000000000001",
  "0x0000000000000000000000000000000000000000000000000000000000000001",
  "0x0000000000000000000000000000000000000000000000000000000000000001"]

  