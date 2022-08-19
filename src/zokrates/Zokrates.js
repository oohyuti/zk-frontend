import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Client from "../relay/connnect.tsx";
import { answerListTemplate} from "../component/Prover"
import {useStore} from "./Storage"

export const Zokrates = (props) => {

  const [proofData, setProofData] = useState({ proof: null, vkKey:null })
  const [pOpen, setPOpen] = useState(true)
  const [vOpen, setVOpen] = useState(true)
  const [payload] = useState(props.payload)

  const client = Client.getInstance("https://zk-relay.xyz.day");
  const addPayload = useStore(state => state.addPayload);
 
  useEffect(()=>{
    // eslint-disable-next-line no-undef
    zokratesInitialize().then((zokratesProvider) => {
      if(props.isProof === true){

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
        proofData.proof = {curve: proof.curve, inputs: answerListTemplate, proof: proof.proof, scheme: proof.scheme}
        proofData.vkKey = keypair.vk
        setProofData(proofData)

      }
      if(props.isVerify === true){
        const isVerified = zokratesProvider.verify(payload.proof.vkKey, payload.proof.proof);
        payload.success = isVerified
        addPayload(payload)
      }
    });
  },[])

  const handleConfirm = () => {
    let id =  Math.floor(Math.random() * (1000)) + 1
    setPOpen(false)
    client.transmit(id, payload.receiver, payload.amount, proofData);
  }

  const handleView = () => {
    setVOpen(false)
  }

  const renderConfirmProof = () => {
    return(
      <Dialog
        open={pOpen}
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
    return(
      <Dialog
        open={vOpen}
      >
        <DialogTitle id="alert-dialog-title">
          收到新交易
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleView} autoFocus>
            確定
          </Button>
        </DialogActions>
      </Dialog>
    )

  }
  return (
    <>
      {props.isProof && renderConfirmProof()}
      {props.isVerify && renderVerify()}
    </>
  )
}