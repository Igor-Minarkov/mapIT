import React, { useEffect, useState } from "react";
import "./newProduct.css";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { productInputs } from "../../../formSource";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);

  const navigate = useNavigate();

  const options = [
    { value: "", text: "--Choose an option--" },
    { value: "yes", text: "Yes" },
    { value: "no", text: "No" },
  ];

  const [selected, setSelected] = useState(options[0].value);

  useEffect(() => {
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
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

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

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "products", uuidv4()), {
        ...data,
      });
      navigate(-2);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="newProduct">
      <h1 className="newProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={handleAdd}>
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {productInputs.map((input) => {
          if (input.id === "status") {
            return (
              <div className="addProductItem" key={input.id}>
                <label>{input.label} </label>
                <select
                  id={input.id}
                  value={selected}
                  onChange={handleSelected}
                  className="newUserSelect"
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
              <div className="addProductItem" key={input.id}>
                <label>{input.label}</label>
                <input
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={handleInput}
                />
              </div>
            );
          }
        })}

        <button
          disabled={per !== null && per < 100}
          className="addProductButton"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}
