
import VNPAY from "../../assets/images/VNPAY.jpg"
const BankCode=({bankCode, className})=>{ 
    switch (bankCode) {
        case "VNPAY": 
            return <img alt="" src={VNPAY} className={className} /> 
        default:
            <></>
            break;
    }
}

export default BankCode