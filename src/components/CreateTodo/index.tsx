import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";

interface CreateTodoProps {
  onSubmit(val: FieldValues): void;
}

export const CreateTodo = ({ onSubmit }: CreateTodoProps) => {
  const { register, handleSubmit } = useForm();
  const isLaptop = useMediaQuery({
    query: "(max-width: 1269px)",
  });

  return (
    <div
      style={{
        position: "sticky",
        top: 20,
        paddingRight: 12,
      }}
    >
      <h2 style={{ textAlign: isLaptop ? "center" : "left" }}>Create Todo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label htmlFor="title">
              <span>Title *</span>
            </label>
            <input
              type="text"
              {...register("title", {
                required: true,
              })}
            />
            <label htmlFor="description">
              <span>Description *</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              style={{ resize: "none" }}
            />
            <button type="submit">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
};
