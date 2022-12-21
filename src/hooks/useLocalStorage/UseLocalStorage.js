import { useCallback, useState, useEffect } from "react";
import PropTypes from 'prop-types';

function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			return initialValue;
		}
	});

	useEffect(() => {
		if (value === undefined) return localStorage.removeItem(key)
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value]);

	const remove = useCallback(() => {
		setValue(undefined)
	}, []);

	return [value, setValue, remove];
};

useLocalStorage.propTypes = {
    key: PropTypes.string.isRequired,
    initialValue: PropTypes.any
};

export default useLocalStorage;