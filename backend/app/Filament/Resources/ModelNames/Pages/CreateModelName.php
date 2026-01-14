<?php

namespace App\Filament\Resources\ModelNames\Pages;

use App\Filament\Resources\ModelNames\ModelNameResource;
use Filament\Resources\Pages\CreateRecord;

class CreateModelName extends CreateRecord
{
    protected static string $resource = ModelNameResource::class;
}
