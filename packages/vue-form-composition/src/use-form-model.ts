import { watch } from '@vue/composition-api';
import { FormControlPropsType } from './control';
import { useForm, UseFormOptions, UseFormResult } from './use-form';

export type UseFormModelOptions<T> = Omit<UseFormOptions<T>, 'onValue' | 'props'> & {
	props: FormControlPropsType & { value?: unknown };
	emit: (event: 'input', value: T) => void;
};

export function useFormModel<T>(options: UseFormModelOptions<T>): UseFormResult<T> {
	const { emit, ...useFormOptions } = options;
	const formBindings = useForm<T>({
		...useFormOptions,
		onValue(v) {
			emit('input', v);
		},
	});
	watch(() => options.props.value, formBindings.formSet, { immediate: true });
	return formBindings;
}
