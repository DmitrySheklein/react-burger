import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./page.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "../types/hooks";
import { register } from "../services/auth/actions";
import { useSelector } from "../types/hooks";
import { getRegisterError } from "../services/auth/selectors";

const RegisterPage = () => {
  const registerError = useSelector(getRegisterError);
  const dispatch = useDispatch();
  const [form, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(form));
  };

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.formTitle} text text_type_main-medium mb-6 `}>
          Регистрация
        </h1>
        <div className={`${styles.formField} mb-6`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            value={form.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`${styles.formField} ${styles.formEmail} mb-6`}>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={onChange}
            value={form.email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`${styles.formField} mb-6`}>
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={"password"}
          />
        </div>
        {registerError && (
          <p
            className="pt-2 pb-5 text text_type_main-small"
            style={{ textAlign: "center" }}
          >
            {registerError}
          </p>
        )}
        <div className={`${styles.formButton} mb-20`}>
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
        <p
          className={`${styles.formLinkItem} text text_type_main-default text_color_inactive mb-4`}
        >
          Уже зарегистрированы?
          <Link className={styles.formLink} to={"/login"}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
