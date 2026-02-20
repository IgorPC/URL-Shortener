<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Link extends Model
{
    protected $table = 'link';

    protected $fillable = [
        'url',
        'short_url',
        'clicks',
        'is_active',
    ];

    public function clicks(): HasMany
    {
        return $this->hasMany(LinkClick::class);
    }
}
