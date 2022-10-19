<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('front/welcome');
});

Auth::routes();
Route::get('/student', 'App\Http\Controllers\Student\StudentController@index')->name('student')->middleware('student');
Route::get('/teacher', 'App\Http\Controllers\Teacher\TeacherController@index')->name('teacher')->middleware('teacher');
Route::get('/admin', 'App\Http\Controllers\Admin\AdminController@index')->name('admin')->middleware('admin');

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
