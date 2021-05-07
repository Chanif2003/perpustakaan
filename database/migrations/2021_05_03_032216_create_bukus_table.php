<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBukusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('buku', function (Blueprint $table) {
            $table->string('kode_buku', 30)->primary();
            $table->string('judul_buku', 200);
            $table->string('Kategori', 50);
            $table->string('penerbit', 100);
            $table->string('pengarang', 100);
            $table->integer('jumlah_halaman');
            $table->integer('stok');
            $table->string('tahun_terbit');
            $table->string('image', 200);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('buku');
    }
}
