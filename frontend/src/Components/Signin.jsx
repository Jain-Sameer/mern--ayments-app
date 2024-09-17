export const Signin = () => {
  return (
    <div
      className="w-1/3 h-auto border-solid border-gray-400 border-2 rounded-lg text-center mx-auto my-40 p-6
         bg-white"
    >
      <h1 className="text-5xl font-bold my-3">Sign In</h1>
      <p className="my-5"> Enter your information to sign into your account</p>

      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="text-left p-3 pl-0 font-bold text-xl">Email</div>
          <input
            type="email"
            required
            className="border border-solid p-3 "
            placeholder="abc@hhaha.com"
          ></input>
        </div>
        <div className="flex flex-col">
          <div className="text-left p-3 pl-0 font-bold text-xl">Password</div>
          <input
            type="password"
            required
            className="border border-solid p-3 "
            placeholder="Enter Password"
          ></input>
        </div>
      </div>
      <button className="bg-black w-full p-3 mt-8 text-white font-bold my-2 border-none rounded-lg">
        Sign Up
      </button>
      <div>
        <p className="text-xl font-medium mt-8">
          Don't have an account ?{" "}
          <a href="/signup" className="underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};
