<?php

namespace App\DTO\DTORequest;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\IntegerType;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\Validation\MinLength;

class CommentDTO extends Data
{
    public function __construct(
        #[Required, IntegerType]
        public int $workId,

        #[Required, StringType]
        public string $content,

        #[IntegerType]
        public ?int $parentId = null,
    ) {}

    public static function messages(): array
    {
        return [
            'workId.required' => 'workId là bắt buộc.',
            'workId.integer'  => 'workId phải là số nguyên.',

            'content.required' => 'Bạn phải nhập nội dung.',
            'content.string'   => 'Nội dung phải là chuỗi.',
            'content.min'      => 'Nội dung không được rỗng.',
 
            'parentId.integer' => 'parentId phải là số nguyên hoặc null.',
        ];
    }
}
