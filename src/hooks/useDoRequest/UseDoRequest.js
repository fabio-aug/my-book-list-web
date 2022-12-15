import { useRef, useState } from 'react';

import Requests from '../../modules/services';

const useDoRequest = (apiRequest) => {
	const [loading, setLoading] = useState(false);
	const dataRef = useRef(null);

	const doRequest = async (data) => (
		new Promise(async (resolve, reject) => {
			try {
				dataRef.current = data;
				setLoading(true);
				const result = await apiRequest(data);
				setLoading(false);
				resolve(result);
			} catch (error) {
				setLoading(false);
				reject(error);
			}
		})
	);

    const doFormikRequest = (data, { setSubmitting, resetForm }) => (
        new Promise(async (resolve, reject) => {
            try {
				dataRef.current = data;
                setSubmitting(true);
				const result = await apiRequest(data);
                resetForm();
                setSubmitting(false);
                resolve(result);
            } catch (error) {
                setSubmitting(false);
                reject(error);
            }
        })
    );

	const remakeRequest = () => {
		return doRequest(dataRef.current);
	};

	const reset = () => {
		setLoading(false);
		dataRef.current = null;
	};

	return {
		doRequest,
		doFormikRequest,
		remakeRequest,
		reset,
		loading,
	};
};

export default useDoRequest;