<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class School extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'id';

    protected $fillable = [
        'school_name',
        'address',
    ];
}
