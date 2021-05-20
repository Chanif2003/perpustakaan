<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Buku;
use App\Models\anggota;
use Illuminate\Support\Facades\DB;
use App\Models\pinjaman;
use Illuminate\Support\Facades\Validator;
use App\Models\troli_pinjam;

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
    public function searchAnggotaPeminjaman($search = null)
    {
        $get = DB::table('pinjaman')
            ->join('anggota', function ($join) {
                $join->on('anggota.kode_anggota', '=', 'pinjaman.kode_anggota');
            })
            ->where(["pinjaman.status" => 'active'])
            ->where(function ($q) use ($search) {
                $q->where('anggota.kode_anggota', 'like', '%' . $search . '%')
                    ->orWhere('anggota.isbn_anggota', 'like', '%' . $search . '%')
                    ->orWhere('anggota.nama', 'like', '%' . $search . '%');
            })
            ->get();

        return response()->json($get);
    }
    public function checkPinjaman($kode)
    {
        try {
            return response()->json(pinjaman::where(["kode_anggota" => $kode, 'status' => 'active'])->count());
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
        }
    }
    public function pushPeminjamanBuku(Request $request)
    {

        try {
            $post = $request->all();

            $validMember = Validator::make($post['member'], [
                'kode_anggota' => 'required'
            ]);
            $validPinjam = Validator::make($post['pinjaman'], [
                'tanggal_pinjam' => 'required',
                'lama_pinjam' => 'required',
            ]);

            if ($validMember->fails() || $validPinjam->fails()) {
                return response()->json(["status" => 500, "msg" => "sepertinya ada input yang masi kosong"]);
            }


            // ---------------------------------------

            switch ($request->case) {
                case 'save':
                    $peminjaman_data = [
                        "kode_peminjaman" => $this->random(8),
                        "kode_anggota"   => $post['member']['kode_anggota'],
                        "tanggal_pinjam" => $post['pinjaman']['tanggal_pinjam'],
                        "lama_pinjam"    => $post['pinjaman']['lama_pinjam'],
                        "detail"         => $post['pinjaman']['detail'],
                        "status"         => "active"
                    ];
                    $tb_pijam = pinjaman::create($peminjaman_data);
                    // $tb_troli = troli_pinjam::
                    $valid = true;
                    foreach ($post['troli_pinjaman'] as $values) {

                        $troliBuku = new troli_pinjam([
                            'kode_peminjaman'   => $tb_pijam->kode_peminjaman,
                            'kode_anggota'      => $post['member']['kode_anggota'],
                            'kode_buku'         => $values['kode_buku'],
                            'tanggal'           => $post['pinjaman']['tanggal_pinjam'],
                            'status'            => 1
                        ]);

                        if ($troliBuku->save() === false) {
                            $valid = false;
                        }
                    }
                    if ($valid) {
                        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
                    } else {
                        pinjaman::wherekodePeminjaman($tb_pijam->kode_peminjaman)->delete();
                        return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
                    }
                    break;
                case 'update':
                    $peminjaman_data = [
                        "kode_anggota"   => $post['member']['kode_anggota'],
                        "tanggal_pinjam" => $post['pinjaman']['tanggal_pinjam'],
                        "lama_pinjam"    => $post['pinjaman']['lama_pinjam'],
                        "detail"         => $post['pinjaman']['detail'],
                        "status"         => "active"
                    ];
                    $ups = pinjaman::wherekodePeminjaman($request->kode_peminjaman)->update($peminjaman_data);
                    $valid = true;
                    if ($ups) {
                        $getsdata = pinjaman::wherekodePeminjaman($request->kode_peminjaman)->first();
                        troli_pinjam::where(["kode_peminjaman" => $request->kode_peminjaman])->delete();
                        foreach ($post['troli_pinjaman'] as $values) {

                            $troliBuku = new troli_pinjam([
                                'kode_peminjaman'   => $getsdata->kode_peminjaman,
                                'kode_anggota'      => $post['member']['kode_anggota'],
                                'kode_buku'         => $values['kode_buku'],
                                'tanggal'           => $post['pinjaman']['tanggal_pinjam'],
                                'status'            => 1
                            ]);

                            if ($troliBuku->save() === false) {
                                $valid = false;
                            }
                        }
                    }
                    if ($valid) {
                        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
                    } else {
                        return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
                    }
                    break;

                default:
                    # code...
                    break;
            }
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
        }
    }
    public function random($length = 8)
    {
        $data = '1234567810';
        $string = '';
        for ($i = 0; $i < $length; $i++) {
            $pos = rand(0, strlen($data) - 1);
            $string .= $data{
                $pos};
        }
        return $string;
    }
    public function getDataPeminjamanBuku($kode_anggaota = null)
    {
        try {

            $get = DB::table('pinjaman')
                ->select('*', 'pinjaman.status as statusPeminjaman')
                ->join('anggota', function ($join) {
                    $join->on('anggota.kode_anggota', '=', 'pinjaman.kode_anggota');
                })
                ->where(['anggota.kode_anggota' => $kode_anggaota, "pinjaman.status" => 'active'])
                ->first();

            $troli = DB::table('troli_pinjaman')
                ->join('buku', function ($join) {
                    $join->on('troli_pinjaman.kode_buku', '=', 'buku.kode_buku');
                })
                ->where(['troli_pinjaman.kode_peminjaman' => $get->kode_peminjaman])
                ->get();
            $result = [
                "peminjaman" => $get,
                "troli"     => $troli
            ];

            return response()->json($result);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
        }
    }
    public function getDataPeminjamanBukuByIdUser($kode_anggaota = null)
    {
        try {

            $get = DB::table('pinjaman')
                ->join('anggota', function ($join) {
                    $join->on('anggota.kode_anggota', '=', 'pinjaman.kode_anggota');
                })
                ->join('pengembalian', function ($join) {
                    $join->on('pengembalian.kode_peminjaman', '=', 'pinjaman.kode_peminjaman');
                })
                ->where(['anggota.kode_anggota' => $kode_anggaota])
                ->first();

            $troli = DB::table('troli_pinjaman')
                ->join('buku', function ($join) {
                    $join->on('troli_pinjaman.kode_buku', '=', 'buku.kode_buku');
                })
                ->where(['troli_pinjaman.kode_peminjaman' => $get->kode_peminjaman])
                ->get();
            $result = [
                "peminjaman" => $get,
                "troli"     => $troli
            ];

            return response()->json($result);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
        }
    }
    public function getlistpeminjaman()
    {
        $get = DB::table('pinjaman')
            ->join('anggota', function ($join) {
                $join->on('anggota.kode_anggota', '=', 'pinjaman.kode_anggota');
            })
            ->where(["pinjaman.status" => 'active'])
            ->get();
        return response()->json($get);
    }
    public function updateModive($slug)
    {
        // pinjaman::where
    }
    public function getStoryPeminjaman($kode_anggota)
    {
        try {
            $get = DB::table('pinjaman')
                ->join('anggota', function ($join) {
                    $join->on('anggota.kode_anggota', '=', 'pinjaman.kode_anggota');
                })
                ->join('pengembalian', function ($join) {
                    $join->on('pengembalian.kode_peminjaman', '=', 'pinjaman.kode_peminjaman');
                })
                ->where(["pinjaman.status" => 'done', "pinjaman.kode_anggota" => $kode_anggota])
                ->get();
            return response()->json($get);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
