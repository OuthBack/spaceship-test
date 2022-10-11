import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const Todo = () => {
  const { query, push } = useRouter();
  const todoId = parseInt(query.id as string);

  // Adequar chamada e dinamizar página
  const { data } = trpc.useQuery(["todos.get", { id: todoId }]);

  if (!query) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 32,
      }}
    >
      {data ? (
        <>
          <h1>{data.title}</h1>
          <p style={{ maxWidth: "80ch" }}>{data.description}</p>
        </>
      ) : (
        <>
          <h1>Todo not Found</h1>
        </>
      )}
      <button onClick={() => push("/")}>Home</button>
    </div>
  );
};

export default Todo;
