import { useRef, useState } from "react";
import Wrapper from "../Helpers/Wrapper";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";

import styles from "./AddUser.module.css";

const AddUser = (props) => {
  const namedInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = namedInputRef.current.value;
    const entereUserdAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || entereUserdAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age(non-empty values)",
      });
      return;
    }
    if (+entereUserdAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age(>0)",
      });
      return;
    }
    props.onAddUser(enteredName, entereUserdAge);
    namedInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => setError(null);

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={namedInputRef} />
          <label htmlFor="age">Age</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
