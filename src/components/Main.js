import { useGlobalContext } from "../context";
import DataTable from "./DataTable";
import Loading from "./Loading";

function Table() {
  const { loading, handleClick } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  return (
    <main className="box-border p-0 m-0">
      <section className="flex flex-col justify-center pt-5 mt-20 align-center sm:w-128 sm:mx-auto">
        <DataTable />
        <button
          onClick={() => handleClick()}
          className="self-center w-24 px-4 py-2 mt-4 mb-4 ml-3 font-bold text-white rounded-full bg-slate-700 hover:bg-slate-900"
        >
          Refresh
        </button>
      </section>
    </main>
  );
}

export default Table;
