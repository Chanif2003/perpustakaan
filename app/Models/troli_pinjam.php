<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class troli_pinjam extends Model
{
    use HasFactory;
    protected $table = "troli_pinjaman";
    protected $fillable = ['kode_peminjaman', 'kode_anggota', 'kode_buku', 'tanggal', 'status'];
}
