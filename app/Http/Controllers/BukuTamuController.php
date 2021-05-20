<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\buku_tamu;
use Illuminate\Support\Facades\Validator;

class BukuTamuController extends Controller
{
    //
    public function pushBukuTamu(Request $request)
    {
        try {
            $post = $request->all();
            unset($post['case']);
            switch ($request->case) {
                case 'save':
                    if ($this->Save($post)) {
                        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
                    } else {
                        return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
                    }
                    break;
                case 'update':
                    unset($post['id']);
                    if ($this->update($post, $request->id)) {
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
    private function Save($data)
    {
        $validate = Validator::make($data, [
            "nama"      => 'required',
            "kelas"     => 'required',
            "tanggal"   => 'required',
            "keperluan" => 'required',
        ]);

        if ($validate->fails()) {
            return [$validate->errors()->toJson(), 400];
        }
        $push = new buku_tamu($validate->validated());

        if ($push->save()) {
            return true;
        } else {
            return false;
        }
    }
    private function update($data, $id)
    {
        $validate = Validator::make($data, [
            "nama"      => 'required',
            "kelas"     => 'required',
            "tanggal"   => 'required',
            "keperluan" => 'required',
        ]);

        if ($validate->fails()) {
            return [$validate->errors()->toJson(), 400];
        }
        $push = buku_tamu::whereid($id)->update($validate->validated());

        if ($push) {
            return true;
        } else {
            return false;
        }
    }
    public function getdataBukuTamu($search = null)
    {
        try {
            $run = buku_tamu::query()->where(function ($q) use ($search) {
                $q->where('tanggal', 'like', '%' . $search . '%');
            })->get();
            return response()->json($run);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
        }
    }
    public function getdataBukuTamuById($id)
    {
        try {
            $run = buku_tamu::whereid($id)->first();
            return response()->json($run);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json(["status" => 500, "msg" => "gagal kesalahan query"]);
        }
    }
}
