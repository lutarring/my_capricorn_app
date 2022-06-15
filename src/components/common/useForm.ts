import { useState } from 'react';

export type FormValues = { [key in string]?: any };
export type ValidatetionOption<T extends FormValues> = {
  required?: boolean;
  validate?: (data: T) => string;
};
export type Validations<T extends FormValues> = {
  [key in keyof T]?: ValidatetionOption<T>;
};
export type Errors<T extends FormValues> = { [key in keyof T]?: string };

export type FormProps<T extends FormValues> = {
  initialState?: T;
  validations?: Validations<T>;
  serverErrors?: Errors<T>;
};

export type FormContext<T extends FormValues> = {
  handleChange(name: keyof T, value: any): void;
  handleSubmit(submitFunction: (data: T) => Promise<void>): Promise<void>;
  handleListChange(changeList: any[][]): void;
  reset(): void;
  values: T;
  changed: boolean;
  submitting: boolean;
  errors: Errors<T>;
};

/**
 * form用hooks
 * @todo initialState!==valuesチェック 値がanyだからむずい
 */
export default function useForm<T extends FormValues>({
  initialState = {} as T,
  validations = {},
  serverErrors = {},
}: FormProps<T>): FormContext<T> {
  const [values, setValues] = useState<T>(initialState);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [touches, setTouches] = useState<{ [key in keyof T]?: boolean }>({});

  const handleChange = (name: keyof T, value: any) => {
    if (!touches[name]) {
      setTouches({ ...touches, [name]: true });
    }
    setValues({ ...values, [name]: value });
    setErrors({
      ...errors,
      [name]: validate(name, value, values, validations[name] || {}),
    });
  };

  const handleListChange = (changeList: any[][]) => {
    let _touches = touches;
    let _values = values;
    changeList.map((change) => {
      if (!touches[change[0]]) {
        _touches = { ..._touches, [change[0]]: true };
      }
      _values = { ..._values, [change[0]]: change[1] };
    });
    setTouches(_touches);
    setValues(_values);
  };

  const handleSubmit = async (submitFunction: (data: T) => Promise<any>) => {
    const errorMasages = {};
    Object.keys(validations).forEach((key) => {
      const errorMassage = validate(key, values[key], values, validations[key]);
      if (errorMassage !== '') {
        errorMasages[key] = errorMassage;
      }
    });
    const hasError = Object.keys(errorMasages).length;
    if (hasError) {
      setErrors({ ...errors, ...errorMasages });
    } else {
      setSubmitting(true);
      try {
        await submitFunction(values);
      } finally {
        setTouches({});
        setSubmitting(false);
      }
    }
  };
  const reset = () => {
    setValues(initialState);
    setErrors({});
    setTouches({});
  };
  const changed = Object.values(touches).includes(true);
  return {
    handleChange,
    handleSubmit,
    handleListChange,
    reset,
    values,
    changed,
    submitting,
    errors: combineErrors(errors, serverErrors, touches),
  };
}

const validate = <T extends FormValues>(
  name: keyof T,
  value: T[string],
  values: T,
  { required, validate }: ValidatetionOption<T>
): string => {
  if (required && !value) {
    return '必須項目です';
  }
  if (validate) {
    return validate({ ...values, [name]: value });
  }
  return '';
};

const combineErrors = <T extends FormValues>(
  errors: Errors<T>,
  serverErrors: Errors<T>,
  touches: { [key in keyof T]?: boolean }
): Errors<T> => {
  const ret = { ...errors };
  Object.keys(serverErrors).forEach((key: keyof T) => {
    if (!touches[key]) {
      ret[key] = serverErrors[key];
    }
  });
  return ret;
};
