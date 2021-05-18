<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Buku;
use App\Models\anggota;
use Illuminate\Support\Facades\DB;
use App\Models\pinjaman;

class PinjamanController extends Controller
{
    public function peminjaman(Request $request)
    {
        switch ($request->case) {
            case 'query':
                $get = DB::select($request->queryes);
                return response()->json($get);
                break;

            default:
                # code...
                break;
        }
    }
    public function searchAnggota($search = null)
    {
        $get = DB::table('anggota')
            ->where('anggota.kode_anggota', 'like', '%' . $search . '%')
            ->orWhere('anggota.isbn_anggota', 'like', '%' . $search . '%')
            ->orWhere('anggota.nama', 'like', '%' . $search . '%')
            ->get();

        return response()->json($get);
    }
    public function checkPinjaman($kode)
    {
        try {
            return response()->json(pinjaman::wherekodeAnggota($kode)->count());
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
        }
    }
}
