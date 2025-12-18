<?php

namespace App\Services\User;
use App\Services\User\PaymentVNPayService;

class FactoryPaymentService{
    public  function loadPaymentService(string $type):PaymentInterface|null{
        switch ($type) {
            case 'vnpay':
                return app(PaymentVNPayService::class);
                break; 
            default: 
                return null;
        }
    }
}