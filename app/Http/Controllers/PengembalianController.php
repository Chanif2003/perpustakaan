<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\pengembalian as Pengembalian;
use App\Models\pinjaman as Pinjam;

class PengembalianController extends Controller
{
    public function pusdatapengembalian(Request $request)
    {
        try {
            switch ($request->case) {
                case 'save':

                    $post = $request->all();

                    $data = [
                        'kode_peminjaman'   => $post['kode_peminjaman'],
                        'tanggal_kembali'   => $post['tanggal_kembali'],
                        'kode_anggota'      => $post['kode_anggota'],
                        'catatan'           => $post['catatan']
                    ];

                    $obj = new Pengembalian($data);

                    if ($obj->save()) {
                        Pinjam::where(["kode_peminjaman" => $post['kode_peminjaman']])->update([
                            "status" => 'done'
                        ]);
                        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
                    } else {
                        return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
                    }


                    break;

                default:
                    # code...
                    break;
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
