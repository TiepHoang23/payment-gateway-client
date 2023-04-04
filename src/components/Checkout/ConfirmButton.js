import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthContext";

const ConfirmButton = (props) => {

    const { cartDetail, total, discount, discountAmount, voucher, final } = props;

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleCreateOrder = () => {
        /*
        
        console.log(total);
        
        
        // Amount
        console.log(discountAmount);
        console.log(final);
        */

        fetch('https://shopmee-server-2.onrender.com/confirmOrder', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${user.token}`
            },
            body: JSON.stringify({
                voucherUsed: voucher,
                discount: discount,
                itemList: cartDetail,
                total: total,
                discountAmount: discountAmount,
                final: final
            })
        })
            .then(res => {
                if (!res.ok) { throw res }
                return res.json()
            })
            .then(data => {
                navigate('/')
                toast.success(data)
            })
            .catch(e => {
                e.json().then(err => {
                    toast.error(err)
                })
            })
    }

    return (
        <button className="btn btn-primary" onClick={handleCreateOrder}>Place order</button>
    );
}

export default ConfirmButton;