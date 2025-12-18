<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cloudinary Credentials
    |--------------------------------------------------------------------------
    */

    'cloud' => env('CLOUDINARY_CLOUD_NAME'),

    'key' => env('CLOUDINARY_API_KEY'),

    'secret' => env('CLOUDINARY_API_SECRET'),

    /*
    |--------------------------------------------------------------------------
    | Secure URLs
    |--------------------------------------------------------------------------
    */
    'secure' => true,

    /*
    |--------------------------------------------------------------------------
    | Optional Notification URL (Webhook)
    |--------------------------------------------------------------------------
    */
    'notification_url' => env('CLOUDINARY_NOTIFICATION_URL'),

    /*
    |--------------------------------------------------------------------------
    | Optional Settings (Not required for basic usage)
    |--------------------------------------------------------------------------
    */
    'upload_preset' => env('CLOUDINARY_UPLOAD_PRESET'),
    'upload_route' => env('CLOUDINARY_UPLOAD_ROUTE'),
    'upload_action' => env('CLOUDINARY_UPLOAD_ACTION'),
];
