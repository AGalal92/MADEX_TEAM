<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\WorkCategoryController;
use App\Http\Controllers\WorkController;

// Route::get('/', function () {
//     return view('home');
// });
Route::get('/', [LandingPageController::class, 'index'])->name('home');
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/about/edit', [AboutController::class, 'edit'])->name('about.edit');
    Route::put('/about/update', [AboutController::class, 'update'])->name('about.update');
    Route::resource('work-categories', WorkCategoryController::class);
    Route::resource('works', WorkController::class);
});

require __DIR__ . '/auth.php';
