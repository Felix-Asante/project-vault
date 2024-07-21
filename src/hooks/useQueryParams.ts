import { Query } from '@/types/shared';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Router, {
    usePathname,
    useRouter,
    useSearchParams,
} from 'next/navigation';
import { useCallback, useEffect, useState, useTransition } from 'react';


interface QueryParamsPropsReturn {
    query: Query | null;
    add: (key: string, value: string) => void;
    remove: (key: string) => void;
    addMultiple: (queryParams: Query) => void;
    isInQuery: (key: string) => boolean;
}

interface useQueryParamsProps {
    options?: NavigateOptions;
}
export default function useQueryParams({
    options,
}: useQueryParamsProps = {}): QueryParamsPropsReturn {
    const [query, setQuery] = useState<Query | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );

    const removeQueryString = useCallback(
        (name: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete(name);
            return params.toString();
        },
        [searchParams],
    );

    useEffect(() => {
        const newQuery = Object.fromEntries(searchParams.entries());
        setQuery(newQuery);
    }, [searchParams.toString()]);

    const addMultiple = (queryParams: Query) => {
        const params = new URLSearchParams(searchParams.toString());
        for (const key in queryParams) {
            params.set(key, queryParams[key]);
        }
        const path = pathname + '?' + params.toString();
        router.push(path, options);
    };

    const remove = (key: string) => {
        const path = pathname + '?' + removeQueryString(key);
        router.push(path, options);
        if (!query) return;
    };

    const add = (key: string, value: string) => {
        if (!value || value === '') return remove(key);
        const path = pathname + '?' + createQueryString(key, value);
        router.push(path, options);
    };

    const isInQuery = (formInput: string) => {
        return query ? Object.keys(query).some((q) => q === formInput) : false;
    };

    return {
        query,
        add,
        addMultiple,
        remove,
        isInQuery,
    };
}


