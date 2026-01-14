<?php

namespace App\Filament\Resources\ModelNames\Pages;

use App\Filament\Resources\ModelNames\ModelNameResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditModelName extends EditRecord
{
    protected static string $resource = ModelNameResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
