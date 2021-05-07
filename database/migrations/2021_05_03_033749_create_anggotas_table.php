<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnggotasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('anggota', function (Blueprint $table) {
            $table->string('kode_anggota', 30)->primary();
            $table->string('isbn_anggota', 30);
            $table->integer('user_id');
            $table->string('nama',100);
            $table->string('jenis_klain',100);
            $table->string('tempat_lahir',100);
            $table->date('tanggal_lahir');
            $table->string('tlp',15);
            $table->text('alamat');
            $table->string('foto',100);
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
        Schema::dropIfExists('anggota');
    }
}
