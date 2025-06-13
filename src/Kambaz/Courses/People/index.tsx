import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PeopleTable from "./Table";
import * as courseClient from "../client";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsersForCourse = async () => {
    try {
      if (cid) {
        const courseUsers = await courseClient.findUsersForCourse(cid);
        setUsers(courseUsers);
      }
    } catch (error) {
      console.error("Error fetching users for course:", error);
    }
  };

  useEffect(() => {
    fetchUsersForCourse();
  }, [cid]);

  return (
    <div className="container-fluid">
      <h2>People</h2>
      <PeopleTable users={users} />
    </div>
  );
} 