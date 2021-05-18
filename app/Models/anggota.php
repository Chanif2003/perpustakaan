<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class anggota extends Model
{
    use HasFactory;
    protected $table = 'anggota';
    protected $fillable = [
        'kode_anggota',
        'isbn_anggota',
        'user_id',
        'nama',
        'jenis_klamin',
        'tempat_lahir',
        'tanggal_lahir',
        'tlp',
        'alamat',
        'foto',
        'tahun_masuk',
        'status'
    ];
}
