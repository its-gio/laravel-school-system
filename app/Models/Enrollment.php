<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Enrollment extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'id';

    protected $fillable = [
        'school_id',
        'student_id',
        'course_id',
        'enrollment_date'
    ];
}
