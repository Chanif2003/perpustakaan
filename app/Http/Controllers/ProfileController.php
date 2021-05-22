<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use \Illuminate\Support\Str;
use App\Models\anggota;
use App\Models\User;

class ProfileController extends Controller
{
    public function ProfileChange(Request $request)
    {

        try {
            if ($request->case == 'foto') {
                $uploads = $this->Upgambar($request, 'img', '/img/User');
                if ($uploads['status']) {

                    $up = anggota::whereuserId($request->userId)->update([
                        $request->case => $uploads['fileName']
                    ]);
                    if ($up) {
                        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
                    } else {
                        return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
                    }
                } else {
                    return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
                }
            } elseif ($request->case == 'password') {
                $data = $request->all();
                unset($data['case']);
                unset($data['table']);
                unset($data['userId']);
                $up = User::whereid($request->userId)->update([
                    "password" => bcrypt($request->password)
                ]);
                if ($up) {
                    return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
                } else {
                    return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
                }
            } else {
                if ($request->table == 'user') {
                    $data = $request->all();
                    unset($data['case']);
                    unset($data['table']);
                    unset($data['userId']);
                    $up = User::whereid($request->userId)->update($data);
                    if ($up) {
                        return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
                    } else {
                        return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
                    }
                } else {
                    if (!empty($request->name)) {
                        $data = $request->all();
                        unset($data['case']);
                        unset($data['table']);
                        unset($data['userId']);
                        $up = User::whereid($request->userId)->update([
                            "name" => $data['name']
                        ]);
                        $up = anggota::whereuserId($request->userId)->update([
                            "nama" => $data['name']
                        ]);
                        if ($up) {
                            return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
                        } else {
                            return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
                        }
                    } else {

                        $data = $request->all();
                        unset($data['case']);
                        unset($data['table']);
                        unset($data['userId']);
                        $up = anggota::whereuserId($request->userId)->update($data);
                        if ($up) {
                            return response()->json(["status" => 200, "msg" => "aksi berhasil"]);
                        } else {
                            return response()->json(["status" => 409, "msg" => "aksi gagal pada database"]);
                        }
                    }
                }
            }
        } catch (\Throwable $th) {
            //throw $th;
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
}
