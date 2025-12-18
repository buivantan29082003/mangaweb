<?php

namespace App\Services\User;

use App\Models\Plan;

interface PaymentInterface
{
    public function createUrl(Plan $plan, int $userId);
    // public function refundPayment($order, $transaction);
    // public function handleCallback($request);
}
