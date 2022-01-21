import { Button, Text, Icon } from "@innovaccer/design-system";
import "@innovaccer/design-system/css";
import React, { useRef, useState } from "react";

import { ITodoItem } from "../../interfaces/entities/todolist";

type ItemProps = {
  index: number;
  todo: ITodoItem;
  editTodo: (e: ITodoItem) => void;
  deleteItem: (e: string) => void;
  parentWidth: number;
  setModalState: (e: { open: boolean; content: string }) => void;
};

const ListItem: React.FC<ItemProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const childRef = useRef<HTMLDivElement>(null);
  const shouldModalRender = () => {
    console.log("Inside Func", childRef.current?.scrollWidth);
    if (childRef.current && childRef.current.scrollWidth) {
      console.log("ChildWidth", childRef.current.scrollWidth);
      console.log("ParentWidth", props.parentWidth);
      setShowModal(props.parentWidth < childRef.current?.scrollWidth);
    }
  };
  React.useLayoutEffect(() => {
    console.log("Rendered");
    shouldModalRender();
  });

  /**
   *
   * describe('When text is longer than the parent width', () => {
   *  it('text is clamped with ellipsis overflow', () => {})
   * })
   *
   *  it('When the list item is clicked, modal is visible with entire text inside', () => {})
   * })
   *
   */
  return (
    <div
      style={{ borderRadius: 10, textAlign: "left" }}
      className="bg-primary py-3 mb-5 d-flex flex-row align-items-center"
    >
      <div
        data-test="list-item"
        id={props.index.toString()}
        ref={childRef}
        onClick={
          showModal
            ? () => {
                props.setModalState({
                  content: childRef.current?.innerText || "",
                  open: true,
                });
              }
            : undefined
        }
        className="ellipsis--noWrap w-75 mr-6 pl-6"
        style={{
          fontWeight: "var(--font-weight-bold)",
          color: "var(--text-white)",
          fontSize: "var(--font-size-m)",
        }}
      >
        <p id="refValue">{childRef.current?.scrollWidth}</p>
        <p id="modalVal">{showModal ? "true" : "false"}</p>
        <Text weight="strong" size="regular" appearance="white">
          {props.todo.item}
        </Text>
      </div>

      <Icon
        className="mr-5 cursor-pointer"
        name="edit"
        size={20}
        appearance="accent1_lighter"
        onClick={() => props.editTodo(props.todo)}
        data-test="editBtn"
      />
      <Button
        className="ml-auto mr-8"
        onClick={() => props.deleteItem(props.todo.id)}
        aria-label="Delete"
        icon="delete"
        id="deleteBtn"
        size="tiny"
      />
    </div>
  );
};
export default ListItem;

// check whether modal is being displayed on larger input. on click
