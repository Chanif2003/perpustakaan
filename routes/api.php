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

Route::get('/getdataBuku/{slug?}', [
    \App\Http\Controllers\BukuController::class, 'getdataBuku'
]);

Route::get('search_kategori/{slug?}', [
    \App\Http\Controllers\BukuController::class, 'searchKategori'
]);
// Route::get('/getKategori/{slug?}', function(){
//     \App\Models\Buku::
// });

Route::get('getDataByKode/{slug}', [
    \App\Http\Controllers\BukuController::class, 'getDataByKode'
]);

Route::post('/anggota', [
    \App\Http\Controllers\AnggotaController::class, 'action'
]);

Route::get('/getDataAnggota/{slug?}', [
    \App\Http\Controllers\AnggotaController::class, 'getDataAnggota'
]);

Route::get('/getDataAnggotaById/{slug?}', [
    \App\Http\Controllers\AnggotaController::class, 'getDataAnggotaById'
]);

Route::post('/peminjaman', [
    \App\Http\Controllers\PinjamanController::class, 'peminjaman'
]);
Route::get('/searchAnggota/{slug?}', [
    \App\Http\Controllers\PinjamanController::class, 'searchAnggota'
]);

Route::get('/searchAnggotaPeminjaman/{param?}', [
    \App\Http\Controllers\PinjamanController::class, 'searchAnggotaPeminjaman'
]);

// ///////// pinjaman 
Route::get('/checkPinjaman/{slug?}', [
    \App\Http\Controllers\PinjamanController::class, 'checkPinjaman'
]);
Route::get('/getBukuByKodeBuku/{slug?}', [
    App\Http\Controllers\BukuController::class, 'getBukuByKodeBuku'
]);

Route::post('/pushPeminjamanBuku', [
    \App\Http\Controllers\PinjamanController::class, 'pushPeminjamanBuku'
]);
Route::get('/getDataPeminjamanBuku/{slug?}', [
    \App\Http\Controllers\PinjamanController::class, 'getDataPeminjamanBuku'
]);
Route::get('/updateModive/{slug?}', [
    \App\Http\Controllers\PinjamanController::class, 'updateModive'
]);
Route::get('/getlistpeminjaman', [
    \App\Http\Controllers\PinjamanController::class, 'getlistpeminjaman'
]);
Route::get('/getStoryPeminjaman/{slug?}', [
    App\Http\Controllers\PinjamanController::class, 'getStoryPeminjaman'
]);


Route::post('/pusdatapengembalian', [
    App\Http\Controllers\PengembalianController::class, 'pusdatapengembalian'
]);
