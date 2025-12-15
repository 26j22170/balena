import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../Features/ProductSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updateData, setUpdateData] = useState({ email: "", password: "" });
  const { list: products } = useSelector((state) => state.products);
  const [ productForm, setProductForm ] = useState({ name: "", price: "", imageUrl: "" });
  const [ editingProduct, setEditingProduct ] = useState(null);
  const adminId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // GET USERS
  const getUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, { headers: { userid: adminId } });
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/${id}`);
      getUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // UPDATE USER
  const updateUser = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/${editingUser._id}`, updateData);
      setEditingUser(null);
      setUpdateData({ email: "", password: "" });
      getUsers();
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <h2>Users</h2>
      <table 
        className="table table-striped table-hover table-bordered align-middle"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, index) => (
            <tr key={u._id}>
              <td>{index + 1}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.role || "user"}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(u._id)}>Delete</button>
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={() => {
                    setEditingUser(u);
                    setUpdateData({ email: u.email, password: "" });
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {editingUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update User: {editingUser.firstName} {editingUser.lastName}</h3>
            <input
              type="email"
              placeholder="Email"
              value={updateData.email}
              onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
              className="form-control"
              style={{ marginBottom: "10px" }}
            />
            <input
              type="password"
              placeholder="Password (leave empty if no change)"
              value={updateData.password}
              onChange={(e) => setUpdateData({ ...updateData, password: e.target.value })}
              className="form-control"
              style={{ marginBottom: "10px" }}
            />
            <div className="d-flex gap-2 mt-2">
              <button className="btn btn-success" onClick={updateUser}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* PRODUCT MANAGEMENT */}
      <h2 className="mt-5">Products</h2>
      <input placeholder="Name" className="form-control mb-2"
        value={productForm.name}
        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}/>
      <input placeholder="Price" type="number" className="form-control mb-2"
        value={productForm.price}
        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}/>
      <input placeholder="Image URL" className="form-control mb-2"
        value={productForm.imageUrl}
        onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}/>
      <button className="btn btn-success"
        onClick={() => {
          if (editingProduct) {
            dispatch(updateProduct({
              id: editingProduct._id,
              data: productForm
            }));
          } 
          else {
            dispatch(addProduct(productForm));
          }
          setProductForm({ name: "", price: "", imageUrl: "" });
          setEditingProduct(null);
          }}>{editingProduct ? "Update Product" : "Add Product"}</button>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td><img src={p.imageUrl} alt="" width="60" /></td>
                <td>
                  <button className="btn btn-primary btn-sm me-2"
                    onClick={() => { setEditingProduct(p); setProductForm(p);}}>
                    Edit</button>

                  <button className="btn btn-danger btn-sm"
                    onClick={() => dispatch(deleteProduct(p._id))}>
                    Delete</button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
    </div>
  );
}
