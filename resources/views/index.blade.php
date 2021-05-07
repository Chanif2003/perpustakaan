<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>React Laravel</title>
    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('font/Font-Awesome-master/css/all.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('font/awesome/css/line-awesome.min.css') }}" />
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
    <div id="root"></div>
    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>
