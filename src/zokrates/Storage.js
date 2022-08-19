import create from "zustand"
import produce from "immer";

const transactionRecord = Array.from([])
export const useStore = create((set) => ({
  transactionRecord:transactionRecord,
  addPayload: (payload) => set(
    produce((draft) => {  draft.transactionRecord.unshift(payload) }))
}));
