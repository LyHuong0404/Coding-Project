import { useState, useEffect } from 'react';

function useDebounce(value: string | null, delay: number) {
    const [debouncedValue, setDebounceValue] = useState<string | null>(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value), delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
