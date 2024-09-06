"use client";

const LoginForm: React.FC = () => {
  function onSubmit() {}
  return (
    <div className="flex-row">
      <form onSubmit={onSubmit} className="flex-row">
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" required></input>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" required></input>
      </form>
    </div>
  );
};

export default LoginForm;
