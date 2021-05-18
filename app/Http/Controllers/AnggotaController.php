<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use \App\Models\User;
use \App\Models\anggota;
use Illuminate\Support\Facades\DB;
use \Illuminate\Support\Str;

class AnggotaController extends Controller
{
    public function action(Request $request)
    {

        try {
            $post = $request->all();
            unset($post['case']);
            unset($post['images']);
            unset($post['kode_kode_anggota']);
            switch ($request->case) {
                case 'adm-save':
                    $userCreate = $this->inputUsers([
                        "name" => $post['name'],
                        "email" => $post['email'],
                        "password" => $post['password']
                    ]);
                    if ($userCreate['status']) {

                        $rowData = [
                            'kode_anggota' => $this->random(13),
                            'isbn_anggota' => $this->random(13),
                            'user_id' => $userCreate['user']['id'],
                            'nama' => $userCreate['user']['name'],
                            'jenis_klamin' => $post['jenis_klamin'],
                            'tempat_lahir' => $post['tempat_lahir'],
                            'tanggal_lahir' => $post['tanggal_lahir'],
                            'tlp' => $post['tlp'],
                            'alamat' => $post['alamat'],
                            'tahun_masuk' => $post['tahun_masuk'],
                            'foto' => 'default.png',
                            'status' => false
                        ];
                        $saves = new anggota($rowData);
                        if ($saves->save()) {
                            return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
                        } else {
                            return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
                        }
                        return response()->json($rowData);
                    } else {
                        return response()->json(["status" => 500, "msg" => "maaf ini ada kesalahan fatal"]);
                    }
                    break;
                case 'update':
                    return $this->edit($post, $request->kode_anggota);
                    break;

                default:
                    # code...
                    break;
            }
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
        }
    }

    private function edit($req, $kode_anggota)
    {
        $get = anggota::where('kode_anggota', $kode_anggota)->first();
        $dataUpUS = [
            'name' => $req['name'],
            'email' => $req['email'],
        ];
        if ($req['password'] != '********') {
            $dataUpUS += ['password' => bcrypt($req['password'])];
        }
        $rowData = [
            'nama' => $req['name'],
            'jenis_klamin' => $req['jenis_klamin'],
            'tempat_lahir' => $req['tempat_lahir'],
            'tanggal_lahir' => $req['tanggal_lahir'],
            'tlp' => $req['tlp'],
            'alamat' => $req['alamat'],
            'tahun_masuk' => $req['tahun_masuk'],
        ];

        $updateUser = User::whereid($get->user_id)->update($dataUpUS);
        $upDataAnggota = anggota::wherekodeAnggota($kode_anggota)->update($rowData);

        if ($upDataAnggota) {
            return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
        } else {
            return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
        }
    }


    public function inputUsers($data)
    {
        $validator = Validator::make($data, [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return ["status" => false, "msg" => $validator->errors()];
        }
        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($data['password'])]
        ));

        return [
            "status" => true,
            'user' => $user
        ];
    }

    public function Upgambar($request, $nameFile, $path)
    {
        if ($request->hasFile($nameFile)) {
            $validator = Validator::make($request, [
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

    public function getDataAnggota($search = null)
    {
        try {
            $get = DB::table('anggota')
                ->join('users', function ($join) {
                    $join->on('users.id', '=', 'anggota.user_id');
                })
                ->where('anggota.kode_anggota', 'like', '%' . $search . '%')
                ->orWhere('anggota.isbn_anggota', 'like', '%' . $search . '%')
                ->get();
            return response()->json($get);
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
    public function getDataAnggotaById($id)
    {
        $get = DB::table('anggota')
            ->join('users', function ($join) {
                $join->on('users.id', '=', 'anggota.user_id');
            })
            ->where(["kode_anggota" => $id])->first();
        return response()->json($get);
    }
}


// $modelsItem = [
//     'kode_anggota',
//     'isbn_anggota',
//     'user_id',
//     'nama',
//     'jenis_klamin',
//     'tempat_lahir',
//     'tanggal_lahir',
//     'tlp',
//     'alamat',
//     'foto',
//     'tahun_masuk',
//     'status'
// ];