import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Client from "../relay/connnect.tsx";
import { answerListTemplate} from "../component/Prover"

export const Zokrates = (props) => {
  
  const [proofData, setProofData] = useState([])
  const [pOpen, setPOpen] = useState(true)
  const [vOpen, setVOpen] = useState(false)
  const [payload, setPayload] = useState(props.payload)

  const client = Client.getInstance("https://zk-relay.xyz.day");

  useEffect(()=>{
    // eslint-disable-next-line no-undef
    zokratesInitialize().then((zokratesProvider) => {
      if(props.isProof == true){
        const privateInput = props.payload.privateData
        const source = `def main(field[10] a) -> field {
          field mut count = 0;
          field mut flag = 0;
          for u32 i in 0..${privateInput.length} {
              count = a[i] == 1 ? count + 1 : count;
          }
          flag = count == ${privateInput.length} ? 1 : 0;
          return flag;
        }`;
      
        // compilation
        const artifacts = zokratesProvider.compile(source);
      
        // computation
        const { witness, output } = zokratesProvider.computeWitness(artifacts, [privateInput]);
      
        // run setup
        const keypair = zokratesProvider.setup(artifacts.program);
        // generate proof
        let proof = zokratesProvider.generateProof(artifacts.program, witness, keypair.pk);
        
        console.log('sender vk',keypair.vk )
        console.log('sender proof', proof)

        setProofData({proofData :{curve: proof.curve,inputs: answerListTemplate, proof: proof.proof, scheme: proof.scheme}, vkKey: keypair.vk })
        // setProofData({proofData:proof, vkKey: keypair.vk})
        const isVerified = zokratesProvider.verify(keypair.vk, proof);
        console.log('before:', isVerified)

      }else{
        console.log('pay',payload)
        console.log('receiver vk',payload.proof.vkKey )
        console.log('receiver proof',  payload.proof.proofData)
        const isVerified = zokratesProvider.verify(payload.proof.vkKey, payload.proof.proofData);
        payload.success = isVerified

        let transactionRecord = Array.from(JSON.parse(localStorage.getItem("transactionRecord") || "{}"))
        transactionRecord.unshift(payload);
        localStorage.setItem("transactionRecord", JSON.stringify(transactionRecord));
        console.log('suc', isVerified)
      }
    });
  },[])

  const handleConfirm = () => {
    let id =  Math.floor(Math.random() * (1000)) + 1
    setPOpen(false)
    client.transmit(id, payload.receiver, payload.amount, proofData);
  }
  // const handleView = () => {
  //   setVOpen(false)
  //   console.log('dud',payload.success)
  // }


  const renderConfirmProof = () => {
    return(
      <Dialog
        open={pOpen}
        // onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          確定傳送？
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirm} autoFocus>
            確定
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const renderVerify = () => {
    <Dialog
      open={vOpen}
      // onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">
        收到新交易
      </DialogTitle>
      {/* <DialogActions>
        <Button onClick={handleView} autoFocus>
          查看
        </Button>
      </DialogActions> */}
    </Dialog>
  }
  return (
    <>
      {props.isProof?renderConfirmProof():renderVerify()}
    </>
  )
}