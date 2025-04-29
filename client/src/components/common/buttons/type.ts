export interface ButtonProps
  extends React.PropsWithChildren<
    Omit<React.HTMLProps<HTMLButtonElement>, "size">
  > {
  variant?: "default" | "edit" | "cross" | "done" | "plus" | "view";
  size?: "small" | "medium" | "large";
  type?: "button" | "reset" | "submit";
  extraClass?: string;
}
