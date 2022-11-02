export interface BackendError {
  globalException: GlobalException;
  validationErrors: ValidationError[];
}

export interface GlobalException {
  timestamp: Date;
  message: string;
}

export interface ValidationError {
  object: string;
  field: string;
  invalidValue: string;
  message: string;
}
