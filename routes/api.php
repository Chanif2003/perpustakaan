<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use SebastianBergmann\Environment\Console;

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
Route::get('/getCouts', [
    App\Http\Controllers\BukuController::class, 'getCouts'
]);

Route::get('/getDataKategoriBuku', [
    App\Http\Controllers\BukuController::class, 'getDataKategoriBuku'
]);

Route::get('getDataByKode/{slug}', [
    \App\Http\Controllers\BukuController::class, 'getDataByKode'
]);

Route::post('/anggota', [
    \App\Http\Controllers\AnggotaController::class, 'action'
]);

Route::get('LaporanDataAnggota/{search?}', [
    \App\Http\Controllers\AnggotaController::class, 'LaporanDataAnggota'
]);

Route::get('/getDataAnggota/{slug?}', [
    \App\Http\Controllers\AnggotaController::class, 'getDataAnggota'
]);

Route::get('/getDataAnggotaById/{slug?}', [
    \App\Http\Controllers\AnggotaController::class, 'getDataAnggotaById'
]);

Route::get('/getDataAnggotaByUserId/{slug}', [
    App\Http\Controllers\AnggotaController::class, 'getDataAnggotaByUserId'
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

Route::get('/LaporanDataBuku/{search?}', [
    App\Http\Controllers\BukuController::class, 'LaporanDataBuku'
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
Route::get('/getDataPeminjamanBukuByIdUser/{slug?}/{kodePinjam?}', [
    App\Http\Controllers\PinjamanController::class, 'getDataPeminjamanBukuByIdUser'
]);
Route::get('/getDataPeminjamanBukuActives/{slug?}/{kodePinjam?}', [
    App\Http\Controllers\PinjamanController::class, 'getDataPeminjamanBukuActives'
]);
Route::get('/cekPeminjaman/{id}', function ($id) {
    $cek = App\Models\pinjaman::where(["kode_anggota" => $id, "status" => 'active'])->count();
    return response()->json($cek);
});
Route::get('/getdataPeminjam/{search?}', [
    App\Http\Controllers\PinjamanController::class, 'getdataPeminjam'
]);
Route::get('/getAllPeminjaman/{slug?}', [
    App\Http\Controllers\PinjamanController::class, 'getAllPeminjaman'
]);



Route::post('/pusdatapengembalian', [
    App\Http\Controllers\PengembalianController::class, 'pusdatapengembalian'
]);
Route::get('/getdataPengembalian/{search?}', [
    App\Http\Controllers\PengembalianController::class, 'getdataPengembalian'
]);

// buku tamu
Route::post('/pushBukuTamu', [
    App\Http\Controllers\BukuTamuController::class, 'pushBukuTamu'
]);
Route::get('/getdataBukuTamu/{slug?}', [
    App\Http\Controllers\BukuTamuController::class, 'getdataBukuTamu'
]);
Route::get('/getdataBukuTamuById/{s?}', [
    App\Http\Controllers\BukuTamuController::class, 'getdataBukuTamuById'
]);

// Dashboard
Route::get('/dashboardResult/{case}/{search?}', [
    App\Http\Controllers\DashboardController::class, 'index'
]);


Route::post('/ProfileChange', [
    App\Http\Controllers\ProfileController::class, 'ProfileChange'
]);


Route::get('/deleteBukutamu/{slug}', function ($id) {
    $del = \App\Models\buku_tamu::whereid($id)->delete();
    if ($del) {
        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
    } else {
        return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
    }
});

Route::get('/deleteAnggota/{slug}', function ($id) {
    $del = \App\Models\anggota::wherekode_anggota($id)->delete();
    if ($del) {
        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
    } else {
        return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
    }
});


Route::get('/getdataPengunjung/{search?}', [
    \App\Http\Controllers\BukuTamuController::class, 'getdataPengunjung'
]);


Route::get('/deletePeminjaman/{id}', function ($id) {
    $peminjaman = \App\Models\pinjaman::wherekodePeminjaman($id)->delete();
    $pengembalian = \App\Models\pengembalian::wherekodePeminjaman($id);
    if ($pengembalian->get()->count() > 0) {
        $delpengembalian = \App\Models\pengembalian::wherekodePeminjaman($id)->delete();
    }
    if ($peminjaman) {
        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
    } else {
        return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
    }
});
Route::get('/deletePengembalian/{slug?}', function ($id) {
    $pengembalian = \App\Models\pengembalian::wherekodePeminjaman($id);
    $delpengembalian = false;
    if ($pengembalian->get()->count() > 0) {
        $delpengembalian = \App\Models\pengembalian::wherekodePeminjaman($id)->delete();
        $peminjaman = \App\Models\pinjaman::wherekodePeminjaman($id)->update(["status" => 'active']);
    }
    if ($delpengembalian) {
        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
    } else {
        return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
    }
});
