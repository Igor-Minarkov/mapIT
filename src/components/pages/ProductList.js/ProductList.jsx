import React, { useState, useEffect } from "react";
import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { db } from "../../../firebase";

export default function ProductList() {
  const [data, setData] = useState([]);

  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
      setOpen(false);
    });

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "id", headerName: "Item Code", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListProduct">
            {params.row.img ? (
              <img
                className="productListImg"
                src={params.row.img}
                alt="product"
              />
            ) : (
              <img
                className="productListImg"
                src="https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc="
                alt="product"
              />
            )}

            <h3>{params.row.name}</h3>
          </div>
        );
      },
    },
    { field: "description", headerName: "Description", width: 90 },
    { field: "status", headerName: "Status", width: 90 },
    { field: "sales", headerName: "Sales", width: 90 },
    { field: "stock", headerName: "Stock", width: 90 },
    { field: "minimum_inventory", headerName: "Min", width: 90 },
    { field: "maximum_inventory", headerName: "Max", width: 90 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlined
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className="userList" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[9]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
