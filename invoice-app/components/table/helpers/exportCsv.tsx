export const exportCSV = <T extends Record<string, any>>(
  data: T[],
  columns: { header: string; accessorKey?: string | any }[],
  fileName?: string,
) => {
  if (!data.length || !columns.length) return;

  // 1. Filter only columns that have an accessorKey and are strings
  const exportableColumns = columns.filter(
    (col) => col.accessorKey && typeof col.accessorKey === "string",
  );

  // 2. Create Header Row
  const headers = exportableColumns
    .map((col) => `"${String(col.header).replace(/"/g, '""')}"`)
    .join(",");

  // 3. Create Data Rows
  const rows = data
    .map((row) => {
      return exportableColumns
        .map((col) => {
          const key = col.accessorKey as string;
          const value = row[key] ?? "";

          // CSV safety: escape quotes and remove newlines
          const cleanValue = String(value)
            .replace(/"/g, '""')
            .replace(/\n/g, " ");

          return `"${cleanValue}"`;
        })
        .join(",");
    })
    .join("\n");

  // 4. Download Trigger
  const blob = new Blob(["\uFEFF" + headers + "\n" + rows], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  const cleanFileName = (fileName || "export")
    .toLowerCase()
    .replace(/\s+/g, "-");

  link.setAttribute("href", url);
  link.setAttribute("download", `${cleanFileName}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
