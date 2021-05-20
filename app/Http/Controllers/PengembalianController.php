<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\pengembalian as Pengembalian;
use App\Models\pinjaman as Pinjam;
use Illuminate\Support\Facades\DB;

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
    public function getdataPengembalian($search = null)
    {
        $get = DB::table('pinjaman')
            ->select('*', 'pinjaman.status as statusPeminjaman')
            ->join('anggota', function ($join) {
                $join->on('anggota.kode_anggota', '=', 'pinjaman.kode_anggota');
            })
            ->join('pengembalian', function ($join) {
                $join->on('pengembalian.kode_peminjaman', '=', 'pinjaman.kode_peminjaman');
            })
            ->where(["pinjaman.status" => 'done'])
            ->where(function ($q) use ($search) {
                $q->where('anggota.kode_anggota', 'like', '%' . $search . '%')
                    ->orWhere('anggota.isbn_anggota', 'like', '%' . $search . '%')
                    ->orWhere('anggota.nama', 'like', '%' . $search . '%')
                    ->orWhere('pinjaman.tanggal_pinjam', 'like', '%' . $search . '%');
            })
            ->get();
        $responses = [];
        foreach ($get as $value) {
            $troli = DB::table('troli_pinjaman')
                ->join('buku', function ($join) {
                    $join->on('troli_pinjaman.kode_buku', '=', 'buku.kode_buku');
                })
                ->where(['troli_pinjaman.kode_peminjaman' => $value->kode_peminjaman]);
            $resBuku = ["pinjaman" => $value, "dataBuku" => $troli->get(), "jumlahPinjam" => $troli->count()];
            array_push($responses, $resBuku);
        }
        return response()->json($responses);
    }
}
