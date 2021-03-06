<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/print-Laporan/{case}/{search?}', [
    \App\Http\Controllers\LaporanController::class, 'index'
]);

Route::get('/{slug?}', function () {
    return view('index');
});

Route::get('/{slug?}/{slugs?}', function () {
    return view('index');
});
