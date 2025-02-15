<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAboutsTable extends Migration
{
    public function up()
    {
        Schema::create('abouts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug1');
            $table->string('slug2');
            $table->text('par1');
            $table->text('par2');
            $table->string('link')->nullable();
            $table->json('list_items')->nullable();
            $table->string('img1')->nullable();
            $table->string('img2')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('abouts');
    }
}
