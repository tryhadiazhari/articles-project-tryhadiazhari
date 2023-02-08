<?php

namespace App\Http\Resources;

use App\Traits\ApiResponser;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CustomJsonResource extends JsonResource
{
    use ApiResponser;
    /**
     * Create a new anonymous resource collection.
     *
     * @param  mixed  $resource
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public static function collection($resource)
    {
        $value = tap(new AnonymousResourceCollection($resource, static::class), function ($collection) {
            if (property_exists(static::class, 'preserveKeys')) {
                $collection->preserveKeys = (new static([]))->preserveKeys === true;
            }
        });

        return [
            'meta' => [
                'success' => true,
                'code' => 20000,
                'message' => 'Request success',
            ],
            'data' => $value,
        ];
    }

    public static function paginationCollection($resultKey, $resource)
    {
        $value = tap(new AnonymousResourceCollection($resource, static::class), function ($collection) {
            if (property_exists(static::class, 'preserveKeys')) {
                $collection->preserveKeys = (new static([]))->preserveKeys === true;
            }
        });

        return [
            'meta' => [
                'success' => true,
                'code' => 20000,
                'message' => 'Request success',
            ],
            'data' => [
                $resultKey => $value->items(),
                'page_info' => [
                    'last_page' => $value->lastPage(),
                    'current_page' => $value->currentPage(),
                    'path' => $value->path(),
                ]
            ]
        ];
    }

    public function withResponse($request, $response)
    {
        $response->setEncodingOptions(JSON_UNESCAPED_SLASHES);
    }
}
