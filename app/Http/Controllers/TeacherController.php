<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Teacher;
use Illuminate\Support\Facades\Redirect;

class TeacherController extends Controller
{
    public function index() {
        $schoolId = Auth::user()->school_id;
        $teachers = Teacher::where('school_id', $schoolId)->get();
        return Inertia::render('teacher/index', [
            'school_id' => $schoolId,
            'teachers' => $teachers
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'subject' => 'required|string|max:50',
        ]);

        $validated['school_id'] = Auth::user()->school_id;
        Teacher::create($validated);
        return Redirect::route('teacher.index');
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'subject' => 'required|string|max:50',
        ]);

        $teacher = Teacher::where('school_id', Auth::user()->school_id)->findOrFail($id);
        $teacher->update($validated);
        return Redirect::route('teacher.index');
    }
    
    public function destroy($id) {
        $teacher = Teacher::where('school_id', Auth::user()->school_id)->findOrFail($id);
        $teacher->delete();
        return Redirect::route('teacher.index');
    }
}
