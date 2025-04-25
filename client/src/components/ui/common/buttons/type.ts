export interface ButtonUIProps
  extends React.PropsWithChildren<
    Omit<React.HTMLProps<HTMLButtonElement>, "size">
  > {
  variant?: "default" | "edit" | "cross" | "done" | "plus";
  size?: "small" | "medium" | "large";
  type?: "button" | "reset" | "submit";
  extraClass?: string;
}
