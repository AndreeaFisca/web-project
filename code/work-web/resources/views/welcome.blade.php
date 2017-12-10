<!doctype html>
<html lang="{{ app()->getLocale() }}" style="height: 100%">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Work Web App</title>
    <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
</head>
<body style="height: 100%">
<div id="root" class="container-fluid wrapper" style="background: #EDF1F5; height: 100%"></div>
<script src="{{mix('js/app.js')}}" ></script>
</body>
</html>
