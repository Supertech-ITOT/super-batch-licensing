export type DialogProp = {
  action: "create" | "edit" | "delete" | null;
  id: number | null;
  open: boolean;
};

export default function CustomerView() {
  return (
    <div className="flex-1 rounded-lg border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex-col">
      {/* <div className="flex-1 min-h-0 my-4">
        <DataTable
          columns={RecipeColumns(setDialog, router)}
          data={recipes}
          setDialog={setDialog}
        />
      </div> */}
      {<></>}
    </div>
  );
}
