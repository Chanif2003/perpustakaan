<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});

Route::get('/cek_kode/{id?}', [
    \App\Http\Controllers\BukuController::class, 'cek_kode'
]);

Route::post('/ActionDataBuku', [
    \App\Http\Controllers\BukuController::class, 'ActionDataBuku'
]);

Route::get('/getdataBuku',[
    \App\Http\Controllers\BukuController::class, 'getdataBuku'
]);

Route::get('getDataByKode/{slug}', [
    \App\Http\Controllers\BukuController::class, 'getDataByKode'
]);