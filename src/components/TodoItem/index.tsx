import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useMediaQuery } from "react-responsive";

interface TodoProps {
  id: number;
  title: string;
  createdAt: Date;
  removeTodo(): void;
}

export const TodoItem = ({ id, title, createdAt, removeTodo }: TodoProps) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 468px)",
  });

  return (
    <div
      key={id}
      style={{
        border: "1px solid grey",
        padding: 16,
        borderRadius: 6,
        position: "relative",
        paddingRight: 66,
        flex: 1,
        maxHeight: 90,
        maxWidth: isMobile ? "100%" : "max-content",
      }}
    >
      <Link href={`/todo/${id}`}>
        <a>
          <h3
            style={{
              margin: 0,
              fontWeight: 500,
              width: "30ch",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </h3>
          <small>Criado: {dayjs(createdAt).format("DD/MM HH:mm")}</small>
        </a>
      </Link>
      <div
        onClick={removeTodo}
        style={{
          position: "absolute",
          right: 8,
          top: 0,
          bottom: 0,
          color: "red",
          alignItems: "center",
          display: "flex",
        }}
      >
        <TrashIcon
          style={{
            height: 46,
            width: 46,
            padding: 6,
            border: "2px solid red",
            borderRadius: 6,
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};
