<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp;
use App\User;
class UserController extends Controller
{
    public function saveUser(Request $request){
        $code = $request->get('code');
        $client = new GuzzleHttp\Client();
        $res = $client->request('POST', 'https://www.linkedin.com/oauth/v2/accessToken', [
            'form_params' => [
                    'grant_type'     => 'authorization_code',
                    'code'           => $code,
                    'redirect_uri'   => 'http://work-web.test/login',
                    'client_id'      => '77pl1izghz2c8d',
                    'client_secret'  => 'qaVwvb0v0u2XjAyI'
                ]
        ])->getBody()->getContents();
        $responseContent = GuzzleHttp\json_decode($res, true);
        if ($responseContent['access_token']){
            $profileRequest = $client->request('GET', 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,picture-url,email-address)',
                [
                    'headers' => [
                        'Authorization' => 'Bearer ' . $responseContent['access_token']
                    ],
                    'query' => [
                        'format' => 'json'
                    ]
                ])->getBody()->getContents();
            $userProfile = GuzzleHttp\json_decode($profileRequest, true);

            $user = User::where('linkedin_id', $userProfile['id'])->first();
            if(sizeof($user) == 0) {
                $user = new User([
                    'linkedin_id' => $userProfile['id'],
                    'first_name' => $userProfile['firstName'],
                    'last_name' => $userProfile['lastName'],
                    'email' => $userProfile['emailAddress'],
                    'access_token' => $responseContent['access_token'],
                    'expires_at' => date("Y-m-d H:i:s", time() + $responseContent['expires_in']),
                    'profile_picture' => $userProfile['pictureUrl'],
                ]);
                $user->save();
            }
        } else{
            return response()->json(['success' => false, 'message' => 'Accesul nu a fost permis']);
        }

        return response()->json(['success' => true, 'user' => $user]);
    }

    public function deleteUser(Request $request){
        if($request->get('id')){
            $user = User::where('id', $request->get('id'))->first();

            $user->delete();

            return response()->json(['success' => true, 'message' => 'Utilizatorul a fost sters']);
        }
        return response()->json(['false' => true, 'message' => 'Request-ul necesita un ID ca parametru']);
    }
}
