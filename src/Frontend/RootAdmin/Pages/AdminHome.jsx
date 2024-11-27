// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "mdb-react-ui-kit/dist/css/mdb.min.css";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   MDBTable,
//   MDBTableBody,
//   MDBTableHead,
//   MDBContainer,
//   MDBDropdown,
//   MDBDropdownToggle,
//   MDBDropdownMenu,
//   MDBDropdownItem,
// } from "mdb-react-ui-kit";

// const AdminHome = () => {
//   const [data, setData] = useState([]);
//   const [editingId, setEditingId] = useState(null); 

//   // Fetch data on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.post(
//           "http://localhost:3002/api/v1/auth/getallusers"
//         );
//         setData(res.data.users);
//       } catch (error) {
//         console.error(error);
//         toast.error("Error fetching data.");
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle role change
//   const handleRoleChange = async (id, newRole) => {
//     try {
//       const res = await axios.patch(
//         `http://localhost:3002/api/v1/auth/register/${id}`,
//         { role: newRole }
//       );

//       // Update state with new role
//       setData((prev) =>
//         prev.map((user) =>
//           user._id === id ? { ...user, role: newRole } : user
//         )
//       );
//       setEditingId(null); // Exit editing mode
//       toast.success(res.data.message);
//     } catch (error) {
//       console.error(error);
//       toast.error("Error updating role.");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await axios.delete(`http://localhost:3002/api/v1/auth/register/${id}`);
//         setData((prev) => prev.filter((user) => user._id !== id));
//         toast.success("User deleted successfully.");
//       } catch (error) {
//         console.error(error);
//         toast.error("Error deleting user.");
//       }
//     }
//   };

//   return (
//     <>
//       <MDBContainer>
//         <h1 className="text-center my-5">Admin Portal</h1>
//         <h2>Manage Users</h2>
//         <br></br>
//         <MDBTable align="middle" striped bordered>
//           <MDBTableHead dark>
//             <tr>
//               <th scope="col">Name</th>
//               <th scope="col">Email</th>
//               <th scope="col">Phone Number</th>
//               <th scope="col">Role</th>
//               <th scope="col">Actions</th>
//             </tr>
//           </MDBTableHead>
//           <MDBTableBody>
//             {data.map((item) => (
//               <tr key={item._id}>
//                 <td>{item.name}</td>
//                 <td>{item.email}</td>
//                 <td>{item.phoneno}</td>
//                 <td>
//                   <div className="d-flex align-items-center">
//                     {/* Show dropdown only when editingId matches user ID */}
//                     {editingId === item._id ? (
//                       <select
//                         value={item.role}
//                         onChange={(e) =>
//                           handleRoleChange(item._id, e.target.value)
//                         }
//                         className="form-select me-2"
//                       >
//                         <option value="user">User</option>
//                         <option value="admin">Service Provider</option>
//                       </select>
//                     ) : (
//                       <>
//                         <span className="me-2">{item.role}</span>
//                         <span
//                           role="button"
//                           onClick={() => setEditingId(item._id)}
//                           style={{
//                             cursor: "pointer",
//                             color: "#007bff",
//                             fontSize: "1.2rem",
//                             display: "flex",
//                             alignItems:"end"
//                           }}
//                         >
//                           ✏️
//                         </span>
//                       </>
//                     )}
//                   </div>
//                 </td>
//                 <td>
//                   <MDBDropdown>
//                     <MDBDropdownToggle tag="button" className="btn btn-primary">
//                       Actions
//                     </MDBDropdownToggle>
//                     <MDBDropdownMenu>
//                       <MDBDropdownItem
//                         link
//                         onClick={() => handleDelete(item._id)}
//                       >
//                         Delete
//                       </MDBDropdownItem>
//                     </MDBDropdownMenu>
//                   </MDBDropdown>
//                 </td>
//               </tr>
//             ))}
//           </MDBTableBody>
//         </MDBTable>
//       </MDBContainer>
//       <ToastContainer />
//     </>
//   );
// };

// export default AdminHome;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBContainer,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

const AdminHome = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3002/api/v1/auth/getallusers"
        );
        setData(res.data.users);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching data.");
      }
    };

    fetchData();
  }, []);

  // Handle role change
  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await axios.patch(
        `http://localhost:3002/api/v1/auth/register/${id}`,
        { role: newRole }
      );

      // Update state with new role
      setData((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role: newRole } : user
        )
      );
      setEditingId(null); // Exit editing mode
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Error updating role.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:3002/api/v1/auth/register/${id}`);
        setData((prev) => prev.filter((user) => user._id !== id));
        toast.success("User deleted successfully.");
      } catch (error) {
        console.error(error);
        toast.error("Error deleting user.");
      }
    }
  };

  return (
    <>
      <MDBContainer>
        <h1 className="text-center my-5">Admin Portal</h1>
        <h2>Manage Users</h2>
        <br />
        <MDBTable align="middle" striped bordered>
          <MDBTableHead dark>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phoneno}</td>
                <td>
                  <div className="d-flex align-items-center">
                    {/* Show dropdown only when editingId matches user ID */}
                    {editingId === item._id ? (
                      <select
                        value={item.role}
                        onChange={(e) =>
                          handleRoleChange(item._id, e.target.value)
                        }
                        className="form-select me-2"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option> {/* Keep 'admin' */}
                      </select>
                    ) : (
                      <>
                        {/* Display 'Service Provider' when the role is 'admin' */}
                        <span className="me-2">
                          {item.role === "admin" ? "Service Provider" : "User"}
                        </span>
                        <span
                          role="button"
                          onClick={() => setEditingId(item._id)}
                          style={{
                            cursor: "pointer",
                            color: "#007bff",
                            fontSize: "1.2rem",
                            display: "flex",
                            alignItems: "end",
                          }}
                        >
                          ✏️
                        </span>
                      </>
                    )}
                  </div>
                </td>
                <td>
                  <MDBDropdown>
                    <MDBDropdownToggle tag="button" className="btn btn-primary">
                      Actions
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem
                        link
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </MDBContainer>
      <ToastContainer />
    </>
  );
};

export default AdminHome;
