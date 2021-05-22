<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\buku_tamu as BukuTamu;

class DashboardController extends Controller
{
    public function index($case, $search = null)
    {
        switch ($case) {
            case 'kunjungan':
                return response()->json($this->kunjungan($search));
                break;

            default:
                # code...
                break;
        }
    }
    public function kunjungan($search)
    {
        $month = date('m');
        $year = date('Y');
        if ($search != null) {
            if ($search < $year) {
                $month = 12;
                $year = $search;
            }
        }
        $monthltrim = ltrim($month, '0');
        $result = [];
        $resmonth = [];
        $rescount = [];
        for ($i = 1; $i <= $monthltrim; $i++) {
            $bln = $i < 10 ? '0' . $i : ''.$i.'';
            $data = [
                $bln => BukuTamu::where('tanggal', 'like', '%' . $year . '-' . $bln . '%')->get()->count(),
            ];
            array_push($result, $data);
            array_push($resmonth, $bln);
            array_push($rescount, BukuTamu::where('tanggal', 'like', '%' . $year . '-' . $bln . '%')->get()->count());
        }
        $results = ["item" => $result, "month" => $resmonth, "counth" => $rescount];
        return $results;
    }
}
