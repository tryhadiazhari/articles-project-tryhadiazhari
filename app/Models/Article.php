<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $table = 'posts';

    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = ['id'];
}
