<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class CreateDbController extends Controller
{
    public function index()
    {
        DB::statement(DB::raw('CREATE DATABASE ' . ENV('DB_DATABASE')));
    }
}
