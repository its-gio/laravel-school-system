<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/teachers', [TeacherController::class, 'index'])->name('teacher.index');
    Route::post('/teachers', [TeacherController::class, 'store'])->name('teacher.store');
    Route::put('/teachers/{id}', [TeacherController::class, 'update'])->name('teacher.update');
    Route::delete('/teachers/{id}', [TeacherController::class, 'destroy'])->name('teacher.destroy');

    Route::get('/students', [StudentController::class, 'index'])->name('student.index');
    Route::post('/students', [StudentController::class, 'store'])->name('student.store');
    Route::put('/students/{id}', [StudentController::class, 'update'])->name('student.update');
    Route::delete('/students/{id}', [StudentController::class, 'destroy'])->name('student.destroy');
});

require __DIR__.'/settings.php';
