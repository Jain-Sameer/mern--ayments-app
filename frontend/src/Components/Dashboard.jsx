import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
export const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const asyncFetch = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const response = await fetch(
        "http://localhost:3000/api/v1/user/bulk?filter=" + search,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUsers(data.users);
    };
    asyncFetch();
  }, [search]);

  return (
    <div className="bg-white">
      <TopBar />
      <Main setSearch={setSearch} users={users}></Main>
    </div>
  );
};

function TopBar() {
  return (
    <div>
      <header className="flex flex-row justify-between items-center px-10 py-5">
        <h3 className="text-2xl font-bold">Payments App</h3>
        <div>
          <span className="text-lg">Hello, User </span>
          <div className="inline-block bg-gray-600  border-rounded rounded-full text-xl p-3 w-12 h-12 ">
            <span className="">U1</span>
          </div>
        </div>
      </header>
      <hr className="border-gray-700"></hr>
    </div>
  );
}
function User({ user }) {
  const navigate = useNavigate();

  return (
    <li className="flex flex-row justify-between items-center my-4">
      <span className="flex items-center">
        <span className="p-3 mr-4 w-10 h-10 border-rounded rounded-full bg-gray-400 flex items-center justify-center">
          {(user.firstName[0] + user.lastName[0]).toUpperCase()}
        </span>
        {user.firstName + " " + user.lastName}
      </span>
      <a>
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={(e) => {
            console.log(e, user);
            navigate(
              `/send?id=${user._id}&name=${
                user.firstName + " " + user.lastName
              }`
            );
          }}
        >
          Send Money
        </button>
      </a>
    </li>
  );
}
function Main({ setSearch, users }) {
  return (
    <div className=" p-10">
      <div>
        <span className="text-xl font-bold">
          Your Balance <span>$5000</span>{" "}
        </span>
        <div>
          <p className="my-6 text-2xl font-bold">Users</p>
          <input
            className="w-full border border-gray-600 p-3 rounded-md"
            placeholder="Search Users"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <div className="my-12">
            <ul className="">
              {users.map((user) => {
                return <User user={user} key={user._id} />;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
