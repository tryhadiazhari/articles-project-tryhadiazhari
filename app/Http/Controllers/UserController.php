<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    use ApiResponser;

    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|alpha_num:ascii',
            'password' => 'required'
        ]);

        $user = User::where('username', $request->username)->first();

        if ($user) return $this->errorResponse('Username already registered', 409, 40901);

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        // $success['token'] =  $user->createToken('Personal Access Token')->plainTextToken;
        $success['username'] =  $user->username;

        return $this->showOne($success);
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|alpha_num:ascii',
            'password'  => 'required',
        ]);


        if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            $user = Auth::user();

            $success['access_token']    =  $user->createToken('Personal Access Token')->plainTextToken;
            $success['username']       =  $user->level;
            $success['created_at']    =  $user->created_at;

            return $this->showOne($success);
        }

        return $this->errorResponse('Incorrect username or password', 401, 40100);
    }
}
