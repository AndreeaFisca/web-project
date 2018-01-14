<?php
namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Artesaos\LinkedIn\Facades\LinkedIn;
use Happyr;
use Illuminate\Support\Facades\Redirect;
use Happyr\LinkedIn\Http\UrlGenerator;
use GuzzleHttp;

class AuthController extends Controller
{
    public function login(Request $request){
        $linkedIn = new Happyr\LinkedIn\LinkedIn('77pl1izghz2c8d', 'qaVwvb0v0u2XjAyI');

        //if not authenticated
        $url = $linkedIn->getLoginUrl(['redirect_uri' => 'http://work-web.test/login']);

        return response()->json(['success' => true, 'url' => $url]);
    }
}
