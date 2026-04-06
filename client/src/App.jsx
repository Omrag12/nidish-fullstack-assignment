import { useState } from "react";
import Form from "./component/Form";
import Preview from "./component/Preview";
import "./App.css";
import "react-quill-new/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [data, setData] = useState({
    heading: "Welcome",
    paragraph: "This is default content",
    imageUrl: "",   
    textColor: "", 
  });

  return (
    <div className="container">
      <Form setData={setData} />
      <Preview data={data} />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
