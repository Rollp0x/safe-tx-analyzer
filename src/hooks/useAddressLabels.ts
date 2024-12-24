'use client';

import useSWR from 'swr';

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
    const url = process.env.NODE_ENV === 'production' 
        ? './config/address_labels.json'
        : './config/address_labels.json';

    const { data, error, isLoading } = useSWR<AddressLabels>(
        url,
        fetcher,
        {
            revalidateOnFocus: false, // 禁用焦点重新验证
            revalidateOnReconnect: false, // 禁用重新连接时重新验证
        }
    );

    return {
        labels: data || {},
        isLoading,
        error
    };
} 