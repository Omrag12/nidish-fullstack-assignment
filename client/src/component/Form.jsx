import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactQuill from "react-quill-new";

export default function Form({ setData }) {
  const defaultForm = { heading: "", imageUrl: "", textColor: "#111111" };
  const defaultPreview = {
    heading: "Welcome",
    paragraph: "<p>This is default content</p>",
    imageUrl: "",
    textColor: "",
  };

  const [form, setForm] = useState(defaultForm);
  const [paragraph, setParagraph] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let err = {};
    if (!form.heading.trim()) err.heading = "Heading required";
    if (!paragraph || paragraph === "<p><br></p>") err.paragraph = "Paragraph required";
    if (!form.imageUrl.trim()) err.imageUrl = "Image URL required";
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(form.textColor)) err.textColor = "Invalid HEX color";

    setErrors(err);

    if (Object.keys(err).length > 0) {
      toast.error("Please fix the highlighted errors ❌");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await axios.post("https://nidish-backend.onrender.com/api/content", {
        heading: form.heading,
        paragraph,
        imageUrl: form.imageUrl,
        textColor: form.textColor,
      });
      setData(res.data.data); 
      toast.success("Content updated 🚀");
    } catch (err) {
  if (err.response?.data?.errors) {
    setErrors(err.response.data.errors);
    toast.error(Object.values(err.response.data.errors).join(", "));
  } else {
    toast.error("Server error. Try again later");
  }
}
    setLoading(false);
  };

  const handleReset = () => {
    setForm(defaultForm);
    setParagraph("");
    setErrors({});
    setData(defaultPreview);
    toast("Form reset 🔄", { icon: "⚡" });
  };

  const isEmpty = !form.heading && !form.imageUrl && !paragraph;

  return (
    <div className="form">
      <h2>✨ Content Editor</h2>

      <div className="input-group">
        <label>Heading</label>
        <input
          placeholder="Enter heading..."
          value={form.heading}
          onChange={(e) => setForm({ ...form, heading: e.target.value })}
        />
        {errors.heading && <p className="error">{errors.heading}</p>}
      </div>

      <div className="input-group">
        <label>Paragraph</label>
        <div className="quill-editor">
          <ReactQuill theme="snow" value={paragraph} onChange={setParagraph} />
        </div>
        {errors.paragraph && <p className="error">{errors.paragraph}</p>}
      </div>

      <div className="input-group">
        <label>Background Image URL</label>
        <input
          placeholder="https://example.com/image.jpg"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
        {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
      </div>

      <div className="input-group">
        <label>Text Color (HEX)</label>
        <input
          placeholder="#111111"
          value={form.textColor}
          onChange={(e) => setForm({ ...form, textColor: e.target.value })}
        />
        {errors.textColor && <p className="error">{errors.textColor}</p>}
      </div>

      <div className="btn-group">
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit 🚀"}
        </button>
        <button type="button" className="reset-btn" onClick={handleReset} disabled={isEmpty}>
          Reset
        </button>
      </div>
    </div>
  );
}
