<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait UuidGenerator
{
    protected static function bootUuidGenerator()
    {
        static::creating(function ($model) {
            if (!$model->getKey()) {
                $model->{$model->getKeyName()} = substr(str_replace(array('-'), '', (string) Str::random()), 0, 22);
            }
        });
    }

    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }
}
