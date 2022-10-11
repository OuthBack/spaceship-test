import type { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import z from "zod";
import { useEffect } from "react";
import { CreateTodo } from "../components/CreateTodo";
import { TodoItem } from "../components/TodoItem";
import { useMediaQuery } from "react-responsive";

const GAP = 12;

const todoValidator = z.object({
  title: z.string(),
  description: z.string(),
});

const Home: NextPage = () => {
  const { mutate: mutateCreate, isSuccess: createIsSuccess } =
    trpc.useMutation("todos.create");
  const { mutate: mutateRemove, isSuccess: removeIsSuccess } =
    trpc.useMutation("todos.remove");
  const { data, isLoading, refetch } = trpc.useQuery(["todos.getAll"]);
  const { handleSubmit } = useForm();

  const isLaptop = useMediaQuery({
    query: "(max-width: 1269px)",
  });

  const removeTodo = (id: number) => {
    mutateRemove({ id });
  };

  useEffect(() => {
    refetch();
  }, [createIsSuccess, removeIsSuccess, refetch]);

  return (
    <>
      <Head>
        <title>Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          padding: "28px 0",
        }}
      >
        <h1 style={{ textAlign: "center", margin: 0 }}>Todos list app</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: isLaptop ? "column" : "row",
          gap: "28px",
          padding: "0 36px 36px",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            borderRight: isLaptop ? "" : "1px solid grey",
            position: "relative",
            justifyContent: "center",
            alignSelf: isLaptop ? "center" : "",
            width: "100%",
          }}
        >
          <CreateTodo
            onSubmit={handleSubmit(async (val) => {
              const todo = todoValidator.parse(val);
              mutateCreate(todo);
            })}
          />
        </div>
        <div
          style={{
            flexGrow: 2,
            padding: "0 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: GAP,
              justifyContent: isLaptop ? "center" : "",
            }}
          >
            {isLoading && <div>Loading...</div>}
            {!isLoading && data && (
              <>
                {data.length === 0 && <h2>No todos yet! Create one</h2>}
                {data.map((todo) => {
                  return (
                    <TodoItem
                      id={todo.id}
                      createdAt={todo.createdAt}
                      title={todo.title}
                      removeTodo={() => removeTodo(todo.id)}
                      key={todo.id}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
