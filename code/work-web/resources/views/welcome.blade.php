<!doctype html>
<html lang="{{ app()->getLocale() }}" style="height: 100%">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Work Web App</title>
    <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
    <!-- bower-css:start -->
    <link href="/bower_components/bootstrap-social/bootstrap-social.css" rel="stylesheet">
    <link href="/bower_components/components-font-awesome/css/font-awesome.css" rel="stylesheet">
    <!-- bower-css:end -->

</head>
<body style="height: 100%">
<div id="root" class="container-fluid wrapper" style="height: 100%; padding: 0"></div>
<script src="{{mix('js/app.js')}}" ></script>
<!-- bower-js:start -->
<script src="/bower_components/jquery/dist/jquery.js"></script>
<script src="/bower_components/jquery/dist/jquery.js"></script>
<script src="/bower_components/bootstrap/dist/js/bootstrap.js"></script>
<!-- bower-js:end -->
</body>
</html>
