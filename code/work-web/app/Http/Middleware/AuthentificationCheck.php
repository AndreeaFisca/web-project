<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use App\User;
use Closure;
use Illuminate\Support\Facades\Input;
use Happyr;
use Mockery\Exception;

class AuthenticationCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // GET Access Token from request
        $access_token = str_replace('Basic', '', $request->header('authorization'));

        // Get Access Token from request if not present in the header
        if (empty($access_token)) {
            $access_token = Input::get('access_token');
        }

        $user = User::where('access_token', $access_token)->first();

        if(!$user){
            echo ("Va rugam sa va autentificati!");
            exit;
        }

        Auth::loginUsingId($user->id);

        return $next($request);
    }
}
