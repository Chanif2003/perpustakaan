<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Buku;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use \Illuminate\Support\Str;

class BukuController extends Controller
{
    public function ActionDataBuku(Request $request)
    {
        try {
            $post = $request->all();
            unset($post['case']);
            unset($post['image']);
            switch ($request->case) {
                case 'save':
                    $thm = $this->Upgambar($request, 'image', '/img/Buku');
                    if ($thm['status']) {
                        $post = $post + ["image" => $thm['fileName']];
                    }
                    $saves = new Buku($post);
                    if ($saves->save()) {
                        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
                    } else {
                        return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
                    }
                    break;
                case 'update':
                    $thm = $this->Upgambar($request, 'image', '/img/Buku');
                    if ($thm['status']) {
                        $post = $post + ["image" => $thm['fileName']];
                    }
                    if (Buku::wherekodeBuku($request->kode_buku)->update($post)) {
                        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
                    } else {
                        return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
                    }
                    break;
                case 'delete':
                    if (Buku::wherekodeBuku($request->kode_buku)->delete()) {
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

    public function cek_kode($kode)
    {

        $ceks = Buku::wherekode_buku($kode)->count();
        return response()->json($ceks);
    }
    public function getdataBuku($search = null)
    {
        try {
            $get = DB::table('buku')
                ->where('buku.kode_buku', 'like', '%' . $search . '%')
                ->orWhere('buku.judul_buku', 'like', '%' . $search . '%')
                ->orWhere('buku.Kategori', 'like', '%' . $search . '%')
                ->get();


            // $get = Buku::all();
            return response()->json($get);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json([]);
        }
    }
    public function Upgambar($request, $nameFile, $path)
    {
        if ($request->hasFile($nameFile)) {
            $validator = Validator::make($request->all(), [
                $nameFile         => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            ]);
            if ($validator->fails()) {
                return response()->json(["status" => false, "msg" => "tidak valid"]);
            }
            $image = $request->file($nameFile);
            $image_name = Str::random() . time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path($path);
            $image->move($destinationPath, $image_name);
            return ["status" => true, "msg" => "berhasil upload gambar", "fileName" => $image_name];
        } else {
            return ["status" => false, "msg" => "tidak ada gambar"];
        }
    }
    public function getDataByKode($id)
    {
        return response()->json(Buku::wherekodeBuku($id)->first());
    }
    public function getBukuByKodeBuku($kode = null)
    {
        $resData = Buku::wherekodeBuku($kode);
        return response()->json(['count' => $resData->count(), 'result' => $resData->first()]);
    }
    public function searchKategori($slug = null)
    {
        $res = Buku::where('Kategori', 'like', '%' . $slug . '%')->select('Kategori', DB::raw("count(*) as jumlah"))->groupBy('Kategori')->get();
        return response()->json($res);
    }
    public function LaporanDataBuku($search = null)
    {
        $result = Buku::query()->where(function ($q) use ($search) {
            $q->where('kode_buku', 'like', '%' . $search . '%')
                ->orWhere('judul_buku', 'like', '%' . $search . '%')
                ->orWhere('Kategori', 'like', '%' . $search . '%')
                ->orWhere('pengarang', 'like', '%' . $search . '%');
        })->get();
        return response()->json($result);
    }
    public function getCouts()
    {
        $data = [
            "Book" => Buku::all()->count(),
            "Member" => \App\Models\anggota::wherestatus(0)->get()->count(),
            "Pinjaman" => \App\Models\pinjaman::wherestatus('active')->get()->count()
        ];
        return response()->json($data);
    }
    public function getDataKategoriBuku()
    {
        return response()->json(Buku::select('Kategori')->groupBy('Kategori')->get());
    }
}
