<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticlesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'required|min:20',
            'content' => 'required|min:200',
            'category' => 'required|min:3',
            'status' => [
                'required',
                function ($attribute, $value, $fail) {
                    if ($value !== 'publish' and $value !== 'draft' and $value !== 'trash') {
                        $fail('The ' . $attribute . ' is must be publish, draft or trash.');
                    }
                },
            ],
        ];
    }
}
