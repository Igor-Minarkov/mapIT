import React, { useState, useEffect } from "react";
import "./product.css";
import Chart from "../../chart/Chart";
import { Link } from "react-router-dom";
import { Publish } from "@mui/icons-material";
import { productData } from "../../../dummyData";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { productInputs } from "../../../formSource";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Product() {
  const navigate = useNavigate();
  const params = useParams();
  const [file, setFile] = useState("");
  const [tempImg, setTempImg] = useState({});
  const [per, setPerc] = useState(null);
  const [singleDoc, setSingleDoc] = useState({});
  const [data, setData] = useState({});
  const [open, setOpen] = React.useState(true);

  const options = [
    { value: "", text: "--Choose an option--" },
    { value: "yes", text: "Yes 🍏" },
    { value: "no", text: "No" },
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleSelected = (event) => {
    setSelected(event.target.value);
    const id = event.target.id;
    const value = event.target.value;
    setData({ ...data, [id]: value });
  };

  const editSingle = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "products", params.productId), data);
    navigate(-1);
  };

  useEffect(() => {
    const fetchSingle = async () => {
      const docRef = doc(db, "products", params.productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSingleDoc(docSnap.data());
        setOpen(false);
      }
    };

    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPerc(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setTempImg({ img: downloadURL });
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();

    fetchSingle();
  }, [file, open, params.productId]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            {singleDoc.img ? (
              <img className="productInfoImg" alt="" src={singleDoc.img} />
            ) : (
              <img
                className="productInfoImg"
                alt=""
                src="https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc="
              />
            )}

            <span className="productName">{singleDoc.name}</span>
          </div>

          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Active:</span>
              <span className="productInfoValue">{singleDoc.status}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Sales:</span>
              <span className="productInfoValue">{singleDoc.sales}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">In stock:</span>
              <span className="productInfoValue">{singleDoc.stock}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey" style={{ marginRight: "10px" }}>
                Description:
              </span>
              <span className="productInfoValue">{singleDoc.description}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Minimum inventory:</span>
              <span className="productInfoValue">
                {singleDoc.minimum_inventory}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Maximum inventory:</span>
              <span className="productInfoValue">
                {singleDoc.maximum_inventory}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={editSingle}>
          <div className="productFormLeft">
            {productInputs.map((input) => {
              if (input.id === "status") {
                return (
                  <div className="addProductItem" key={input.id}>
                    <label>{input.label} </label>
                    <select
                      id={input.id}
                      value={selected}
                      onChange={handleSelected}
                      className="newUserSelect productItem"
                    >
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              } else {
                return (
                  <div key={input.id}>
                    <label>{input.label}</label>
                    <input
                      id={input.id}
                      type={input.type}
                      required
                      placeholder={input.placeholder}
                      onChange={handleInput}
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              {tempImg.img ? (
                <img src={tempImg.img} alt="" className="productUploadImg" />
              ) : (
                <img
                  src="https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc="
                  alt=""
                  className="productUploadImg"
                />
              )}
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <button
              className="productButton"
              disabled={per !== null && per < 100}
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
