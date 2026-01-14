<?php

namespace App\Filament\Resources\ModelNames;

use App\Filament\Resources\ModelNames\Pages\CreateModelName;
use App\Filament\Resources\ModelNames\Pages\EditModelName;
use App\Filament\Resources\ModelNames\Pages\ListModelNames;
use App\Filament\Resources\ModelNames\Schemas\ModelNameForm;
use App\Filament\Resources\ModelNames\Tables\ModelNamesTable;
use App\Models\ModelName;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ModelNameResource extends Resource
{
    protected static ?string $model = ModelName::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'admins';

    public static function form(Schema $schema): Schema
    {
        return ModelNameForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ModelNamesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListModelNames::route('/'),
            'create' => CreateModelName::route('/create'),
            'edit' => EditModelName::route('/{record}/edit'),
        ];
    }
}
