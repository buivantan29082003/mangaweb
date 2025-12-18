<?php
namespace App\Http\Controllers;

use App\Response\DataResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller{

    public function login(Request $request){ 
        $credentials = $request->only('email', 'password');
        $token = Auth::guard('api')->attempt($credentials); 
        if($token){
            return response()->json(new DataResponse("success",[
                "token"=>$token,
                "user"=>auth("api")->user()
            ]));
        }
        return response()->json(new DataResponse("fail","UserName or Password is not exact!!"),400);

    }

    public function refresh(Request $request){  
        try {
            $token=JWTAuth::refresh(JWTAuth::getToken()); 
            return new DataResponse("success",$token);
        } catch (\Throwable $th) {
            return response()->json(new DataResponse("fail","Please try after!!"),400);
        }  
    }

    public function getAccount(){
        try {
            $account=Auth::guard("api")->user();
            return new DataResponse("success",$account,false);
        } catch (\Throwable $th) {
            return response()->json(new DataResponse("fail","Please try after!!"),400);
        }
    }

}