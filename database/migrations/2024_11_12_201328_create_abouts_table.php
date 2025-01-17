<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    public function up()
    {
        Schema::create('abouts', function (Blueprint $table) {
            $table->id();
            $table->string('title')->default('');
            $table->string('img1')->nullable();
            $table->string('img2')->nullable();
            $table->string('slug1')->default('');
            $table->string('slug2')->default('');
            $table->text('par1')->nullable();
            $table->text('par2')->nullable();
            $table->string('link')->nullable();
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('abouts');
    }
};
