<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@test.com'],
            [
                'name' => 'GDawg',
                'password' => 'password',
                'tenant_id' => 1,
                'email_verified_at' => now(),
                ]
            );

        Tenant::firstOrCreate(
            [
                'school_name' => 'Roccia School',
                'address' => '1234 Bolder Ave',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
