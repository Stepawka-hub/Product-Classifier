import { useDispatch, useSelector } from "@store";
import { addUnitAsync } from "@thunks/units";
import { AddUnitFormUI } from "@ui/forms";
import { ChangeEvent, FC, useState } from "react";
import { AddFormProps } from "../types/types";
import { getIsAddingSeletor } from "@slices/units";

export const AddUnitForm: FC<AddFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const isAdding = useSelector(getIsAddingSeletor);
  const [unitName, setUnitName] = useState("");

  const onChangeUnitName = (evt: ChangeEvent<HTMLInputElement>) => {
    setUnitName(evt.target.value);
  };

  const handleSubmit = () => {
    dispatch(
      addUnitAsync({
        name: unitName,
      })
    );
    setUnitName("");
  };

  return (
    <AddUnitFormUI
      isAdding={isAdding}
      unitName={unitName}
      onChangeUnitName={onChangeUnitName}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};
