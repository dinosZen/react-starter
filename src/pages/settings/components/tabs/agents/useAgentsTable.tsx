import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { functionalUpdate } from "@tanstack/react-table";
import { useAgents } from "@/features/settings/api";
import { AgentsQueryParams } from "@/features/settings/types";
import useDebounce from "@/hooks/use-debounce";

export function useAgentsTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const getNum = (k: string, f: number) => Number(searchParams.get(k) ?? f);

  const parseCsv = (k: string) =>
    searchParams.getAll(k)?.filter(Boolean) as string[];

  const params: AgentsQueryParams = {
    page: getNum("page", 1),
    size: getNum("size", 10),
    search: searchParams.get("search") ?? "",
    orderBy: searchParams.get("orderBy") ?? "",
    order: (searchParams.get("order") as "ASC" | "DESC") ?? "DESC",
    roles: parseCsv("roles"),
    //perms: parseCsv("perms"),
    statuses: parseCsv("statuses"),
  };

  const [rawSearch, setRawSearch] = useState(params.search);

  const debouncedSearch = useDebounce(rawSearch, 300);

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

  const { data, isLoading, isFetching } = useAgents(params);
  const isLoadingAgents = isLoading || isFetching;

  function updateFilters(
    updates: Partial<Pick<AgentsQueryParams, "roles" | "perms" | "statuses">>
  ) {
    const next = new URLSearchParams(searchParams);
    (["roles", "perms", "statuses"] as const).forEach((k) => {
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

    updateFilters({ roles: [], perms: [], statuses: [] });
    updateParams({
      search: undefined,
      orderBy: undefined,
      order: undefined,
      page: 1,
    });
  };

  function updateParams(updates: Partial<AgentsQueryParams>) {
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

  const onSortChange = (updater) => {
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
    rawSearch,
    setRawSearch,
    onSortChange,
    onPageChange,
    updateFilters,
    currentFilters: {
      roles: params.roles,
      //perms: params.perms,
      statuses: params.statuses,
    },
    resetAll,
  };
}
