<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Response\DataResponse;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Log;

class UploadFileController extends Controller
{  

public function uploadSingleFile(Request $request)
{
    // try {
        // Lấy file từ request (name="files")
        $file = $request->file('files');

        if (!$file) {
            return response()->json([
                'data' => null,
                'message' => 'no_file_found',
            ], 400);
        }

        // Lấy Cloudinary instance từ service provider
        $cloudinary = app(Cloudinary::class);

        // Upload lên Cloudinary
        $result = $cloudinary
            ->uploadApi()
            ->upload($file->getRealPath(), [
                'folder' => 'novelist',
                 'secure' => false,
                'ssl_verifypeer' => false,
            ]);

        return response()->json(new DataResponse("success",$result['secure_url'], false));

    // } catch (\Exception $e) {
    //     return response()->json([
    //         'data' => null,
    //         'message' => $e->getMessage(),
    //     ], 500);
    // }
}

}
