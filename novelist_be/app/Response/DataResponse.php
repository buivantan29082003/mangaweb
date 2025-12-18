<?php 
namespace App\Response;

use JsonSerializable;

class DataResponse implements JsonSerializable
{
    private string $message;
    private object|null|string|array $data;
    private bool $isError;

    public function __construct(string $message, object|string|null|array $data, bool $isError=false)
    {
        $this->message = $message;
        $this->data = $data;
        $this->isError=$isError;
    }


    public function jsonSerialize(): mixed {
        return [
            'message' => $this->message,
            'data' => $this->data,
            'isError'=>$this->isError
        ];
    }

    // Getter cho message
    public function getMessage(): string
    {
        return $this->message;
    }

    // Setter cho message
    public function setMessage(string $message): void
    {
        $this->message = $message;
    }

    public function getIsError(): int
    {
        return $this->isError;
    }

    // Setter cho data
    public function setIsError(bool $isError): void
    {
        $this->isError = $isError;
    }

    // Getter cho data
    public function getData(): object|string|null|array
    {
        return $this->data;
    }

    // Setter cho data
    public function setData(object $data): void
    {
        $this->data = $data;
    }
}
