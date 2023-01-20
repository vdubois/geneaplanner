export class Result<T, E> {

    private readonly _isSuccess: boolean;

    private readonly _isFailure: boolean;

    private readonly _value?: T;

    private readonly _error?: E;

    constructor(value: T | null, error: E | null) {
        if (value) {
            this._value = value;
        }
        if (error) {
            this._error = error;
        }
        this._isSuccess = value !== null;
        this._isFailure = error !== null;
    }

    static success<T, E>(value: T): Result<T, E> {
        return new Result<T, E>(value, null);
    }

    static failure<T, E>(error: E): Result<T, E> {
        return new Result<T, E>(null, error);
    }

    isSuccess(): boolean {
        return this._isSuccess;
    }

    isFailure(): boolean {
        return this._isFailure;
    }

    value(): T {
        return this._value!;
    }

    error(): E {
        return this._error!;
    }
}
