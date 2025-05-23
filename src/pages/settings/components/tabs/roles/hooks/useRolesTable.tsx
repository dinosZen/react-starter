import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { functionalUpdate } from "@tanstack/react-table";
import { useRoles } from "@/features/settings/api";
import { RolesQueryParams } from "@/features/settings/types";
import { SortingState, Updater } from "@tanstack/react-table";
import useDebounce from "@/hooks/use-debounce";

export function useRolesTable(isActive: boolean) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [didReset, setDidReset] = useState(false);

  useEffect(() => {
    if (isActive && !didReset) {
      resetAll();
      setDidReset(true);
    } else if (!isActive && didReset) {
      setDidReset(false);
    }
  }, [isActive, didReset]);

  const getNum = (k: string, f: number) => Number(searchParams.get(k) ?? f);
  const parseCsv = (k: string) =>
    searchParams.getAll(k)?.filter(Boolean) as string[];

  const params: RolesQueryParams = {
    page: getNum("page", 1),
    size: getNum("size", 10),
    search: searchParams.get("search") ?? "",
    orderBy: searchParams.get("orderBy") ?? "title",
    order: (searchParams.get("order") as "ASC" | "DESC") ?? "DESC",
    group: parseCsv("group"),
  };

  const [rawSearch, setRawSearch] = useState(params.search);

  const debouncedSearch = useDebounce(rawSearch, 400);

  useEffect(() => {
    if (debouncedSearch !== params.search) {
      const next = new URLSearchParams(searchParams);

      if (debouncedSearch) next.set("search", debouncedSearch);
      else next.delete("search");

      next.set("page", "1");

      setSearchParams(next, { replace: true });
    }
  }, [debouncedSearch, params.search, searchParams, setSearchParams]);

  const [sorting, setSorting] = useState(() =>
    params.orderBy
      ? [{ id: params.orderBy, desc: params.order === "DESC" }]
      : []
  );

  const { data, isLoading, isFetching, isError, error } = useRoles(params);

  const isLoadingAgents = isLoading || isFetching;

  function updateFilters(updates: Partial<Pick<RolesQueryParams, "group">>) {
    const next = new URLSearchParams(searchParams);

    (["group"] as const).forEach((k) => {
      if (updates[k]) {
        // delete old values first
        next.delete(k);

        // add every array element as ?roles=foo&roles=bar
        updates[k]!.forEach((v) => next.append(k, v));
      }
    });

    // moving filters resets pagination
    next.set("page", "1");

    setSearchParams(next, { replace: true });
  }

  const resetAll = () => {
    setRawSearch("");
    setSorting([]);

    const next = new URLSearchParams();

    // preserve size if it was explicitly in the URL:
    const sizeParam = searchParams.get("size");

    if (sizeParam) next.set("size", sizeParam);
    next.set("page", "1");
    setSearchParams(next, { replace: true });
  };

  function updateParams(updates: Partial<RolesQueryParams>) {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([k, v]) => {
      if (v == null || v === "" || (typeof v === "number" && isNaN(v)))
        next.delete(k);
      else next.set(k, String(v));
    });

    if (updates.search || updates.orderBy || updates.order) {
      next.set("page", "1");
    }

    setSearchParams(next, { replace: true });
  }

  const onSortChange = (updater: Updater<SortingState>): void => {
    const next = functionalUpdate(updater, sorting);

    setSorting(next);
    if (!next.length)
      return updateParams({ orderBy: undefined, order: undefined });
    const { id, desc } = next[0];
    updateParams({ orderBy: id, order: desc ? "DESC" : "ASC" });
  };

  const onPageChange = (newPage: number, newSize: number) =>
    updateParams({ page: newPage, size: newSize });

  return {
    params,
    sorting,
    data,
    isLoading: isLoadingAgents,
    isError,
    error,
    rawSearch,
    setRawSearch,
    onSortChange,
    onPageChange,
    updateFilters,
    currentFilters: {
      group: params.group,
    },
    resetAll,
  };
}
