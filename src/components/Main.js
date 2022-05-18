import { useGlobalContext } from "../context";
import DataTable from "./DataTable";
import Loading from "./Loading";

function Table() {
  const { loading, handleClick } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  return (
    <main className="box-border p-0 m-0 bg-white ">
      <section className="pt-5 mt-20 bg-slate-200 sm:container sm:mx-auto">
        <DataTable />
        <button
          onClick={() => handleClick()}
          className="px-4 py-2 mt-4 mb-4 ml-3 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
        >
          Click Me
        </button>
      </section>
    </main>
  );
}

export default Table;
