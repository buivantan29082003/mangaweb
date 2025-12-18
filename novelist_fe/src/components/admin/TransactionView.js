import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal"; 
import { formatDate } from "../../services/api/common/FormatDate";
import BankCode from "../common/BankCode";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "linear-gradient(135deg,#1a1a2e,#16213e)",
  boxShadow: 24,
  p: 4,
  maxWidth: 800,
  maxHeight: "80vh",
  overflowY: "auto",
  borderRadius: "8px",
};
export default function TransactionView({ visibleElement, transaction }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 
  return (
    <div>
      <div onClick={handleOpen}>{visibleElement}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="rounded-md text-white text-sm text-sm  w-10/12 md:w-3/12
        overflow-auto
        [&::-webkit-scrollbar]:w-1    <!-- Làm scrollbar nhỏ (width 4px, thay đổi số tùy ý) -->
            [&::-webkit-scrollbar-thumb]:bg-gray-500  <!-- Màu thumb (nút kéo) -->
            [&::-webkit-scrollbar-thumb]:rounded-full <!-- Bo tròn thumb -->
            [&::-webkit-scrollbar-track]:bg-gray-200
        "
          sx={style}
        >
            <p className="text-center font-semibold mb-4 text-xl">Transaction Information</p>
            <div className="flex gap-5 mb-2">
                <p className="w-3/12">TransactionId:</p>
                <p className="w-8/12">{transaction.transactionId}</p>
            </div>
            <div className="flex gap-5 mb-2">
                <p className="w-3/12">CreatedDate:</p>
                <p className="w-8/12">{formatDate(transaction.createdDate)}</p>
            </div>
            <div className="flex gap-5 mb-2">
                <p className="w-3/12">Amount:</p>
                <p className="w-8/12">{transaction.totalAmount} VNĐ</p>
            </div>
            <div className="flex gap-5 mb-2">
                <p className="w-3/12">BankCode:</p>
                <div className="w-8/12">
                    <BankCode bankCode={String(transaction.bankCode).toUpperCase()} className={"w-20 h-20 rounded-md"}/>  
                </div> 
            </div>
        </Box>
      </Modal>
    </div>
  );
}
