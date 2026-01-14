<?php

namespace App\Filament\Resources\ModelNames\Pages;

use App\Filament\Resources\ModelNames\ModelNameResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListModelNames extends ListRecords
{
    protected static string $resource = ModelNameResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
