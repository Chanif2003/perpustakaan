<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTroliPinjamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('troli_pinjaman', function (Blueprint $table) {
            $table->id();
            $table->string('kode_peminjaman', 30);
            $table->integer('kode_anggota');
            $table->integer('isbn_buku');
            $table->date('tanggal');
            $table->integer('status');
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
        Schema::dropIfExists('troli_pinjaman');
    }
}
