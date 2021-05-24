<?php

namespace App\Http\Controllers;

use App\Models\anggota;
use App\Models\Buku;
use App\Models\buku_tamu;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade;
use Illuminate\Support\Facades\DB;
use PDF as PDF;

class LaporanController extends Controller
{
    public function index($case, $search = null)
    {
        try {
            switch ($case) {
                case 'pinjaman':
                    $pdf = Facade::loadview('print/Laporan-peminjaman', $this->peminjaman($search))->setPaper('A4', 'portrait');
                    return $pdf->stream();
                case 'pengembalian':
                    $pdf = Facade::loadview('print/laporan-pengembalian', $this->pengembalian($search))->setPaper('A4', 'portrait');
                    return $pdf->stream();
                    break;
                case 'pengunjung':
                    $pdf = Facade::loadview('print/laporan-pengunjung', $this->pengunjung($search))->setPaper('A4', 'portrait');
                    return $pdf->stream();
                    break;
                case 'buku':
                    $pdf = Facade::loadview('print/laporan-buku', $this->buku($search))->setPaper('A4', 'portrait');
                    return $pdf->stream();
                    break;
                case 'anggota':
                    $pdf = Facade::loadview('print/laporan-anggota', $this->anggota($search))->setPaper('A4', 'portrait');
                    return $pdf->stream();
                    break;
                default:
                    break;
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
    public function pengunjung($search)
    {
        $run = buku_tamu::query()->where(function ($q) use ($search) {
            $q->where('tanggal', 'like', '%' . $search . '%')
                ->orWhere('nama', 'like', '%' . $search . '%');
        })->get();
        $data = [
            'kop'   => $this->configReport(),
            'data'  => $run,
            'title' => 'Data pengengunjung'
        ];
        return $data;
    }
    public function pengembalian($search)
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
        $data = [
            'title' => 'Welcome to belajarphp.net',
            'kop'   => $this->configReport(),
            'data'  => $responses,
            'title' => 'Data pengembalian'
        ];
        return $data;
    }
    public function peminjaman($search)
    {
        $get = DB::table('pinjaman')
            ->select('*', 'pinjaman.status as statusPeminjaman')
            ->join('anggota', function ($join) {
                $join->on('anggota.kode_anggota', '=', 'pinjaman.kode_anggota');
            })
            ->where(["pinjaman.status" => 'active'])
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
        $data = [
            'title' => 'Welcome to belajarphp.net',
            'kop'   => $this->configReport(),
            'data'  => $responses,
            'title' => 'Data peminjaman'
        ];
        return $data;
    }

    public function buku($search)
    {
        $result = Buku::query()->where(function ($q) use ($search) {
            $q->where('kode_buku', 'like', '%' . $search . '%')
                ->orWhere('judul_buku', 'like', '%' . $search . '%')
                ->orWhere('Kategori', 'like', '%' . $search . '%')
                ->orWhere('pengarang', 'like', '%' . $search . '%');
        })->get();
        $data = [
            'kop'   => $this->configReport(),
            'data'  => $result,
            'title' => 'Data Buku'
        ];
        return $data;
    }

    public function anggota($search)
    {
        $result = anggota::query()->where(function ($q) use ($search) {
            $q->where('kode_anggota', 'like', '%' . $search . '%')
                ->orWhere('isbn_anggota', 'like', '%' . $search . '%')
                ->orWhere('nama', 'like', '%' . $search . '%');
        })->get();
        $data = [
            'kop'   => $this->configReport(),
            'data'  => $result,
            'title' => 'Data Buku'
        ];
        return $data;
    }

    public function configReport()
    {
        return [
            "kepalaSurat" => "SMK N 1 Benai",
            "SubTitle"    => "Kuantan Singingi 2021"
        ];
    }
}
