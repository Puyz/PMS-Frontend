import React, { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { Select, Spin } from 'antd';

const DebounceSelect = ({ customOptions, fetchOptions, debounceTimeout = 800, ...props }) => {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            if (fetchOptions) {
                setOptions([]);
                setFetching(true);
                fetchOptions(value).then((newOptions) => {
                    if (fetchId !== fetchRef.current) {
                        return;
                    }
                    setOptions(newOptions);
                    setFetching(false);
                });
            }

            if (customOptions) {
                setOptions(customOptions);
            }

        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout, customOptions]);
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            onFocus={() => { customOptions && setOptions(customOptions) }}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
}

export default DebounceSelect;