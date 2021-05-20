<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class buku_tamu extends Model
{
    use HasFactory;
    protected $table = 'buku_tamu';
    protected $fillable = [
        "nama",
        "kelas",
        "tanggal",
        "keperluan",
    ];
}
