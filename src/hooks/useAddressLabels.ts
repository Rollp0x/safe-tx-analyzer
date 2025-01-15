'use client';

import useSWR from 'swr';
import { useMemo } from 'react';
interface AddressLabels {
    [address: string]: string;
}

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch address labels');
    }
    return res.json();
};

export function useAddressLabels() {
    // 使用相对路径
    const url = './config/address_labels.json';

    const { data, error, isLoading } = useSWR<AddressLabels>(
        url,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );
    // 使用 useMemo 来记忆 labels 对象
    const labels = useMemo(() => data || {}, [data]);
    return {
        labels,
        isLoading,
        error
    };
}