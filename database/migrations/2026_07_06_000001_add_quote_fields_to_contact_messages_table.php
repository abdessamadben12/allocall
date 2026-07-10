<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            if (! Schema::hasColumn('contact_messages', 'request_type')) {
                $table->string('request_type')->default('contact')->index()->after('id');
            }

            if (! Schema::hasColumn('contact_messages', 'phone')) {
                $table->string('phone')->nullable()->after('email');
            }

            if (! Schema::hasColumn('contact_messages', 'project_type')) {
                $table->string('project_type')->nullable()->after('phone');
            }

            if (! Schema::hasColumn('contact_messages', 'attachment_path')) {
                $table->string('attachment_path')->nullable()->after('project_type');
            }

            if (! Schema::hasColumn('contact_messages', 'attachment_original_name')) {
                $table->string('attachment_original_name')->nullable()->after('attachment_path');
            }

            if (! Schema::hasColumn('contact_messages', 'attachment_size')) {
                $table->unsignedInteger('attachment_size')->nullable()->after('attachment_original_name');
            }
        });
    }

    public function down(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            foreach (['request_type', 'phone', 'project_type', 'attachment_path', 'attachment_original_name', 'attachment_size'] as $column) {
                if (Schema::hasColumn('contact_messages', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
