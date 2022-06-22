import Layout from "./Layout";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
    return () => {
      controller.abort();
    };
  }, [axiosPrivate]);
  return (
    <Layout>
      <div>Dashboard</div>
      {users && users.map((user) => <div key={user.id}>{user.name}</div>)}
    </Layout>
  );
};
export default Dashboard;
