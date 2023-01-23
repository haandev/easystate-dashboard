type SuccessResponseType<ContentType = any, Code = 200> = ContentType

type ErrorResponseType<ErrorContentType = any, Code = 400> = ErrorContentType

type AnyResponse = SuccessResponseType | ErrorResponseType
