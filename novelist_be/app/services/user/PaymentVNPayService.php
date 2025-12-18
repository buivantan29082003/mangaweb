<?php

namespace App\Services\User;

use App\Models\Plan;
use Illuminate\Support\Facades\Http;

class PaymentVNPayService implements PaymentInterface
{
    public function createUrl(Plan $plan,$transactionId)
    {
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_ReturnUrl = "http://localhost:3000/user/search";
        $vnp_TmnCode = "2R46TMA5";
        $vnp_HashSecret = "8FKJKX7AENHYH2M4D2V13S9YPP3QICL6";

        $vnp_Version = "2.1.0";
        $vnp_Command = "pay";
        $vnp_IpAddr = request()->ip() ?? '127.0.0.1';

        $vnp_Params = [
            "vnp_Version" => $vnp_Version,
            "vnp_Command" => $vnp_Command,
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $plan->fee * 100,
            "vnp_CurrCode" => "VND",
            "vnp_TxnRef" => $transactionId, 
            "vnp_OrderInfo" => $plan->id,
            "vnp_OrderType" => "billpayment",
            "vnp_ReturnUrl" => $vnp_ReturnUrl,
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => "vn",
        ];

        // Create date + expire date
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $vnp_Params['vnp_CreateDate'] = date('YmdHis');
        $vnp_Params['vnp_ExpireDate'] = date('YmdHis', strtotime('+15 minutes'));

        // Sort parameters
        ksort($vnp_Params);

        $query = "";
        $hashData = "";

        foreach ($vnp_Params as $key => $value) {
            $encodedValue = urlencode($value);
            $encodedValue = str_replace("%20", "+", $encodedValue);

            $hashData .= $key . "=" . $encodedValue . "&";
            $query .= urlencode($key) . "=" . $encodedValue . "&";
        }

        $hashData = rtrim($hashData, "&");
        $query = rtrim($query, "&");

        // HMAC SHA512
        $vnp_SecureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

        $paymentUrl = $vnp_Url . "?" . $query . "&vnp_SecureHashType=HMACSHA512&vnp_SecureHash=" . $vnp_SecureHash;

        return $paymentUrl;
    }

    public function refundOrder($order, $transaction)
    {
        $vnp_TmnCode = config('vnpay.tmn_code');
        $vnp_HashSecret = config('vnpay.secret_key');

        $vnp_RequestId = time();
        $vnp_Version = "2.1.0";
        $vnp_Command = "refund";
        $vnp_TransactionType = "02"; // 02 = full refund
        $vnp_Amount = $order->total_amount * 100;

        $data = implode("|", [
            $vnp_RequestId,
            $vnp_Version,
            $vnp_Command,
            $vnp_TmnCode,
            $vnp_TransactionType,
            $order->id,
            $vnp_Amount,
            $transaction->transaction_id,
            date('YmdHis', strtotime($order->created_at)),
            "SYSTEM",
            date('YmdHis'),
            "127.0.0.1",
            "Refund order " . $order->id
        ]);

        $vnp_SecureHash = hash_hmac('sha512', $data, $vnp_HashSecret);

        $body = [
            "vnp_RequestId" => $vnp_RequestId,
            "vnp_Version" => $vnp_Version,
            "vnp_Command" => $vnp_Command,
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_TransactionType" => $vnp_TransactionType,
            "vnp_TxnRef" => $order->id,
            "vnp_Amount" => $vnp_Amount,
            "vnp_TransactionNo" => $transaction->transaction_id,
            "vnp_TransactionDate" => date('YmdHis', strtotime($order->created_at)),
            "vnp_CreateBy" => "SYSTEM",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_IpAddr" => "127.0.0.1",
            "vnp_OrderInfo" => "Refund order " . $order->id,
            "vnp_SecureHash" => $vnp_SecureHash
        ];

        $response = Http::withHeaders([
            "Content-Type" => "application/json",
        ])->post("https://sandbox.vnpayment.vn/merchant_webapi/api/transaction", $body);

        return $response->json()['vnp_ResponseCode'] === "00";
    }
}
