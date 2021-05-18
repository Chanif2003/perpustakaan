<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pinjaman extends Model
{
    use HasFactory;
    protected $table = 'pinjaman';
    protected $fillable = [
        "kode_peminjaman",
        "kode_anggota",
        "tanggal_pinjam",
        "lama_pinjam",
        "detail",
        "status"
    ];
}
